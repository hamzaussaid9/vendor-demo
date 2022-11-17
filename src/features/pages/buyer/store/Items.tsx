import { Grid, Skeleton, Typography } from '@mui/material'
import React from 'react';
import agent from '../../../../api/agent';
import { useAppSelector } from '../../../../custom-hooks/useReduxActions';
import { Iproduct } from '../../../../models/products.model';
import SingleProduct from '../../seller/products/SingleProduct';

const Items = () => {
    const { user, isLoading } = useAppSelector(state => state.auth);
    const [products, setProducts] = React.useState<Iproduct[]>([]);
    const [loading, setLoading] = React.useState<true | false>(false);
    const startLoading = () => setLoading(true);
    const endLoading = () => setLoading(false);
    const getProducts = async () => {
        startLoading();
        await agent.products.getAllProducts()
            .then((res: Iproduct[]) => setProducts(res.filter(item => item.ownerId !== `${user?.id}`)))
            .catch(err => console.log(err))
        endLoading();
    }
    React.useEffect(() => {
        getProducts();
    }, [user])
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
    if (products.length === 0)
        return (
            <React.Fragment>
                <Typography textAlign={'center'} variant='h3' color="#006699">
                    Products
                </Typography>
                <Typography>
                    NO products found
                </Typography>
            </React.Fragment>
        )

    return (
        <React.Fragment>
                <Typography textAlign={'center'} variant='h3' color="#006699">
                    Products
                </Typography>
        <Grid spacing={3} container>
            {
                products.map(item => {
                    return (
                        <Grid display="flex" justifyContent={'center'} alignItems={'center'} key={item.id} item xs={12} sm={6} md={6} lg={4}>
                            <SingleProduct preview={true} getProducts={getProducts} product={item} />
                        </Grid>
                    )
                })
            }
        </Grid>
        </React.Fragment>
    )
}

export default Items