import * as yup from 'yup';

export interface IRegister {
    id: string,
    name: string,
    email: string,
    contactNo: string,
    password: string,
}

export interface ISignup {
    name: string,
    email: string,
    contactNo: string,
    password: string,
    confirmPassword: string
}

export const signUpInitialState: ISignup = {
    name: '',
    email: '',
    contactNo: '',
    password: '',
    confirmPassword: ''
}

export const signUpSchema = yup.object().shape({
    name: yup.string().required('name is mandatory').min(6, 'minimum 6 characters').max(20, 'maximum 20 characters are required').trim().strict(),
    email: yup.string().required('email is mandatory').email('should be correct email'),
    contactNo: yup.string().required('contact no is required').min(11).max(11),
    password: yup.string().required('password is required').min(8, 'minimum 8 characters').matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter').matches(/[A-Z]/, 'Password requires an uppercase letter').matches(/[^\w]/, 'Password requires a special character'),
    confirmPassword: yup.string().required('confirm password is required').oneOf([yup.ref('password'), null],'confirm password should be same')
})

export interface ISignin {
    email: string,
    password: string
}

export const signIninitialState: ISignin = {
    email: '',
    password: ''
}

export const signInSchema = yup.object().shape({
    email: yup.string().required('email is mandatory').email('should be correct email'),
    password: yup.string().required('password is required').min(8)
})

export const forgetPasswordInitialState:IForgetPassword = {
    email: ''
}

export interface IForgetPassword {
    email: string
}

export const forgetPassordSchema = yup.object().shape({
    email: yup.string().required('email is mandatory').email('should be correct email')
})

export interface IResetPassword {
    password: string,
    confirmPassword: string
}

export const resetPasswordInitialState:IResetPassword = {
password: '',
confirmPassword: ''
}

export const resetPasswordSchema = yup.object().shape({
    password: yup.string().required('password is required').min(8, 'minimum 8 characters').matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter').matches(/[A-Z]/, 'Password requires an uppercase letter').matches(/[^\w]/, 'Password requires a special character'),
    confirmPassword: yup.string().required('confirm password is required').oneOf([yup.ref('password'), null],'confirm password should be same')
})