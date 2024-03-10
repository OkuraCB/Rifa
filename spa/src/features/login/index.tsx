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

			navigate("/rifas");
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth="lg">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Box p={4}>
						<h1 style={{ marginTop: "6px" }}>Login</h1>
						<h5 style={{ marginBottom: "12px" }}>
							Para criar uma rifa, você precisa estar cadastrado.
						</h5>
						{loading && (
							<Box>
								<LinearProgress />
							</Box>
						)}
						<form noValidate onSubmit={submit}>
							<TextField
								margin="normal"
								required
								label="Email"
								autoFocus
								value={email}
								variant="outlined"
								InputLabelProps={{ shrink: true }}
								placeholder="Seu email"
								onChange={(event) => setEmail(event.target.value)}
								disabled={loading}
							/>
							<br />
							<TextField
								margin="normal"
								required
								label="Senha"
								autoFocus
								value={pass}
								variant="outlined"
								InputLabelProps={{ shrink: true }}
								placeholder="Sua senha"
								onChange={(event) => setPass(event.target.value)}
								disabled={loading}
							/>
							<br />
							<Button
								type="submit"
								variant="contained"
								size="large"
								disabled={loading}
								style={{ marginRight: 43 }}>
								Entrar
							</Button>
							<Button
								variant="contained"
								size="large"
								onClick={() => navigate("/home")}
								color="secondary">
								Voltar
							</Button>
						</form>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};
