import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Card, CardContent, Fab, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { listRifas, selectRifas } from "./homeSlice";
import AddIcon from "@mui/icons-material/Add";
import { CreateRifa } from "./create";

export const Home = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [createModal, setCreateModal] = useState<boolean>(false);
	const closeCreateModal = () => {
		setCreateModal(false);
	};

	useEffect(() => {
		dispatch(listRifas());
	}, []);

	const countFree = (data: any) => {
		const seats = data.seats;
		return seats.filter((seat: any) => seat.state === "free").length;
	};

	const rifas = useAppSelector(selectRifas);

	return (
		<>
			<Grid
				container
				spacing={2}
				paddingTop={2}
				flexDirection="column"
				justifyContent="center"
				alignContent="center">
				{rifas.map((rifa) => (
					<Grid item xs={12}>
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
							</CardContent>
						</Card>
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
					}}>
					<AddIcon />
				</Fab>
			</Grid>

			<CreateRifa open={createModal} onClose={closeCreateModal} />
		</>
	);
};
