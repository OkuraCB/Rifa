import { Button, Card, CardContent, Fab, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { useNavigate } from "react-router-dom";

import { ArrowBack } from "@mui/icons-material";
import { Rifa, selectRifas } from "../buy/buySlice";
import { BuySeats } from "./buy";
import { listRifas } from "./buySlice";

export const Buy = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [buyDialog, setBuyDialog] = useState<boolean>(false);
	const [rifa, setRifa] = useState<Rifa | null>(null);

	const handleBuyDialogClose = () => {
		setBuyDialog(false);
	};
	const openBuyDialog = (rifa: Rifa) => {
		setRifa(rifa);
		setBuyDialog(true);
	};

	const rifas = useAppSelector(selectRifas);

	useEffect(() => {
		dispatch(listRifas());
	}, []);

	const countFree = (data: any) => {
		const seats = data.seats;
		return seats.filter((seat: any) => seat.pago === false).length;
	};

	return (
		<>
			<Grid
				container
				paddingTop={6}
				flexDirection="row"
				justifyContent="center"
				alignContent="center">
				{rifas.map((rifa) => (
					<Grid container item xs={12} justifyContent="center">
						<Button onClick={() => openBuyDialog(rifa)}>
							<Card>
								<CardContent>
									<Typography variant="h5" gutterBottom>
										<strong>Nome:</strong> {rifa.name}
									</Typography>
									<Typography variant="h5" gutterBottom>
										<strong>Fim:</strong> {(rifa.end as unknown as string).split("T")[0]}
									</Typography>
									<Typography variant="h5" gutterBottom>
										<strong>Espaços:</strong> {countFree(rifa)}
									</Typography>
									<Typography variant="h5" gutterBottom>
										<strong>Preço:</strong> {rifa.price}
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
					onClick={() => navigate("/")}>
					<ArrowBack />
				</Fab>
			</Grid>

			<BuySeats open={buyDialog} onClose={handleBuyDialogClose} rifa={rifa} />
		</>
	);
};
