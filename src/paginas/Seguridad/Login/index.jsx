import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form.js";
import { useCallback, useEffect } from "react";
import { MdInfo } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from '../../../assets/public/logo.png';
import useAuth from "../../../hooks/useAuth.jsx";
import { useNotification } from "../../../hooks/useNotification.jsx";
import { clearResults, setLoginUser } from "../redux.js";

const Login = () => {
  const { autenticarUsuario } = useAuth();
  const dispatch = useDispatch()
  const [form] = useForm()

  const { loadingLogin, resultLogin, errorLogin } = useSelector(state => state.auth)

  const handleSubmit = useCallback((values) => {
    dispatch(setLoginUser(values))
  })

  useEffect(() => {
    return () => {
      dispatch(clearResults())
    }
  }, [])

  useEffect(() => {
    if (resultLogin) {
      autenticarUsuario()
    }
  }, [resultLogin])
  
  

  useNotification(null, errorLogin, true, false)

  return (
    <>
    <div className="w-full h-full flex flex-col justify-center">
      <div className="w-full flex justify-center items-center mb-5">
        <img
          className="w-32"
          src={Logo}
        />
      </div>

<div className="my-2 pt-5 pb-7 px-10 bg-white rounded-2xl">
      <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <div className="mb-4">
              <Form.Item
                rules={[{ required: true, message: "Este campo es obligatorio." }]}
                label="Usuario"
                name={"userName"}
                className="m-0"
              >
                <Input
                  placeholder="Usuario de registro"
                />
              </Form.Item>
            </div>
            <div className="mb-4">
              <Form.Item
                rules={[{ required: true, message: "Este campo es obligatorio." }]}
                label="Contraseña"
                name={"password"}
              >
                <Input.Password
                  placeholder="Contraseña de usuario"
                />
              </Form.Item>
            </div>
            <div className="w-full flex justify-end items-center gap-4">
              <Button
                htmlType="reset"
                loading={loadingLogin}
              >
                Cancelar
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                loading={loadingLogin}
              >
                Iniciar sesión
              </Button>
            </div>
          </Form>
</div>

      <nav className="lg:flex lg:justify-center m-2">
        <Link
          className="block text-center my-5 text-gray-400 font-light text-sm"
          to="/registrar"
        >
          ¿No tienes una cuenta? <span className="font-bold font-primary"> Regístrate</span>
        </Link>

        {/* <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/olvide-password"
        >
          Olvide Mi Clave
        </Link> */}
      </nav>
    </div>
    </>
  );
};

export default Login;
