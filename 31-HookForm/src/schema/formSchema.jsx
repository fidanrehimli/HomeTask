import * as yup from 'yup';

const formSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  option: yup.string().required('Option is required'),

  identificationNumber: yup.string()
  .when('option', {
    is: 'AA',
    then: yup.string().length(7, 'Identification number must be exactly 7 digits').required('Identification number is required')
  })
  .when('option', {
    is: 'AZE',
    then: yup.string().length(8, 'Identification number must be exactly 8 digits').required('Identification number is required')
  })
});
export default formSchema;