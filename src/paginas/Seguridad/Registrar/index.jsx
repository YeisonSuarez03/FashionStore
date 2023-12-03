import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";

import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect } from "react";
import { MdInfo } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { useNotification } from "../../../hooks/useNotification";
import { clearResults, setRegisterUser } from "../redux";

const Registrar = () => {

  const dispatch = useDispatch()
  const [form] = useForm()

  const {error, loading, result} = useSelector(state => state.auth)

  const handleSubmit = useCallback((values) => {
    dispatch(clearResults())
    if(values?.password !== values?.password2) 
      return message.error("Las contraseñas deben ser iguales");
    dispatch(setRegisterUser(values))
  })

  useEffect(() => {
    if (result) {
      form?.resetFields()
    }
  }, [result])
  

  useEffect(() => {
    return () => {
      dispatch(clearResults())
    }
  }, [])
  

  useNotification(result, error)

  return (
    <>
      <div className={`w-full flex justify-center`}>
        <div className="bg-white-custom sm:py-10 sm:px-5 py-4 px-3 card__container card__container-lg rounded-lg shadow">
          <h1 className="font-primary font-bold text-xl mb-2">
            Crea tu cuenta
          </h1>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <div className="m-0">
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
              <div className="w-full flex justify-start items-center gap-2 mt-1 mb-7">
                <MdInfo className="text-amber-500" />
                <span className="text-sm text-gray-500">Este será el usuario que usarás para autenticarte.</span>
              </div>
            </div>
            <div className="mb-4">
              <Form.Item
                rules={[{ required: true, message: "Este campo es obligatorio." }]}
                label="Contraseña"
                name={"password"}
              >
                <Input
                  placeholder="Contraseña de registro"
                />
              </Form.Item>
            </div>
            <div className="mb-4">
              <Form.Item
                rules={[{ required: true, message: "Este campo es obligatorio." }]}
                label="Repetir Contraseña"
                name={"password2"}
              >
                <Input
                  placeholder="Repite tu Contraseña"
                />
              </Form.Item>
            </div>
            <div className="w-full flex justify-end items-center gap-4">
              <Button
                htmlType="reset"
                loading={loading}
              >
                Cancelar
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                loading={loading}
              >
                Crear Cuenta
              </Button>
            </div>
          </Form>
        </div>
      </div>
          <nav className="lg:flex lg:justify-center mt-5">
            <Link
              className="block text-center mb-4 text-gray-400 font-light uppercase text-sm"
              to="/"
            >
              ¿Ya tienes una cuenta? <span className="font-bold font-primary">Inicia Sesión</span>
            </Link>
          </nav>
    </>
  );
};

export default Registrar;