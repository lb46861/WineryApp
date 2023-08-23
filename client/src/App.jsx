
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ApiProvider } from './context/ApiContext';
import Navbar from './component/Navbar';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Producer from "./pages/Producer";
import WineCreation from "./pages/WineCreation";
import ProducerCreation from "./pages/ProducerCreation";
import { UserProvider } from './context/UserContext'
import { withAuthentication } from './component/Authentication'; 


import {
  HOME_PATH,
  LOGIN_PATH, 
  REGISTRATION_PATH, 
  WINE_CREATION_PATH,
  PRODUCER_CREATION_PATH,
  PRODUCER_PATH,
  WINE_PATH,
  ADMINISTRATOR
} from "./utils/constants";
import WineDetails from "./pages/WineDetails";


const theme = createTheme({
  fontSize: "1.6rem",
  minHeight: "3rem",
  padding: 0,
  margin: 0
});

const AuthenticatedWineCreation = withAuthentication(WineCreation, [ADMINISTRATOR]);
const AuthenticatedProducerCreation = withAuthentication(ProducerCreation, [ADMINISTRATOR]);



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
            <Route path={`${WINE_PATH}/:id`} element={<WineDetails />} />
            <Route path={PRODUCER_PATH} element={<Producer />} />
            <Route path={WINE_CREATION_PATH} element={<AuthenticatedWineCreation />} />
            <Route path={PRODUCER_CREATION_PATH} element={<AuthenticatedProducerCreation />} />
            <Route path="*" element={<Home/>} />
          </Routes>
        </ApiProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
