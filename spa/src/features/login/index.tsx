import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Payload } from "../../routes";
import { login } from "../../api/users/login";
import { login as reduxLogin } from "../users/usersSlice";
import { Box, Button, Container, Grid, LinearProgress, TextField } from "@mui/material";

export const Login = () => {
	const [email, setEmail] = useState<string>("");
	const [pass, setPass] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);
			const req = await login(email, pass);

			const decoded: any = jwtDecode<Payload>(req.data.access_token);
			dispatch(reduxLogin({ id: decoded.sub, email: decoded.email, name: decoded.name }));

			localStorage.setItem(process.env.REACT_TOKEN!, req.data.access_token);

			navigate("/");
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth="lg">
			<Grid container spacing={2}>
				<Grid item xs={5}>
					<Box p={4}>
						<h4 style={{ marginTop: "6px" }}>Rifa</h4>
						<h4 style={{ marginBottom: "12px" }}>Rifa pra mãe</h4>
						{loading && (
							<Box>
								<LinearProgress />
							</Box>
						)}
						<form noValidate onSubmit={submit}>
							<TextField
								margin="normal"
								required
								fullWidth
								label="Email"
								autoFocus
								value={email}
								variant="outlined"
								InputLabelProps={{ shrink: true }}
								placeholder="Your email"
								onChange={(event) => setEmail(event.target.value)}
								disabled={loading}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								label="Password"
								autoFocus
								value={pass}
								variant="outlined"
								InputLabelProps={{ shrink: true }}
								placeholder="Your password"
								onChange={(event) => setPass(event.target.value)}
								disabled={loading}
							/>
							<Button
								type="submit"
								variant="contained"
								size="large"
								fullWidth
								disabled={loading}>
								Sign In
							</Button>
						</form>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};
