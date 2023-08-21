import { useState, useContext, useEffect } from "react"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ApiContext } from "../context/apiConext";
import { useNavigate } from "react-router-dom";

import { HOME_PATH, WINE_PATH, PRODUCER_PATH } from "../utils/constants";
import { CircularProgress, MenuItem, Select } from "@mui/material";

const WineCreation = () => {


    const literList = [0.75, 1]

    const [formData, setFormData] = useState({
        producer: '',
        liters: literList[0]
    });
    const navigate = useNavigate()
    const apiContext = useContext(ApiContext);
    const [producers, setProducers] = useState([]);

    useEffect(() => {
        apiContext.apiCall('get', PRODUCER_PATH).then(response => {
          if(response?.data?.data) setProducers(response.data.data);
        });
    }, [apiContext]);


    const handleSubmit = async (e) => {

        e.preventDefault();
        const requestData = {
            name: formData.name,
            price: formData.price,
            alcoholPercentage: formData.alcoholPercentage,
            type: formData.type,
            color: formData.color,
            liters: formData.liters,
            image: formData.image,
            producer: formData.producer
        }
    
        apiContext.apiCall('post', WINE_PATH, requestData, 'multipart/form-data').then(response => {
            if (response) navigate(HOME_PATH, { state: { message: response.data.message } })
        })
        
    }

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
    
        if (type === 'file') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: files[0] 
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    

    return (
        <Container component="main" maxWidth="xs">
            {producers.length ? (
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                <Typography component="h1" variant="h5">
                    Add new Wine
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
                        id="price"
                        label="Price €"
                        name="price"
                        onChange={handleChange}
                        type="number"
                        inputProps={{
                            step: 0.01,
                        }}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="alcoholPercentage"
                        label="Alcohol Percentage %"
                        name="alcoholPercentage"
                        onChange={handleChange}
                        type="number"
                        inputProps={{
                            step: 0.1,
                        }}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="color"
                        label="Color"
                        name="color"
                        onChange={handleChange}
                        type="text"
                    />

                    <Select
                        fullWidth
                        label="Liters"
                        onChange={handleChange}
                        sx={{ textAlign: 'left' }}
                        required
                        value={formData.liters || literList[0]}
                        name="liters"
                        >
                        {literList.map((item) => (
                            <MenuItem key={item} value={item}>
                            {item}
                            </MenuItem>
                        ))}
                    </Select>


                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="type"
                        label="Type"
                        name="type"
                        onChange={handleChange}
                        type="text"
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="image"
                        name="image"
                        onChange={handleChange}
                        type="file"
                    />


                    <Select
                        fullWidth
                        labelId="select-workspace-type"
                        label="Select Workspace Type"
                        onChange={handleChange}
                        sx={{ textAlign: 'left' }}
                        required
                        value={formData.producer || ''}
                        name="producer"
                        >
                        {producers.map((producer) => (
                            <MenuItem key={producer._id} value={producer._id}>
                            {producer.name}
                            </MenuItem>
                        ))}
                    </Select>


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
                )
            : <CircularProgress />
            }
        </Container>
    );
}
export default WineCreation 