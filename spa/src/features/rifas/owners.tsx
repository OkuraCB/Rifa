import { Add, Delete, Search } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import {
  addOwner,
  Owner,
  removeOwner,
  resetUser,
  Rifa,
  searchUser,
  selectUser,
} from "./rifasSlice";

interface OwnersProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  rifa: Rifa | null;
}

export const RifaOwners = ({ open, onClose, rifa }: OwnersProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState<string>("");
  const user = useAppSelector(selectUser);

  const [owner, setOwner] = useState<Owner | null>(null);

  const [addConfirmationDialog, setAddConfirmationDialog] =
    useState<boolean>(false);

  const [deleteConfirmationDialog, setDeleteConfirmationDialog] =
    useState<boolean>(false);

  const resetVariables = () => {
    dispatch(resetUser());
  };

  const handleClose = () => {
    resetVariables();
    setAddConfirmationDialog(false);
    setDeleteConfirmationDialog(false);
    onClose(true);
    navigate(`${location.pathname}`);
  };

  const search = () => {
    dispatch(searchUser(email));
  };

  const add = () => {
    try {
      dispatch(addOwner({ userId: user.id, rifaId: rifa?.id }));
      setAddConfirmationDialog(false);
    } catch (e) {
      setAddConfirmationDialog(false);
    }
  };

  const remove = () => {
    try {
      dispatch(removeOwner({ userId: owner?.id, rifaId: rifa?.id }));
      setDeleteConfirmationDialog(false);
    } catch (e) {
      setDeleteConfirmationDialog(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        PaperProps={{ sx: { width: "100%", maxWidth: "md" } }}
      >
        <DialogTitle textAlign="center">Gerentes</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} marginTop={1}>
            <Grid container item xs={7}>
              <Grid item xs={8}>
                <TextField
                  label="Email"
                  variant="outlined"
                  required
                  value={email}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.target.value as any);
                  }}
                  InputProps={{
                    endAdornment: (
                      <>
                        <IconButton onClick={search}>
                          <Search />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setAddConfirmationDialog(true);
                          }}
                        >
                          <Add />
                        </IconButton>
                      </>
                    ),
                  }}
                />
              </Grid>
              <Grid container item xs={9} paddingTop={4} spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Nome"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={user.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Contato"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={user.contact}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={5} justifyContent="left">
              <Paper
                sx={{
                  width: "100%",
                  maxHeight: 144,
                  overflow: "scroll",
                  backfaceVisibility: 0,
                }}
              >
                <List>
                  {rifa?.owners.map((owner) => (
                    <ListItem
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={() => {
                            setOwner(owner);
                            setDeleteConfirmationDialog(true);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      }
                    >
                      {owner.name}
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={handleClose}>Voltar</Button>
        </DialogActions>
      </Dialog>

      <ConfirmationDialog
        open={addConfirmationDialog}
        executeFunction={add}
        onClose={() => {
          setAddConfirmationDialog(false);
        }}
      />
      <ConfirmationDialog
        open={deleteConfirmationDialog}
        executeFunction={remove}
        onClose={() => {
          setDeleteConfirmationDialog(false);
        }}
      />
    </>
  );
};
