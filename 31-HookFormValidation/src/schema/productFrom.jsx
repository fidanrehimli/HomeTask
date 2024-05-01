import * as yup from "yup"

export const productFormSchema=yup.object().shape({
    name: yup.string().min(3).max(6).required("This field is required"),
    password: yup
    .number()
    .required("Bu teleb olunandir")
    .min(8,"Parol qisadir")
    .matches(/^(?=.*[a-z])/,"En az 1 dene kicik herf olmalidir")
    .matches(/^(?=.*[A-Z])/,"En az 1 dene boyuk herf olmalidir")
    .matches(/^(?=.*[0-9])/,"En az 1 dene reqem  olmalidir")
    .matches(/^(?=.*[!@#$%])/,"En az 1 dene xususi simvol olmalidir")
    // unitPrice: yup.number().positive().required(),
    // unitsOnOrder: yup.number().positive().required(),
    // supplierId: yup.string().required(),
})