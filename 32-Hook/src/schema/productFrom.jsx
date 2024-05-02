import * as yup from "yup"

export const productFormSchema=yup.object().shape({
    companyName: yup
    .string()
    .trim()
    .required("This is required")
    .min(3,"name 4 characters length")
})