import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import {
  ConfirmationNumberOutlined,
  ManageAccountsRounded,
  Settings,
} from "@mui/icons-material";
import { useState } from "react";
import { RifaOwners } from "./owners";
import { RifaSeats } from "./rifa";
import { Rifa } from "./rifasSlice";

interface OpenRifaProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  rifa: Rifa | null;
}

export const RifaActions = ({ open, onClose, rifa }: OpenRifaProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    onClose(true);
    navigate(`${location.pathname}`);
  };

  const [seatsModal, setSeatsModal] = useState<boolean>(false);
  const closeSeatsModal = () => {
    setSeatsModal(false);
  };

  const [managersModal, setManagersModal] = useState<boolean>(false);
  const closeManagersModal = () => {
    setManagersModal(false);
  };

  return (
    <>
      <Dialog
        open={open}
        PaperProps={{ sx: { width: "100%", maxWidth: "md" } }}
      >
        <DialogTitle textAlign="center">Ações</DialogTitle>
        <DialogContent>
          <Grid container item xs={12} justifyContent="center">
            <Button
              onClick={() => {
                setSeatsModal(true);
              }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6">Ver números</Typography>
                  <Icon>
                    <ConfirmationNumberOutlined />
                  </Icon>
                </CardContent>
              </Card>
            </Button>
            <Button
              onClick={() => {
                setManagersModal(true);
              }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6">Adicionar gerentes</Typography>
                  <Icon>
                    <ManageAccountsRounded />
                  </Icon>
                </CardContent>
              </Card>
            </Button>
            <Button onClick={() => {}}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Configurações</Typography>
                  <Icon>
                    <Settings />
                  </Icon>
                </CardContent>
              </Card>
            </Button>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>

      <RifaSeats open={seatsModal} onClose={closeSeatsModal} rifa={rifa} />
      <RifaOwners
        open={managersModal}
        onClose={closeManagersModal}
        rifa={rifa}
      />
    </>
  );
};
