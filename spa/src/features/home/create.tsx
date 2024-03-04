import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import { listRifas, newRifa } from "./homeSlice";

interface CreateRifaProps {
	open: boolean;
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateRifa = ({ open, onClose }: CreateRifaProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);

	const [name, setName] = useState<string>("");
	const [end, setEnd] = useState<Date | null>(new Date());
	const [seats, setSeats] = useState<number>(0);

	const resetVariables = () => {
		setName("");
		setEnd(new Date());
		setSeats(0);
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
			end,
			seats,
		};

		try {
			dispatch(newRifa(data));
			dispatch(listRifas());
			handleClose();
		} catch (e) {
			handleClose();
		}
	};

	return (
		<>
			<Dialog open={open} PaperProps={{ sx: { width: "100%", maxWidth: "md" } }}>
				<DialogTitle textAlign="center">Create new Rifa</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={9}>
							<TextField
								label="Name"
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
						<Grid item xs={3} marginTop="20px">
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DateTimePicker
									label="End Date"
									value={end}
									onChange={(date) => {
										setEnd(date);
									}}
								/>
							</LocalizationProvider>
						</Grid>
						<Grid container item justifyContent="center">
							<Grid item xs={4}>
								<TextField
									label="Numbers"
									required
									type="number"
									autoComplete="off"
									fullWidth
									value={seats}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
										setSeats(Number(event.target.value))
									}
								/>
							</Grid>
						</Grid>
					</Grid>
				</DialogContent>

				<DialogActions sx={{ p: "1.25rem" }}>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={() => setConfirmationDialog(true)}>Create</Button>
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
