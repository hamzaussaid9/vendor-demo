import { TextFieldProps } from "@mui/material";
import { FieldInputProps, FormikErrors, FormikTouched } from "formik";

export interface IInputFeild {
    name: string,
    label: string,
    fullWidth?: true | false,
    variant: TextFieldProps["variant"] ,
    type?: TextFieldProps["type"],
    size?: TextFieldProps["size"],
    margin?: TextFieldProps["margin"],
    rows?: TextFieldProps["rows"],
    select?: TextFieldProps["select"],
    options?: string[],
    isSubmitting?: true | false, 
    getFieldProps: (nameOrOptions: string) => FieldInputProps<any>,
    touched: FormikTouched<any>,
    errors: FormikErrors<any>
}