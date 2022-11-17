import { Clear, Done, Save } from '@mui/icons-material'
import { Grid, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useHandleFormik from '../../custom-hooks/useHandleFormik';
import { signIninitialState, signInSchema } from '../../models/auth.model';
import agent from '../../api/agent';
import { useSnackbar } from 'notistack';
import InputFeild from '../UI/InputFeild';



const SignIn = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleFormikSubmit = async () => {
    const user = await agent.auth.validatetUser({
      email: values.email,
      password: values.password
    })
    if (user.length !== 0) {
      console.log(user);
      localStorage.setItem('token', user[0].id);
      navigate('/');
      enqueueSnackbar("Sign In successful", {
        variant: "info",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    } else {
      setFieldValue('password', '');
      enqueueSnackbar("Invalid credentials", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    }
  }
  const { values, touched, errors, isSubmitting, setFieldValue, getFieldProps, handleSubmit } = useHandleFormik(signIninitialState, signInSchema, handleFormikSubmit);
  return (
    <React.Fragment>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {/* <Tooltip placement="top-end" disableHoverListener title={`${!errors.email ? '' : errors.email}`} arrow>
              <TextField
                label='E-mail'
                {...getFieldProps('email')}
                type='email'
                margin="dense"
                size='medium'
                error={Boolean(touched.email && errors.email)}
                fullWidth
                disabled={isSubmitting}
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                    {touched.email ? errors.email ? <Clear color="error" /> : <Done color="primary" /> : ''}
                  </InputAdornment>
                }}
              />
            </Tooltip> */}
            <InputFeild
              label="E-mail"
              name="email"
              type="email"
              variant="outlined"
              margin="dense"
              fullWidth
              isSubmitting={isSubmitting}
              getFieldProps={getFieldProps}
              errors={errors}
              touched={touched}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Tooltip placement="top-end" disableHoverListener title={`${!errors.password ? '' : errors.password}`} arrow>
              <TextField
                label='Password'
                {...getFieldProps('password')}
                margin="dense"
                type='password'
                size='medium'
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
        </Grid>
        <Stack direction='row-reverse'>
          <Typography variant='body2' sx={{
            cursor: 'pointer', '&:hover': {
              color: '#033b57'
            }
          }} mt={1} color='#006699'
            onClick={() => navigate('/auth/forget-password')}
          >
            Forget Password?
          </Typography>
        </Stack>
        <LoadingButton loadingPosition='start' loading={isSubmitting} startIcon={<Save />} variant='contained' type='submit' fullWidth sx={{ margin: '15px 0px' }}>
          Sign In
        </LoadingButton>
      </form>
    </React.Fragment>
  )
}

export default SignIn;