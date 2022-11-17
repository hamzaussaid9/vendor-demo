import axios, {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';
import { IRegister, ISignin } from '../models/auth.model';
import { InewProduct, Iproduct } from '../models/products.model';
import {v4 as uuid} from 'uuid';

const application = axios.create({
    headers: {
        'Conteht-Type': 'application/json'
    }
})


application.interceptors.request.use(
    (request:AxiosRequestConfig) =>{
        request.baseURL="http://localhost:1500";
        return request;
    },
    (error:AxiosError) =>{
        console.log(error);
        return Promise.reject(error);
    }
);

const responseBody = (res:AxiosResponse) => res.data;

const errorBody = (err:AxiosError) => err.response?.data;

const requests = {
    get: (url: string) => application.get(url).then(responseBody).catch(errorBody),
    post: (url:string, body: {}) => application.post(url,body).then(responseBody).catch(errorBody),
    patch: (url:string, body: {}) => application.patch(url,body).then(responseBody).catch(errorBody),
    delete: (url:string) => application.delete(url).then(responseBody).catch(errorBody)
}

const auth = {
    getUser: (token: string) => requests.get(`/users?id=${token}`),
    checkUser: (email:string)=> requests.get(`/users?email=${email}`),
    validatetUser: (data:ISignin) => requests.get(`/users?email=${data.email}&password=${data.password}`),
    resgisterUser: (user:IRegister) => requests.post('/users', user),
    setResetToken: async (email: string, token: string) => {
        const reset = await application.get(`/reset?email=${email}`).then(res=>res.data);
        if(reset.length !== 0)
        await application.delete(`/reset/${reset[0].id}`);
        return requests.post('/reset',{email,token})
    },
    validateToken: (token: string) => requests.get(`/reset?token=${token}`),
    removeToken: async (token:string) => {
        
        const reset = await application.get(`/reset?token=${token}`).then(res=>res.data);
        await requests.delete(`/reset/${reset[0].id}`);
    },
    updatePassword: (id: string, password:string) =>requests.patch(`/users/${id}`,{password})
}

const products = {
    createproduct: (newProduct: Iproduct) => requests.post('/Products',newProduct),
    getSellerProducts: (ownerId: string) => requests.get(`/Products?ownerId=${ownerId}`),
    getAllProducts: () => requests.get('/Products')
}

// eslint-disable-next-line
export default {
    auth,
    products
};