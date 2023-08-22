import { useState, useContext } from "react"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ApiContext } from "../context/ApiContext";
import { useNavigate } from "react-router-dom";

import { HOME_PATH, PRODUCER_PATH, countries } from "../utils/constants";
import { MenuItem, Select } from "@mui/material";

const ProducerCreation = () => {

    const [formData, setFormData] = useState({
        country: countries[0]
    });
    const navigate = useNavigate()
    const apiContext = useContext(ApiContext);
    

    const handleSubmit = async (e) => {

        e.preventDefault();
        const requestData = {
            name: formData.name,
            founded: formData.founded,
            country: formData.country,
            description: formData.description,
            url: formData.url,
        }
    
        apiContext.apiCall('post', PRODUCER_PATH, requestData).then(response => {
            if (response) navigate(HOME_PATH, { state: { message: response.data.message } })
        })
        
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
    };

    

    return (
        <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                <Typography component="h1" variant="h5">
                    Add new Producer
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        onChange={handleChange}
                        autoFocus
                    />


                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="founded"
                        label="Founded"
                        name="founded"
                        onChange={handleChange}
                        type="number"
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        onChange={handleChange}
                        multiline
                    />

                    <Select
                        fullWidth
                        label="Country"
                        onChange={handleChange}
                        sx={{ textAlign: 'left' }}
                        required
                        value={formData?.country || countries[0]}
                        name="country"
                        >
                        {countries.map((item) => (
                            <MenuItem key={item} value={item}>
                            {item}
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="url"
                        label="URL"
                        name="url"
                        onChange={handleChange}
                        multiline
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
export default ProducerCreation 