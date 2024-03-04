import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface ConfirmationDialogProps {
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
	executeFunction: any;
}

export const ConfirmationDialog = ({
	onClose,
	open,
	executeFunction,
}: ConfirmationDialogProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleClose = () => {
		onClose(true);
		navigate(location.pathname);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Confirmation Dialog</DialogTitle>
			<DialogContent>It's ok to proceed?</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={executeFunction}>Confirm</Button>
			</DialogActions>
		</Dialog>
	);
};
