import { Password } from "@mui/icons-material";
import * as yup from "yup";

export const authValidation = yup.object().shape({
    emailId: yup.string().email('This is not a valid Email').required('No emailid provided.'),
    password: yup.string().required('No password provided.') .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
})
