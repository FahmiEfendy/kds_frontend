import { Container, Typography } from "@mui/material";

import Navbar from "../../components/navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Container
        fixed
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Welcome to Content Management System!
        </Typography>
      </Container>
    </>
  );
};

export default HomePage;
