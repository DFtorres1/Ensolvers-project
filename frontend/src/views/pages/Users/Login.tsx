import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useAuthentication from "./hooks/useAuthenticate";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const tokenExists = !!sessionStorage.getItem("token");

  const { mutate: authenticateUser, isPending: authLoading } =
    useAuthentication();

  const defaultValues = {
    username: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required"),
      })
    ),
  });

  const onSubmit = async (values: LoginObjectModel) => {
    authenticateUser({
      username: values.username.trim(),
      password: values.password,
    });
  };

  useEffect(() => {
    if (tokenExists) {
      navigate("/");
    }
  }, [tokenExists, navigate]);

  return (
    !tokenExists && (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#333333",
        }}
      >
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Grid2 container spacing={1}>
                <Grid2 style={{ width: "100%" }}>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        error={!!errors.username}
                        helperText={
                          errors.username ? errors.username.message : null
                        }
                        style={{ width: "100%" }}
                        label={"User"}
                        {...field}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 style={{ width: "100%" }}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        error={!!errors.password}
                        helperText={
                          errors.password ? errors.password.message : null
                        }
                        style={{ width: "100%" }}
                        label={"Password"}
                        {...field}
                      />
                    )}
                  />
                </Grid2>
              </Grid2>
            </CardContent>
            <CardActions style={{ justifyContent: "space-around" }}>
              <Button variant="contained" disabled={authLoading} type="submit">
                Log in
              </Button>
              <Button
                disabled={authLoading}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>
    )
  );
};

export default Login;
