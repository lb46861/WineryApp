
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ApiProvider } from './context/apiContext';
import Navbar from './component/Navbar';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import WineCreation from "./pages/WineCreation";
import ProducerCreation from "./pages/ProducerCreation";
import { UserProvider } from './context/userContext'

import {
  HOME_PATH,
  LOGIN_PATH, 
  REGISTRATION_PATH, 
  WINE_CREATION_PATH,
  PRODUCER_CREATION_PATH
} from "./utils/constants";


const theme = createTheme({
  fontSize: "1.6rem",
  minHeight: "3rem",
  padding: 0,
  margin: 0
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <UserProvider>
        <Navbar/>        
        <ApiProvider>
        <Routes>
            <Route path={LOGIN_PATH} element={<Login />}></Route>
            <Route path={REGISTRATION_PATH} element={<Register />}></Route>
            <Route path={HOME_PATH} element={<Home />} />
            <Route path={WINE_CREATION_PATH} element={<WineCreation />} />
            <Route path={PRODUCER_CREATION_PATH} element={<ProducerCreation />} />
          </Routes>
        </ApiProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
