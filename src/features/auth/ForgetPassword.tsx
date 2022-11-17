import { Clear, Done, Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Card, CardContent, Container, InputAdornment, Stack, Tab, Tabs, TextField, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useHandleFormik from '../../custom-hooks/useHandleFormik'
import { forgetPassordSchema, forgetPasswordInitialState } from '../../models/auth.model'
import { generateResetLink, sendEmail } from '../../utils/sendEmail'
import { v4 as uuid } from 'uuid';
import agent from '../../api/agent'
import { useSnackbar } from 'notistack'
import { IUser } from '../../components/slices/auth.slice';

const ForgetPassword: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const handleFormikSubmit = async () => {
        const user: IUser[] = await agent.auth.checkUser(values.email as string);
        if (user.length === 0) {
            enqueueSnackbar("No user found", {
                variant: 'error',
                anchorOrigin: { horizontal: 'right', vertical: 'bottom' }
            })
            setFieldValue('email', '');
        }
        const resetToken = uuid();
        await agent.auth.setResetToken(user[0].email, resetToken);
        sendEmail(user[0].name, generateResetLink(resetToken), user[0].email);
        // emailjs.send("service_y6ei9l8", "template_kv2mq8a", {
        //     from_name: "vendor",
        //     to_name: "hamza",
        //     message: "reset link",
        //     email: "hamzaussaid9@gmail.com",
        // })
        // .then(res=>console.log(res))
        // .catch(err=> console.log(err))
        enqueueSnackbar("email has been sent", {
            variant: 'success',
            anchorOrigin: { horizontal: 'right', vertical: 'bottom' }
        })
        navigate('/auth');
    }
    const { values, touched, errors, isSubmitting, setFieldValue, getFieldProps, handleSubmit } = useHandleFormik(forgetPasswordInitialState, forgetPassordSchema, handleFormikSubmit);
    return (
        <React.Fragment>
            <Container sx={{ marginTop: "50px" }} maxWidth="sm">
                <Card variant="elevation" elevation={8}>
                    <Tabs value={0} indicatorColor='primary' variant='fullWidth'>
                        <Tab label="Forget Password" value={0} />
                    </Tabs>
                    <CardContent>
                        <form noValidate onSubmit={handleSubmit}>
                            <Tooltip placement="top-end" disableHoverListener title={`${!errors.email ? '' : errors.email}`} arrow>
                                <TextField
                                    label="E-mail"
                                    margin='dense'
                                    variant='outlined'
                                    {...getFieldProps('email')}
                                    size='medium'
                                    error={Boolean(touched.email && errors.email)}
                                    fullWidth
                                    disabled={isSubmitting}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            {touched.email ? errors.email ? <Clear color="error" /> : <Done color="primary" /> : ''}
                                        </InputAdornment>
                                    }} />
                            </Tooltip>
                            <Stack direction='row-reverse'>
                                <Typography variant='body2' sx={{
                                    cursor: 'pointer', '&:hover': {
                                        color: '#033b57'
                                    }
                                }} mt={1} color='#006699'
                                    onClick={() => navigate('/auth')}
                                >
                                    want to Sign In?
                                </Typography>
                            </Stack>
                            <LoadingButton loadingPosition='start' startIcon={<Save />} variant='contained' type='submit' fullWidth sx={{ margin: '15px 0px' }}>
                                Forget
                            </LoadingButton>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </React.Fragment>
    )
}

export default ForgetPassword