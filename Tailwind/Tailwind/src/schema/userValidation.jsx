import * as yup from "yup"

export const userValidation = yup.object().shape({
    id: yup.string().required("This field is required."),
    username: yup
        .string()
        .required("This field is required.")
        .min(3, "3 simvoldan boyuk olmalidir")
        .max(7, "7 simvoldan kichik olmalidir."),
    password: yup
    .string()
    .required("This field is required")
})