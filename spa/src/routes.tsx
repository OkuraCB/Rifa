/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Routes,
	Route,
	Location,
	useLocation,
	useSearchParams,
	Navigate,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { login, selectUser } from "./features/users/usersSlice";
import { jwtDecode } from "jwt-decode";
import { isBefore } from "date-fns";
import { Login } from "./features/login";
import { DefaultLayout } from "./layout/default.layout";
import { Home } from "./features/home";
import { Rifas } from "./features/rifas";
import { Buy } from "./features/buy";

export interface Payload {
	exp: number;
	sub: number;
	name: string;
	email: string;
}

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/home" element={<Home />} />
			<Route path="/buy" element={<Buy />} />
			<Route
				element={
					<CheckLogin>
						<Login />
					</CheckLogin>
				}
				path="/login"
			/>
			<Route
				element={
					<RequireAuth>
						<DefaultLayout />
					</RequireAuth>
				}
				path="/">
				<Route path="/rifas" element={<Rifas />} />
			</Route>
		</Routes>
	);
};

const CheckLogin = ({ children }: { children: JSX.Element }) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);

	const location: Location = useLocation();
	const [searchParams] = useSearchParams();

	if (user.logged)
		return (
			<Navigate
				to={searchParams.get("redirect") || "/rifas"}
				state={{ from: location }}
				replace
			/>
		);

	const envToken = localStorage.getItem(process.env.REACT_TOKEN!);

	if (envToken) {
		try {
			const token = jwtDecode<Payload>(envToken);

			const now = new Date();
			const expDate = new Date(token.exp * 1000);

			if (isBefore(now, expDate)) {
				dispatch(login({ id: token.sub, email: token.email, name: token.name }));
			} else {
				localStorage.removeItem(process.env.REACT_TOKEN!);
				return <Navigate to="login" state={{ from: location }} replace />;
			}
		} catch (e) {
			localStorage.removeItem(process.env.REACT_TOKEN!);
			return <Navigate to="login" state={{ from: location }} replace />;
		}
	}

	return children;
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
	const user = useAppSelector(selectUser);
	const location = useLocation();

	if (!user.logged) {
		return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />;
	}

	return children;
};
