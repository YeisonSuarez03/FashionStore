import { useState, useEffect, createContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom'

const AuthContext = createContext();

//contexto de toda la aplicacion
const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate();
    const location = useLocation();

    const autenticarUsuario = async () => {
        const token = localStorage.getItem('token')

        if (!token) {
            setCargando(false)
            location.pathname?.includes("/app") && navigate('/')
            return
        }

        try {
            const users = JSON.parse(localStorage.getItem("users"))
            const user = users?.find(v => v?.id == token) 
            // const { data: { user, empresas } } = sampleAuthData
            // console.log(data)
            setAuth({ ...user });

            if (location.pathname?.includes("/")) navigate('/app/')

        } catch (error) {
            setAuth({})
            location.pathname?.includes("/app") && navigate('/')
        }

        setCargando(false)
    }
    useEffect(() => {
        autenticarUsuario()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                autenticarUsuario
            }
            }
        >
            {children}
        </AuthContext.Provider>

    )
}

export {
    AuthProvider
}

export default AuthContext;