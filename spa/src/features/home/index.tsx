import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { WindupChildren, Pace } from "windups";
import HomePage from "../../assets/homepage.png";

export const Home = () => {
	const navigate = useNavigate();

	return (
		<Grid container spacing={2} padding={4} flexDirection="row">
			<Grid container item xs={6} flexDirection="column" justifyContent="center">
				<Grid item>
					<WindupChildren>
						<Pace getPace={() => 60}>
							<span style={{ fontSize: 60 }}>Rifas Illa</span>
						</Pace>
					</WindupChildren>
				</Grid>
				<Grid item>
					<span>Um sistema para gerenciar as rifas da</span>{" "}
					<span style={{ color: "violet", fontWeight: "bold" }}>mamãe</span>
				</Grid>
				<Grid
					container
					item
					flexDirection="row"
					justifyContent="space-evenly"
					paddingTop={5}>
					<Grid item>
						<Button variant="contained" onClick={() => navigate("/buy")}>
							Comprar uma Rifa
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => navigate("/login")}>
							Gerenciar Rifas
						</Button>
					</Grid>
				</Grid>
			</Grid>
			<Grid container xs={6} flexDirection="column" alignContent="center">
				<Grid item>
					<img src={HomePage} alt="tickets" />
				</Grid>
			</Grid>
		</Grid>
	);
};
