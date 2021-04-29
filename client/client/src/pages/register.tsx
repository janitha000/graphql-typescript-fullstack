import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';

interface registerProps {

}

const onSubmit = (values) => {
    console.log(values)
}

const Register: React.FC<registerProps> = ({ }) => {
    return (
        <Wrapper>
            <Formik initialValues={{ username: "", password: "" }} onSubmit={(val) => onSubmit(val)}>
                {({ values, handleChange, isSubmitting }) => (

                    <Form>
                        <InputField name='username' label="UserName"></InputField>
                        <InputField name='password' label="Password" type="password"></InputField>
                        <Box mt="10px"><Button type='submit' colorScheme="teal" >Register</Button></Box>
                    </Form>

                )}
            </Formik>
        </Wrapper>

    );
}

export default Register;