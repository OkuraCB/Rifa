import { Logout } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Card,
  CardContent,
  Fab,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../users/usersSlice";
import { RifaActions } from "./actions";
import { CreateRifa } from "./create";
import { Rifa, listRifas, selectRifas } from "./rifasSlice";

export const Rifas = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const rifas = useAppSelector(selectRifas);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const closeCreateModal = () => {
    setCreateModal(false);
  };

  const [rifaModal, setRifaModal] = useState<boolean>(false);
  const closeRifaModal = () => {
    setRifaModal(false);
  };

  const [rifa, setRifa] = useState<Rifa | null>(null);

  useEffect(() => {
    dispatch(listRifas());
  }, []);

  const countFree = (data: any) => {
    const seats = data.seats;
    return seats.filter((seat: any) => seat.pago === false).length;
  };

  const openRifa = (rifa: Rifa) => {
    setRifa(rifa);
    setRifaModal(true);
  };

  const handleLogout = async () => {
    navigate("/");
    await dispatch(logout());
    localStorage.setItem(process.env.REACT_TOKEN!, "");
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        paddingTop={6}
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
      >
        {rifas.map((rifa) => (
          <Grid container item xs={12} justifyContent="center">
            <Button
              onClick={() => {
                openRifa(rifa);
              }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    <strong>Nome:</strong> {rifa.name}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    <strong>Fim:</strong>{" "}
                    {(rifa.end as unknown as string).split("T")[0]}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    <strong>Espaços:</strong> {countFree(rifa)}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    <strong>Preço:</strong> {rifa.price} R$
                  </Typography>
                </CardContent>
              </Card>
            </Button>
          </Grid>
        ))}
        <Fab
          color="primary"
          style={{
            margin: 0,
            top: "auto",
            right: 20,
            bottom: 20,
            left: "auto",
            position: "fixed",
          }}
          onClick={() => {
            setCreateModal(true);
          }}
        >
          <AddIcon />
        </Fab>
        <Fab
          color="secondary"
          style={{
            margin: 0,
            top: "auto",
            right: 20,
            bottom: 90,
            left: "auto",
            position: "fixed",
          }}
          onClick={handleLogout}
        >
          <Logout />
        </Fab>
      </Grid>

      <CreateRifa open={createModal} onClose={closeCreateModal} />
      <RifaActions open={rifaModal} onClose={closeRifaModal} rifa={rifa} />
    </>
  );
};
