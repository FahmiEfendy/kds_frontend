import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

import users from "../../data/users.json";
import { login } from "../../store/authSlice";

type FormValues = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>();

  const submitHandler = (data: FormValues) => {
    const username = data?.username;
    const password = data?.password;

    if (!username || !password) {
      // TODO: ADD ERROR MESSAGE
      return;
    }

    const loggedUser = users.find(
      (user) =>
        user.username === data.username && user.password === data.password
    );

    if (loggedUser) {
      dispatch(login({ username }));
      navigate("/");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justfiyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "100%",
            gap: 3,
            padding: "3rem",
            border: "1px solid black",
            borderRadius: "1rem",
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Login
          </Typography>
          <TextField
            required
            label="Username"
            placeholder="Enter your username..."
            {...register("username")}
          />
          <TextField
            required
            label="Password"
            type="password"
            placeholder="Enter your password..."
            {...register("password")}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default LoginPage;
