import { CheckBox, DisabledByDefault } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { Seat, cancelSeat, updateSeat } from "../features/rifas/rifasSlice";
import { ConfirmationDialog } from "./ConfirmationDialog";

interface SeatDialogProps {
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
	seat: Seat | null;
}

export const SeatDialog = ({ onClose, open, seat }: SeatDialogProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const handleClose = () => {
		onClose(true);
		setUpdateDialog(false);
		setCancelDialog(false);
		navigate(location.pathname);
	};

	const [updateDialog, setUpdateDialog] = useState<boolean>(false);
	const [cancelDialog, setCancelDialog] = useState<boolean>(false);

	const handleUpdate = () => {
		setUpdateDialog(true);
	};
	const handleCancel = () => {
		setCancelDialog(true);
	};

	const handleUpdateSeat = () => {
		try {
			dispatch(updateSeat(seat?.id ? seat?.id : null));
			handleClose();
		} catch (e) {
			handleClose();
		}
	};
	const handleCancelSeat = () => {
		try {
			dispatch(cancelSeat(seat?.id ? seat?.id : null));
			handleClose();
		} catch (e) {
			handleClose();
		}
	};

	return (
		<>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Número {seat?.seat}</DialogTitle>
				<DialogContent>
					{seat?.name && (
						<>
							<Typography variant="h5" gutterBottom>
								<strong>Reservado por: </strong> {seat?.name}
							</Typography>
							<Typography variant="h5" gutterBottom>
								<strong>Pago: </strong>
								{seat?.pago ? (
									<CheckBox style={{ color: "green" }} />
								) : (
									<DisabledByDefault style={{ color: "red" }} />
								)}
							</Typography>
						</>
					)}
					<Button onClick={handleUpdate} disabled={seat?.pago}>
						Pago
					</Button>
					<Button onClick={handleCancel} disabled={seat?.pago}>
						Cancelar reserva
					</Button>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
				</DialogActions>
			</Dialog>

			<ConfirmationDialog
				open={updateDialog}
				onClose={() => setUpdateDialog(false)}
				executeFunction={handleUpdateSeat}
			/>
			<ConfirmationDialog
				open={cancelDialog}
				onClose={() => setCancelDialog(false)}
				executeFunction={handleCancelSeat}
			/>
		</>
	);
};
