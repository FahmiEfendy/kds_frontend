import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

import { RootState } from "../../store";
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

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

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
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  });

  return (
    <Container
      maxWidth="sm"
      disableGutters
      sx={{
        minHeight: "100vh",
        display: "flex",
        justfiyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(submitHandler)}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
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
    </Container>
  );
};

export default LoginPage;
