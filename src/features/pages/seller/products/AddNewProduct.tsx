import { ArrowBack, AttachFile, Save } from '@mui/icons-material';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import InputFeild from '../../../../components/UI/InputFeild';
import useHandleFormik from '../../../../custom-hooks/useHandleFormik';
import { Iproduct, InewProduct, newProduct, ProductSchema } from '../../../../models/products.model';
import { categories } from '../../../../models/universal.model';
import ImageUploading, { ErrorsType, ImageListType } from 'react-images-uploading';
import axios, {AxiosError, AxiosResponse} from 'axios';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from '../../../../custom-hooks/useReduxActions';
import agent from '../../../../api/agent';
import { useSnackbar } from 'notistack';

const AddNewProduct = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAppSelector(state => state.auth)
    const navigate = useNavigate();
    const [image, setImage] = React.useState<ImageListType>([]);
    const [loading, setLoading] = React.useState<true | false>(false);
    const startLoading = () => setLoading(true);
    const endLoading = () => setLoading(false);
    const handleAddProduct = async () => {
        startLoading();
        const imageData = new FormData();
        let imageUrl = '';
        if (image[0].file) {
            imageData.append('file', image[0]!.file);
            imageData.append("upload_preset", "demo-vendor")
            imageData.append("cloud_name", "dsfptwc9x")
            await axios.post("https://api.cloudinary.com/v1_1/dsfptwc9x/image/upload", imageData)
                .then((res:AxiosResponse) => {
                    console.log(res.data);
                    imageUrl = res.data.url as string
                })
                .catch((err:AxiosError) => {
                    console.log(err);
                    imageUrl = '';
                })
        }
        const newProduct:Iproduct = {
            id: uuid(),
            ownerId: user?.id as string,
            ...(values as InewProduct),
            image: imageUrl
        }
        await agent.products.createproduct(newProduct)
        .then(res=>{
            enqueueSnackbar("New Product added in store", {
                variant: "info",
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
              });
        })
        .catch(err=>{
            enqueueSnackbar("Product could  not added", {
                variant: "error",
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
              });
            console.log(err);
        })
        resetForm();
        endLoading();
    }
    const { errors, touched, values, getFieldProps, resetForm, isSubmitting, handleSubmit } = useHandleFormik(newProduct, ProductSchema, handleAddProduct);
    return (
        <React.Fragment>
            <Button onClick={() => navigate('/manage-store')} size={'small'} startIcon={<ArrowBack />} variant={'contained'} color={'info'}>
                Go Back
            </Button>
            <Grid container>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Card sx={{ marginTop: '15px' }} variant='elevation' elevation={8}>
                        <CardContent>
                            <Typography marginBottom={'15px'} variant='h5' fontWeight='bold' color="#006699" textAlign="center" >
                                Add new Product to my Store
                            </Typography>
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                        <InputFeild
                                            label="Title"
                                            name="title"
                                            type="text"
                                            variant="outlined"
                                            margin="dense"
                                            fullWidth
                                            isSubmitting={isSubmitting}
                                            getFieldProps={getFieldProps}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                        <InputFeild
                                            label="Category"
                                            name="category"
                                            type="text"
                                            variant="outlined"
                                            margin="dense"
                                            fullWidth
                                            select
                                            options={categories}
                                            isSubmitting={isSubmitting}
                                            getFieldProps={getFieldProps}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                        <InputFeild
                                            label="Price"
                                            name="price"
                                            variant="outlined"
                                            margin="dense"
                                            fullWidth
                                            isSubmitting={isSubmitting}
                                            getFieldProps={getFieldProps}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                        <InputFeild
                                            label="Discount"
                                            name="discount"
                                            variant="outlined"
                                            margin="dense"
                                            fullWidth
                                            isSubmitting={isSubmitting}
                                            getFieldProps={getFieldProps}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <InputFeild
                                            label="Description"
                                            name="description"
                                            type="text"
                                            margin='dense'
                                            variant='outlined'
                                            rows={3}
                                            fullWidth
                                            isSubmitting={isSubmitting}
                                            getFieldProps={getFieldProps}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <ImageUploading value={image} onChange={(img: ImageListType) => setImage(img as never[])}>
                                            {({
                                                errors,
                                                imageList,
                                                onImageUpload,
                                                onImageRemoveAll
                                            }) => <NewProductImage errors={errors} imageList={imageList} loading={loading} onImageRemoveAll={onImageRemoveAll} onImageUpload={onImageUpload} />
                                            }
                                        </ImageUploading>
                                    </Grid>
                                </Grid>
                                <Stack direction={'row'} justifyContent={'flex-end'}>
                                    <LoadingButton loading={loading} loadingPosition='start' type="submit" startIcon={<Save />} variant={'contained'} >
                                        Save
                                    </LoadingButton>
                                </Stack>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default AddNewProduct;


interface INewProductImage {
    loading: true | false,
    errors: ErrorsType,
    imageList: ImageListType,
    onImageUpload: () => void,
    onImageRemoveAll: () => void

}

const NewProductImage: React.FC<INewProductImage> = ({
    errors,
    imageList,
    loading,
    onImageUpload,
    onImageRemoveAll
}) => {
    useEffect(() => {
        if (!loading)
            onImageRemoveAll();
    }, [loading])
    return (
        <>
            <Button disabled={loading} sx={{ marginBottom: '15px' }} color="info" variant='outlined' startIcon={<AttachFile />} onClick={onImageUpload} >
                Attach files
            </Button>
            <br />
            {
                imageList.map((imageUrl, index) => <img width="auto" height="120" src={imageUrl.dataURL} key={index} />)
            }
            {
                (errors && errors.maxNumber) ? <Typography color="red" >Max no of files: 1</Typography> : null
            }
        </>
    )

}