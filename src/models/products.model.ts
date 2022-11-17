import * as yup from 'yup';

export interface InewProduct {
    title: string,
    category: string,
    price: number,
    discount:number,
    description: string,
    image: string,
    active: true | false
}

export const newProduct:InewProduct = {
    title: '',
    category: 'A',
    discount: 0,
    price: 0,
    description: '',
    image: '',
    active: true
}

export const ProductSchema = yup.object().shape({
    title: yup.string().required('title is required').min(5, 'title too short').max(30, 'title too long'),
    category: yup.string().required('category is required'),
    price: yup.number().required("price is required").min(10, 'can not be less than 0'),
    discount: yup.number().required("discount is required").min(0, 'can not be less than 0').max(50,'can not be greater than 50'),
    description: yup.string().required('description is required').min(15, "description too short").max(75,"description too long")
})

export interface Iproduct {
    id: string,
    ownerId: string,
    title: string,
    category: string,
    price: number,
    discount:number,
    description: string,
    image: string,
    active: true | false
    
}