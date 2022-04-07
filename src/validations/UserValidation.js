import * as yup from 'yup';

const rules = {
    email: yup.string().email().required(),
    password: yup
        .string()
        .min(8, 'Password is too short.')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            'Invalid password'
        )
        .required(),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
};

export const signinSchema = yup.object().shape({
    email: rules.email,
    password: rules.password,
});

export const signupSchema = yup.object().shape({
    email: rules.email,
    password: rules.password,
    confirm_password: rules.passwordConfirmation,
});

export const passwordSchema = yup.object().shape({
    password: rules.password,
    confirm_password: rules.passwordConfirmation,
});
