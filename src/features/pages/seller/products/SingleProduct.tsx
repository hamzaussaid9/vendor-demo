import { Add, Edit, Shop } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import React from 'react'
import { Iproduct } from '../../../../models/products.model'
import EditProductDialog from './EditProductDialog';

interface ISingleProduct {
    product: Iproduct,
    preview: true | false,
    getProducts: () => void
}

const SingleProduct: React.FC<ISingleProduct> = ({
    product,
    preview,
    getProducts
}) => {
    const [edit, setEdit] = React.useState<true | false>(false);
    const openEditMode = () => setEdit(true);
    const closeEditMode = () => setEdit(false);
    return (
        <React.Fragment>
            <Card sx={{ width: 345 }}>
                <CardMedia src={product.image} component="img" height="150" />
                <CardContent>
                    <Typography variant='h6' color="#006699" fontWeight={'bold'}>
                        {product.title}
                    </Typography>
                    <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
                        <Typography variant='body1'>
                            Price: <span style={{textDecoration: 'line-through'}}>{product.price}</span>
                            <span> { (product.price *(100-product.discount))/100}</span>
                            <Typography variant='body2' color="#006699">
                                {product.discount}% off
                            </Typography>
                        </Typography>
                        <Chip size="small" label={`Category ${product.category}`} color='primary' variant='outlined' />
                    </Stack>
                    <Typography variant='caption' color="grey">
                        {product.description.substring(0, 50)}
                    </Typography>
                </CardContent>
                <CardActions>
                    {
                        preview ?
                            <Button variant='contained' fullWidth startIcon={<Add />}>
                                Add to cart
                            </Button>
                            :
                            <Button onClick={openEditMode} variant='outlined' fullWidth startIcon={<Edit />}>
                                Edit
                            </Button>
                    }
                </CardActions>
            </Card>
            <EditProductDialog
                CloseEditing={closeEditMode}
                getProducts={getProducts}
                isEditing={edit}
                product={product}
            />
        </React.Fragment >
    )
}

export default SingleProduct;