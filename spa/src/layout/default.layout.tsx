import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
			<Container component="main" sx={{ mt: 2, mb: 2 }}>
				<Outlet />
			</Container>
		</Box>
	);
};
