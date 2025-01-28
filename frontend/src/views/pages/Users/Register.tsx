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
import useRegister from "./hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const tokenExists = !!sessionStorage.getItem("token");

  const { mutate: registerUser, isPending: registerLoading } = useRegister();

  const defaultValues = {
    firstName: "",
    lastName: "",
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
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required"),
      })
    ),
  });

  const onSubmit = async (values: User) => {
    registerUser({
      firstName: values.firstName,
      lastName: values.lastName,
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
        <Card style={{ maxWidth: "70vw" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Grid2 container spacing={1}>
                <Grid2 style={{ width: "100%" }}>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        error={!!errors.firstName}
                        helperText={
                          errors.firstName ? errors.firstName.message : null
                        }
                        style={{ width: "100%" }}
                        label={"First name"}
                        {...field}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 style={{ width: "100%" }}>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        error={!!errors.lastName}
                        helperText={
                          errors.lastName ? errors.lastName.message : null
                        }
                        style={{ width: "100%" }}
                        label={"Last name"}
                        {...field}
                      />
                    )}
                  />
                </Grid2>
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
              <Button
                variant="contained"
                disabled={registerLoading}
                type="submit"
              >
                Register
              </Button>
              <Button
                disabled={registerLoading}
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>
    )
  );
};

export default Register;
