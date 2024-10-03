import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';


// Componentes LOGIN y REGISTRO
import Home from './pages/Home';
import Login from './pages/FormLogin';
import Register from './pages/FormRegistro';
import Pizza from './pages/Pizza';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

//React Router DOM
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import { useContext } from "react";

//useContext
//Es un Provider, lo cual significa que es el componente que envuelve a otros componentes
import CartProvider from "./context/CartContext";

// Aquí estás importando solo el contexto (AuthContext), lo que significa que usarás este contexto
// para acceder a los datos relacionados con la autenticación en tu aplicación (dato especifico).
import {AuthContext} from "./context/AuthContext";

function App() {
  const { token } = useContext(AuthContext)
  return (
    //App.jsx se mostrarán los componentes Navbar, Home y Footer
    <CartProvider>
      {/* <BrowserRouter> */}
            <NavBar></NavBar>
              <Routes>
                <Route path="/pizzaMamaMiaHito08-react" element={<Home/>} />
                {/* si token es TRUE Login y Register-->enviar al HOME*/}
                <Route path="/pizzaMamaMiaHito08-react/register" element={token?<Home/>:<Register/>} />
                <Route path="/pizzaMamaMiaHito08-react/login" element={token?<Profile/>:<Login/>} />
                {/* si token es FALSE profile --> enviar a Login*/}
                <Route path="/pizzaMamaMiaHito08-react/profile" element={token? <Profile/>:<Login/>} />
                <Route path="/pizzaMamaMiaHito08-react/cart" element={<Cart/>} />

                <Route path='/pizzaMamaMiaHito08-react/404' element={<NotFound/>} />
                <Route path='*' element={<Navigate replace to='/pizzaMamaMiaHito08-react/404'/>} />

                <Route path="/pizzaMamaMiaHito08-react/pizza/:id" element={<Pizza/>} />
              </Routes>
            <Footer></Footer>
      {/* </BrowserRouter> */}
    </CartProvider>
  )
}
export default App;
