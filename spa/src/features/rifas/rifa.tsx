import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { SeatDialog } from "../../components/SeatDialog";
import { Rifa, Seat } from "./rifasSlice";

interface OpenRifaProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  rifa: Rifa | null;
}

export const RifaSeats = ({ open, onClose, rifa }: OpenRifaProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [seatDialog, setSeatDialog] = useState<boolean>(false);

  const [seat, setSeat] = useState<Seat | null>(null);

  const resetVariables = () => {
    setSeat(null);
  };

  const handleClose = () => {
    resetVariables();
    setSeatDialog(false);
    onClose(true);
    navigate(`${location.pathname}`);
  };

  const handleSeat = (seat: any) => {
    setSeat(seat);
    setSeatDialog(true);
  };

  return (
    <>
      <Dialog
        open={open}
        PaperProps={{ sx: { width: "100%", maxWidth: "md" } }}
      >
        <DialogTitle textAlign="center">Números da Rifa</DialogTitle>
        <DialogContent>
          {rifa?.seats.map((seat) => (
            <Button
              variant="contained"
              style={{ backgroundColor: seat.name ? "grey" : "green" }}
              onClick={() => handleSeat(seat)}
              disabled={!seat?.pago && !seat.name}
            >
              {seat.seat}
            </Button>
          ))}
        </DialogContent>

        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>

      <SeatDialog
        open={seatDialog}
        onClose={() => {
          setSeatDialog(false);
        }}
        seat={seat}
      />
    </>
  );
};
