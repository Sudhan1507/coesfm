import { useState } from "react";
import Button from "../../components/atoms/Button/Button";
import Form from "../../components/molecules/Form/Form";
// import CryptoJS from 'crypto-js'; 
import "../Login/Login.css";
import { useNavigate } from "react-router-dom";
import axios  from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState({});
    const fieldLabels = {
        username: "User Name",
        password: 'Password'
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const validate = () => {
        const error = {};
        Object.keys(formFields).forEach((field) => {
            if (!formFields[field]) {
                error[field] = `${fieldLabels[field]} is required!`;
            }
        });
        setError(error);
        return Object.keys(error).length === 0;
    };

    // const encryptPassword = (password, secretKey) => {
    //     return CryptoJS.AES.encrypt(password, secretKey).toString();
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            // const secretKey = 'your-secret-key'; // Ensure this matches the server-side key
            // const encryptedPassword = encryptPassword(formFields.password, secretKey);
            const formData = {
                "username": formFields.username,
                "password": formFields.password
            };

            try {
                const response = await axios.post('http://localhost:8080/account/login', formData);
                if (response.data.status === 'success' && response.data.data) {
                    sessionStorage.setItem('userdata',JSON.stringify( response.data.data));
                    handleClear();
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error('Error User login:', error);
            }
        }
    };

    const handleClear = () => {
        setFormFields({ username: '', password: '' });
        setError({});
    };

    return (
        <>
            <div className="login-wrapper">
                <div className="login-form-wrapper">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <legend>Login</legend>
                        <div className="login-form-group">
                            <Form
                                type="text"
                                label='Username'
                                name="username"
                                value={formFields.username}
                                onChange={handleChange}
                                error={error.username}
                            />
                        </div>
                        <div className="login-form-group">
                            <Form 
                                type="password"
                                label='Password'
                                name="password"
                                value={formFields.password}
                                onChange={handleChange}
                                error={error.password}
                            />
                        </div>
                        <div className="control-button">
                            <Button
                                type="submit"
                                label='Login'
                                variant="success"
                                size="small"
                            />
                            <Button
                                type="button"
                                label='Clear'
                                size="small"
                                variant='cancel'
                                onClick={handleClear}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
