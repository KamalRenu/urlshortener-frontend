import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

function Login() {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema : Yup.object({
            email: Yup.string().email('Enter valid email').required('Email is required'),
            password: Yup.string().required('Please Enter your password')
        }),
        onSubmit: async (values) => {
            try {
                let loginData = await axios.post("https://url-short-api-back.herokuapp.com/users/login",values)
                window.localStorage.setItem("auth_token",loginData.data.token)
                navigate("/urlshort")
            } catch (error) {
                console.log(error)
            }
        },
    });
    return (
        <>
            <div className="center">
                <h1>Login</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="txt_field">
                        <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
                        <label for="">Email</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" name='password' onChange={formik.handleChange} value={formik.values.password} />
                        <label for="">Password</label>
                    </div>
                    <input type="submit" name="" value="Login" />
                    <div className="signup_link">
                        Not a member? <Link to="/register">Signup</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login