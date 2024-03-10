import { CheckBox, DisabledByDefault } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { bookSeat } from "../features/buy/buySlice";
import { Seat } from "../features/rifas/rifasSlice";
import { ConfirmationDialog } from "./ConfirmationDialog";

interface SeatDialogProps {
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
	seat: Seat | null;
}

export const BuyDialog = ({ onClose, open, seat }: SeatDialogProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const handleClose = () => {
		onClose(true);
		setBookingDialog(false);
		navigate(location.pathname);
	};

	const [name, setName] = useState<string>("");
	const [bookingDialog, setBookingDialog] = useState<boolean>(false);

	const handleBooking = () => {
		setBookingDialog(true);
	};

	const handleBookingSeat = () => {
		const data = {
			name,
			id: seat?.id,
		};

		try {
			dispatch(bookSeat(data));
			handleClose();
		} catch (e) {
			handleClose();
		}

		navigate("/buy");
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
					<TextField
						label="Nome"
						variant="outlined"
						required
						fullWidth
						value={name}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setName(event.target.value as any);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button onClick={handleBooking} disabled={seat?.pago}>
						Reservar
					</Button>
				</DialogActions>
			</Dialog>

			<ConfirmationDialog
				open={bookingDialog}
				onClose={() => setBookingDialog(false)}
				executeFunction={handleBookingSeat}
			/>
		</>
	);
};
