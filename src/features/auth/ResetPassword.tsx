import { Clear, Done, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Card, CardContent, Container, InputAdornment, Tab, Tabs, TextField, Tooltip,} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import agent from '../../api/agent';
import { IUser } from '../../components/slices/auth.slice';
import { checkTokenThunk } from '../../components/slices/reset.slice';
import useHandleFormik from '../../custom-hooks/useHandleFormik';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/useReduxActions';
import { resetPasswordInitialState, resetPasswordSchema } from '../../models/auth.model';

const ResetPassword: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const { email, isLoading } = useAppSelector(state => state.reset);
    const { token } = useParams();
    const navigate = useNavigate();
    const ValidateToken = async () => {
        await dispatch(checkTokenThunk(token as string));
    }
    useEffect(() => {
        ValidateToken();
    }, [token])
    useEffect(() => {
        if (!isLoading && email === null) {
            enqueueSnackbar("Invalid reset token", {
                variant: "error",
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
            navigate('/auth');
        }
    }, [isLoading])
    const hanldeFormikSubmit = async () =>{
        const user:IUser[] = await agent.auth.checkUser(`${email}`);
        if(user[0].password === values.password){
            enqueueSnackbar("New password can not be the previous password", {
                variant: "error",
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            })
            resetForm();
        }
        else {
            await agent.auth.updatePassword(user[0].id, `${values.password}`);
            await agent.auth.removeToken(`${token}`);
            enqueueSnackbar("Password updated successfully", {
                variant: "success",
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            })
            navigate('/auth');
        }
    }
    const { isSubmitting,getFieldProps, values, resetForm ,touched,errors , handleSubmit} = useHandleFormik(resetPasswordInitialState,resetPasswordSchema, hanldeFormikSubmit);
    return (
        <React.Fragment>
            <Container sx={{ marginTop: "50px" }} maxWidth="sm">
                <Card variant="elevation" elevation={8}>
                    <Tabs value={0} indicatorColor='primary' variant='fullWidth'>
                        <Tab label={`Reset Password`} value={0} />
                    </Tabs>
                    <CardContent>
                        <form noValidate onSubmit={handleSubmit}>
                            <Tooltip placement="top-end" disableHoverListener title={`${!errors.password ? '' : errors.password}`} arrow>
                                <TextField
                                    label="Password"
                                    margin='dense'
                                    variant='outlined'
                                    {...getFieldProps('password')}
                                    size='medium'
                                    type='password'
                                    error={Boolean(touched.password && errors.password)}
                                    fullWidth
                                    disabled={isSubmitting}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            {touched.password ? errors.password ? <Clear color="error" /> : <Done color="primary" /> : ''}
                                        </InputAdornment>
                                    }} />
                            </Tooltip>
                            <Tooltip placement="top-end" disableHoverListener title={`${!errors.confirmPassword ? '' : errors.confirmPassword}`} arrow>
                                <TextField
                                    label="confirmPassword"
                                    margin='dense'
                                    variant='outlined'
                                    {...getFieldProps('confirmPassword')}
                                    type='password'
                                    size='medium'
                                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                    fullWidth
                                    disabled={isSubmitting}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            {touched.confirmPassword ? errors.confirmPassword ? <Clear color="error" /> : <Done color="primary" /> : ''}
                                        </InputAdornment>
                                    }} />
                            </Tooltip>
                            <LoadingButton loading={isSubmitting} loadingPosition='start' startIcon={<Save />} variant='contained' type='submit' fullWidth sx={{ margin: '15px 0px' }}>
                                Reset Password
                            </LoadingButton>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </React.Fragment>
    )
}

export default ResetPassword;