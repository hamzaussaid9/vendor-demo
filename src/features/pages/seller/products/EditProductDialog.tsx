import { AttachFile, Cancel, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import ImageUploading, { ErrorsType, ImageListType } from 'react-images-uploading';
import InputFeild from '../../../../components/UI/InputFeild';
import useHandleFormik from '../../../../custom-hooks/useHandleFormik';
import { Iproduct, ProductSchema } from '../../../../models/products.model';
import { categories } from '../../../../models/universal.model';

interface IEditProductDialog {
    product: Iproduct
    isEditing: true | false,
    CloseEditing: () => void,
    getProducts: () => void

}

const EditProductDialog: React.FC<IEditProductDialog> = ({
    product,
    isEditing,
    CloseEditing,
    getProducts
}) => {
    const [image, setImage] = React.useState<ImageListType>([]);
    const [loading, setLoading] = React.useState<true | false>(false);
    const startLoading = () => setLoading(true);
    const endLoading = () => setLoading(false);
    const handleFormikSubmit = async () => {
        startLoading();
        await getProducts();
        endLoading();
    }
    const { errors, touched, values, getFieldProps, resetForm, isSubmitting, handleSubmit } = useHandleFormik(product, ProductSchema, handleFormikSubmit);
    return (
        <Dialog open={isEditing} onClose={CloseEditing}>
            <DialogTitle>
                Edit Product
            </DialogTitle>
            <form noValidate onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <InputFeild
                                label="Title"
                                name="title"
                                type="text"
                                variant="outlined"
                                margin="dense"
                                size='small'
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
                                size='small'
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
                                size='small'
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
                                size='small'
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
                                size='small'
                                rows={3}
                                fullWidth
                                isSubmitting={isSubmitting}
                                getFieldProps={getFieldProps}
                                errors={errors}
                                touched={touched}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography color="#006699">
                                Previous Image:
                            </Typography>
                            <img width="auto" height="120" src={product.image} />
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
                </DialogContent>
                <DialogActions>
                    <Stack spacing={3} direction={'row'} justifyContent={'flex-end'}>
                        <Button startIcon={<Cancel />} variant='outlined' onClick={CloseEditing}>
                            Cancel
                        </Button>
                        <LoadingButton loading={loading} loadingPosition='start' type="submit" startIcon={<Save />} variant={'contained'} >
                            Save
                        </LoadingButton>
                    </Stack>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EditProductDialog



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
    React.useEffect(() => {
        if (!loading)
            onImageRemoveAll();
    }, [loading])
    return (
        <>
            <Button disabled={loading} sx={{ marginBottom: '15px' }} color="info" variant='outlined' startIcon={<AttachFile />} onClick={onImageUpload} >
                Update file (if you want)
            </Button>
            <br />
            {
                imageList.length !== 0  ? "New Image:" : ""
            }
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