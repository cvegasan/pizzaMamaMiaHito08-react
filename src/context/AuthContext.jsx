import React, { createContext,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [token, setToken] = useState('');   // Inicializacion para token
  //20241001 INI Hito 8 JWK
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileUser,setProfileUser]=useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmitLogin = async () => {
    const fields = {
                    email
                    ,password
                   };

    const urlApi = 'http://localhost:5000/api/auth/login';
    try {
        const response = await fetch(urlApi,  {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify(fields),
                                              });

        if (response.status!=200) {
          alert(`Error API login: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.token) {
            setToken(data.token);
            setEmail(data.email);
            navigate('/pizzaMamaMiaHito08-react/profile');
            console.log(data,'<--Data API Login');
        } else {
            setError('Email/Contraseña incorrectos');
        }
    } catch (err) {
        setError(err.message);
    }
  };

  const handleSubmitRegister = async () => {
    // Datos a enviar
    const fields = {
                    email
                    ,password
                  };

    console.log(fields,"<--Datos enviados",);
    const urlRegister = 'http://localhost:5000/api/auth/register'
    try {
        // EndPoint para registrar el usuario
        const response = await fetch(urlRegister, {
                                                      method: 'POST',
                                                      headers: { 'Content-Type': 'application/json' },
                                                      body: JSON.stringify(fields),
                                                  });

        // Si falla, muestra error
        if (response.status!=200) {
          alert(`Error API Registro: ${response.status} ${response.statusText}`);
        }

        // Procesar la respuesta de la API
        const data = await response.json();
        console.log(data,'<--Data API Register');

        // Limpia los campos de email y password tras el registro exitoso
        setEmail('');
        setPassword('');
        navigate('/pizzaMamaMiaHito08-react/login');
    } catch (error) {
        console.error('Error en el registro:', error.message);
        setError(error.message);  // Mostrar mensaje de error en la UI
    }
  };

  useEffect(() => {
    const getData = async () => {
        if (!token) return;
        try {
            const response = await fetch('http://localhost:5000/api/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status!=200) {
                throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setProfileUser(data);
        } catch (err) {
            console.error(err.message);
        }
    };

    getData();
}, [token]);



// GET
// http://localhost:5000/api/auth/me

// Authorization Bearer token_jwt

// {
//   "email": "cristian.vega@test.com",
//   "id": "GESE2BNetH9uAO7s4uyPi"
// }

// token_jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aWFuLnZlZ2FAdGVzdC5jb20iLCJpZCI6IkdFU0UyQk5ldEg5dUFPN3M0dXlQaSIsImlhdCI6MTcyNzg3MjIwMX0.Ohb8RdbJmEMfbASVDNjVbvdsjbpG71ZcfXko-XS3MGA
  //20241001 FIN Hito 8 JWK



  // Método logout para cambiar el estado de token a false
  const logout = () => {
        setToken('');
        setEmail('');
        setPassword('');
        navigate('/pizzaMamaMiaHito08-react');
  };

  return (
    <AuthContext.Provider value={{
                                  token
                                  ,setToken
                                  ,error
                                  ,email
                                  ,setEmail
                                  ,password
                                  ,setPassword
                                  ,profileUser
                                  ,handleSubmitLogin
                                  ,handleSubmitRegister
                                  ,logout
                                  }
                                }>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
