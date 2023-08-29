import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';

// pages
import Navbar from './component/Navbar';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Producer from "./pages/Producer";
import WineCreation from "./pages/WineCreation";
import WineDetails from "./pages/WineDetails";
import ProducerCreation from "./pages/ProducerCreation";
import Cart from "./pages/Cart";

// route restrictions
import { withAuthentication } from './component/Authentication';

// context
import { ApiProvider } from './context/ApiContext';
import { UserProvider } from './context/UserContext'
import { CartProvider } from './context/CartContext';

import {
  HOME_PATH,
  LOGIN_PATH, 
  REGISTRATION_PATH, 
  WINE_CREATION_PATH,
  PRODUCER_CREATION_PATH,
  PRODUCER_PATH,
  WINE_PATH,
  ADMINISTRATOR,
  CART_PATH,
  CUSTOMER
} from "./utils/constants";

const theme = createTheme({
  fontSize: "1.6rem",
  minHeight: "3rem",
  padding: 0,
  margin: 0
});

const AuthenticatedWineCreation = withAuthentication(WineCreation, [ADMINISTRATOR]);
const AuthenticatedProducerCreation = withAuthentication(ProducerCreation, [ADMINISTRATOR]);
const AuthenticatedCartRoute = withAuthentication(Cart, [ADMINISTRATOR, CUSTOMER]);


function App() {

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
      <BrowserRouter>
        <CssBaseline />
        <ApiProvider>
        <CartProvider>
        <Navbar/>        
        <Routes>
            <Route path={LOGIN_PATH} element={<Login />}></Route>
            <Route path={REGISTRATION_PATH} element={<Register />}></Route>
            <Route path={HOME_PATH} element={<Home />} />
            <Route path={`${WINE_PATH}/:id`} element={<WineDetails />} />
            <Route path={PRODUCER_PATH} element={<Producer />} />
            <Route path={CART_PATH} element={<AuthenticatedCartRoute />} />
            <Route path={WINE_CREATION_PATH} element={<AuthenticatedWineCreation />} />
            <Route path={PRODUCER_CREATION_PATH} element={<AuthenticatedProducerCreation />} />
            <Route path="*" element={<Home/>} />
          </Routes>
        </CartProvider>
        </ApiProvider>
      </BrowserRouter>
      <ToastContainer />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
