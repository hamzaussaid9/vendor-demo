import { Add } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import agent from '../../../api/agent';
import { useAppSelector } from '../../../custom-hooks/useReduxActions';
import { Iproduct } from '../../../models/products.model';
import ShowProducts from './ShowProducts';

const ManageStore = () => {
  const { user } = useAppSelector(state=>state.auth);
  const navigate = useNavigate();
  const [products, setProducts] = React.useState<Iproduct[]>([]);
  const [previewMode, setPreviewMode] = React.useState<true | false>(false);
  const [loading, setLoading] = React.useState<true | false>(false);
  const startLoading = () => setLoading(true);
  const endLoading = () => setLoading(false);
  const getProducts = async () => {
    startLoading();
    await agent.products.getSellerProducts(`${user?.id}`)
    .then((res)=>{
      console.log(res);
      setProducts(res as Iproduct[]);
    })
    .catch((err)=>{
      console.log(err);
    })
    endLoading();
  }
  React.useEffect(() => {
    getProducts();
  }, [user])
  console.log(products);
  return (
    <React.Fragment>
      <Button onClick={() => navigate('new')} size={'small'} startIcon={<Add />} variant={'contained'} color={'info'}>
        Add new product
      </Button>
      <br /> <br />
      {
        (products.length && !loading) === 0  ? <Typography variant='h5' color="#006699" fontWeight="bold">Start creating your own store by adding product</Typography> : ''
      }
      <ShowProducts getProducts={getProducts} loading={loading} products={products} />
    </React.Fragment>
  );
}

export default ManageStore;