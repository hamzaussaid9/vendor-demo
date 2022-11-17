import React from 'react'
import { useFormik } from 'formik';
const useHandleFormik = (initialValues:any, validationSchema:any, handleSubmit: ()=>void) => {
    const handleFormik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, {setSubmitting, resetForm, setErrors }) => {
            try {
                await handleSubmit();
                console.log(values);
                setSubmitting(false);
                // resetForm();
            } catch (error : any) {
                setSubmitting(false);
                setErrors(error);
            }
        }

    })
    return handleFormik;
}

export default useHandleFormik

