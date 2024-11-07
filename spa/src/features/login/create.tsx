import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import { newUser } from "./signupSlice";

interface CreateUserProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateUser = ({ open, onClose }: CreateUserProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [contact, setContact] = useState<string>("");

  const resetVariables = () => {
    setName("");
    setEmail("");
    setPass("");
    setContact("");
  };

  const handleClose = () => {
    resetVariables();
    setConfirmationDialog(false);
    onClose(true);
    navigate(`${location.pathname}`);
  };

  const create = () => {
    const data = {
      name,
      email,
      pass,
      contact,
    };

    try {
      dispatch(newUser(data));
      handleClose();
    } catch (e) {
      handleClose();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        PaperProps={{ sx: { width: "100%", maxWidth: "md" } }}
      >
        <DialogTitle textAlign="center">Registrar usuário</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nome"
                variant="outlined"
                required
                fullWidth
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value as any);
                }}
                style={{ marginTop: "20px" }}
              />
            </Grid>
            <Grid item xs={6} marginTop="20px">
              <TextField
                label="Email"
                required
                autoComplete="off"
                fullWidth
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value as any);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Contato"
                required
                autoComplete="off"
                fullWidth
                value={contact}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setContact(event.target.value as any)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Senha"
                required
                type="password"
                autoComplete="off"
                fullWidth
                value={pass}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPass(event.target.value as any)
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => setConfirmationDialog(true)}>Registrar</Button>
        </DialogActions>
      </Dialog>

      <ConfirmationDialog
        open={confirmationDialog}
        executeFunction={create}
        onClose={() => {
          setConfirmationDialog(false);
        }}
      />
    </>
  );
};
