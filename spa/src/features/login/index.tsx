import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/users/login";
import { useAppDispatch } from "../../app/hooks";
import { Payload } from "../../routes";
import { login as reduxLogin } from "../users/usersSlice";
import { CreateUser } from "./create";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [createModal, setCreateModal] = useState<boolean>(false);
  const closeCreateModal = () => {
    setCreateModal(false);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const req = await login(email, pass);

      const decoded: any = jwtDecode<Payload>(req.data.access_token);
      dispatch(
        reduxLogin({
          id: decoded.sub,
          email: decoded.email,
          name: decoded.name,
          role: decoded.role,
        })
      );

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
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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
                </Grid>

                <Grid container item xs={4}>
                  <Grid item xs={2}>
                    <IconButton onClick={() => navigate("/")} color="secondary">
                      <ArrowBack />
                    </IconButton>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      disabled={loading}
                      style={{ marginRight: 43 }}
                    >
                      Entrar
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      disabled={loading}
                      style={{ marginRight: 43 }}
                      onClick={() => {
                        setCreateModal(true);
                      }}
                    >
                      Cadastrar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
      <CreateUser open={createModal} onClose={closeCreateModal} />
    </Container>
  );
};
