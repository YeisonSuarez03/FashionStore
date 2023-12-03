//se utiliza para proteger las rutas
import { Button, ConfigProvider, Result } from 'antd'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
//es el layout que esta por encima de las paginas, todas las paginas heredan este estilo
import AuthLayout from './layouts/AuthLayout'
//Contexto de seguridad de la aplicacion
import { AuthProvider } from './context/AuthProvider.jsx'
//Se crea otro contexto de la aplicacion
//pagina principal ojo es principal por <Route index 


//configuracion global idioma antd
import locale from 'antd/es/locale/es_ES'
import dayjs from 'dayjs'
import { name } from 'dayjs/locale/es-mx'
import PublicRoutes from './layouts/PublicRoutes'
import Home from './paginas/Home'
import LoginPublic from './paginas/Seguridad/Login'
import RegistrarPublic from './paginas/Seguridad/Registrar'

dayjs.locale(name)

export const labelsByItem = {
  1: "es",
  2: "en"
}

export const items = [
  {
    key: 1,
    label: "Español"
  },
  {
    key: 2,
    label: "English"
  },
]

const ForbiddenRoute = ({ safeRoute = null }) => {
  const navigate = useNavigate()
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Lo sentimos, no está autorizado para acceder a esta página."
        extra={<Button type='primary' className='disable-custom' onClick={() => navigate(safeRoute || -2)}>Volver</Button>}
      />
    </div>
  )
}

const NotFoundRoute = ({ safeRoute = null }) => {
  const navigate = useNavigate()
  return (
    <div>
      <Result
        status={"404"}
        title="404"
        subTitle="Perdona, esta página no existe."
        extra={<Button type='primary' className='disable-custom' onClick={() => navigate(safeRoute || -2)}>Volver</Button>}
      />
    </div>
  )
}

function App() {

  return (
    <ConfigProvider locale={locale}>
      <BrowserRouter>
        <AuthProvider>
          <ConfigProvider
            theme={{  token: {
              colorPrimaryHover: "var(--primary-darken)",
              colorPrimaryBorderHover: "var(--danger)",
              controlOutlineWidth: 0,
              // colorBorder: "var(--primary)",
            },
            components: {
              Button: {
                boxShadow: "0 6px 22px 4px var(--primary-shadow-color)",
                defaultColor: "var(--primary)",
                defaultShadow: "0 6px 22px 4px var(--primary-shadow-color)",
                borderRadius: 20,
                linkHoverBg: "var(--primary)"
              },
              Table: {
                headerBg: "#fff",
                headerColor: "var(--secondary)",
              },
              Input: {
                activeBorderColor: "var(--secondary)"
              },
              Tabs: {
                inkBarColor: "var(--primary)",
                itemActiveColor: "var(--primary)",
                itemSelectedColor: "var(--primary)",
                itemHoverColor: "var(--secondary)",
              }
            }}}
          >
            <Routes>
              <Route path='/' element={<AuthLayout />} >
                <Route index element={<LoginPublic />} />
                <Route path='registrar' element={<RegistrarPublic />} />
                <Route
                  path="404"
                  element={
                    <NotFoundRoute safeRoute={"/"} />
                  }
                />
                <Route
                  path="403"
                  element={
                    <ForbiddenRoute safeRoute={"/"} />
                  }
                />
                <Route
                  path="*"
                  element={
                    <Navigate to={"/"} />
                  }
                />
              </Route>

              <Route path='/app' element={<PublicRoutes />} >
                <Route index element={<Home />} />
                <Route
                  path="404"
                  element={
                    <NotFoundRoute safeRoute={"/"} />
                  }
                />
                <Route
                  path="403"
                  element={
                    <ForbiddenRoute safeRoute={"/"} />
                  }
                />
                <Route
                  path="*"
                  element={
                    <Navigate to={"/404"} />
                  }
                />
              </Route>
            </Routes>
          </ConfigProvider>
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App