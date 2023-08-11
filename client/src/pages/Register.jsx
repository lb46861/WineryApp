import { useState, useContext } from "react"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ApiContext } from "../context/apiConext";
import { useNavigate } from "react-router-dom";

import { REGISTRATION_PATH, LOGIN_PATH } from "../utils/constants";
import { Alert, Snackbar } from "@mui/material";

const Register = () => {

    const [formData, setFormData] = useState();
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState()
    const apiContext = useContext(ApiContext);


    const validatePasswords = (pass, repeatPass) => {
        if(pass !== repeatPass) {
            setErrorMessage('Passwords must match')
            setTimeout(() => setErrorMessage(null), 7000)
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if(validatePasswords(formData.password, formData.repeatPassword)){
            const requestData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            }
    
            apiContext.apiCall('post', REGISTRATION_PATH, requestData).then(response => {
                if (response) navigate(LOGIN_PATH, { state: { message: response.data.message } })
            })
        }
    }

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setFormData((prevState) => ({
            ...prevState,
            [name]: value

        }))
    }

    return (
        <Container component="main" maxWidth="xs">

            <Snackbar open={!!errorMessage}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        onChange={handleChange}
                        autoFocus
                    />


                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        type="email"
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        type="password"
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="repeatPassword"
                        label="Repeat password"
                        name="repeatPassword"
                        onChange={handleChange}
                        type="password"
                    />


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        SUBMIT
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
export default Register 