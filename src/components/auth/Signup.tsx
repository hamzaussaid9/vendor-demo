import { Clear, Done, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Grid, InputAdornment, TextField, Tooltip } from "@mui/material";
import React from "react";
import useHandleFormik from "../../custom-hooks/useHandleFormik";
import { signUpInitialState, signUpSchema } from "../../models/auth.model";
import { v4 as uuid } from 'uuid';
import agent from '../../api/agent';
import { useSnackbar } from 'notistack';

interface ISignUpProps {
  moveToSignIn: () => void
}

const Signup: React.FC<ISignUpProps> = ({ moveToSignIn }) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleFormikSubmit = async () => {
    const user = await agent.auth.checkUser(values.email);
    console.log(user);

    if (user.length === 0) {
      const adduser = await agent.auth.resgisterUser({
        id: uuid(),
        name: values.name,
        contactNo: values.contactNo,
        email: values.email,
        password: values.password
      })
      console.log(adduser);
      enqueueSnackbar("user has been registered", {
        variant: "info",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
      moveToSignIn();
    }
    else {
      values.password = "";
      values.confirmPassword = "";
      enqueueSnackbar("email already exist", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    }
  }

  const { values, isSubmitting, getFieldProps, touched, errors, handleSubmit } = useHandleFormik(signUpInitialState, signUpSchema, handleFormikSubmit);

  return (
    <React.Fragment>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container columnSpacing={1}>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Tooltip placement="top-end" disableHoverListener title={`${!errors.name ? '' : errors.name}`} arrow>
              <TextField
                label='Full Name'
                {...getFieldProps('name')}
                margin="dense"
                size='small'
                error={Boolean(touched.name && errors.name)}
                fullWidth
                disabled={isSubmitting}
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                    {touched.name ? errors.name ? <Clear color="error" /> : <Done color="primary" /> : ''}
                  </InputAdornment>
                }}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Tooltip placement="top-end" disableHoverListener title={`${!errors.contactNo ? '' : errors.contactNo}`} arrow>
              <TextField
                label='Contact No'
                {...getFieldProps('contactNo')}
                margin="dense"
                size='small'
                error={Boolean(touched.contactNo && errors.contactNo)}
                fullWidth
                disabled={isSubmitting}
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                    {touched.contactNo ? errors.contactNo ? <Clear color="error" /> : <Done color="primary" /> : ''}
                  </InputAdornment>
                }}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Tooltip placement="top-end" disableHoverListener title={`${!errors.email ? '' : errors.email}`} arrow>
              <TextField
                label='E-mail'
                {...getFieldProps('email')}
                margin="dense"
                size='small'
                error={Boolean(touched.email && errors.email)}
                fullWidth
                disabled={isSubmitting}
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                    {touched.email ? errors.email ? <Clear color="error" /> : <Done color="primary" /> : ''}
                  </InputAdornment>
                }}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Tooltip placement="top-end" disableHoverListener title={`${!errors.password ? '' : errors.password}`} arrow>
              <TextField
                label='Password'
                {...getFieldProps('password')}
                type='password'
                margin="dense"
                size='small'
                error={Boolean(touched.password && errors.password)}
                fullWidth
                disabled={isSubmitting}
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                    {touched.password ? errors.password ? <Clear color="error" /> : <Done color="primary" /> : ''}
                  </InputAdornment>
                }}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Tooltip placement="top-end" disableHoverListener title={`${!errors.confirmPassword ? '' : errors.confirmPassword}`} arrow>
              <TextField
                label='Confirm Password'
                {...getFieldProps('confirmPassword')}
                margin="dense"
                type='password'
                size='small'
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                fullWidth
                disabled={isSubmitting}
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                    {touched.confirmPassword ? errors.confirmPassword ? <Clear color="error" /> : <Done color="primary" /> : ''}
                  </InputAdornment>
                }}
              />
            </Tooltip>
          </Grid>
        </Grid>
        <LoadingButton
          loadingPosition="start"
          loading={isSubmitting}
          startIcon={<Save />}
          variant="contained"
          type="submit"
          fullWidth
          sx={{ margin: "15px 0px" }}
        >
          Sign Up
        </LoadingButton>
      </form>
    </React.Fragment>
  );
};

export default Signup;