import { Grid, Skeleton } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../custom-hooks/useReduxActions'
import { Iproduct } from '../../../models/products.model'
import SingleProduct from './products/SingleProduct'

interface IShowProducts {
    products: Iproduct[],
    getProducts: ()=>void,
    loading: true | false
}

const ShowProducts: React.FC<IShowProducts> = ({
    products,
    loading,
    getProducts
}) => {
    const {isLoading} = useAppSelector(state=>state.auth);
    if (loading || isLoading) {
        return (
            <Grid spacing={3} container>
                {
                    [1, 2, 3, 4, 5, 6].map(i => (
                        <Grid key={i} item xs={12} sm={6} md={6} lg={4}>
                            <Skeleton width="100%" height="300px" variant='rectangular' animation="wave" />
                        </Grid>
                    ))
                }
            </Grid>
        )
    }
    return (
        <Grid spacing={3} container>
            {
                products.map(item => {
                    return (
                        <Grid display="flex" justifyContent={'center'} alignItems={'center'} key={item.id} item xs={12} sm={6} md={6} lg={4}>
                            <SingleProduct preview={false} getProducts={getProducts} product={item} />
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default ShowProducts