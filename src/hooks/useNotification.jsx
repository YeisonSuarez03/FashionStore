import { notification } from "antd"
import { useEffect } from "react"

export const useNotification = (result, error, showError = true, showResult = true, isErrorNotFound = false) => {

    const notificationSuccess = (msg) => {
        if (showResult) {
            notification.success({
                message: "Operación exitosa",
                description: msg || "La operación ha sido ejecutada con éxito.",
                duration: 4,
                className: "success__notification"
            })
        }
    }

    const notificationError = (msg) => {
        if (showError) {
            isErrorNotFound
                ? notification.warning({
                    message: "No encontrado",
                    description: <p dangerouslySetInnerHTML={{ __html: msg || "No se han encontrado resultados" }}></p>,
                    duration: 4,
                    className: "warning__notification",
                })
                : notification.error({
                    message: "Operación fallida",
                    description: <p dangerouslySetInnerHTML={{ __html: msg || "Ha ocurrido un error. Por favor, inténtelo más tarde." }}></p>,
                    duration: 4,
                    className: "error__notification",
                })
        }
    }

    const notificationWarning = (title, msg) => {
        notification.warning({
            message: title,
            description: <p dangerouslySetInnerHTML={{ __html: msg || "" }}></p>,
            duration: 4,
            className: "warning__notification",
        })
    }

    const notificationInfo = (title, msg) => {
        notification.info({
            message: title,
            description: msg,
            duration: 5,
            className: "info__notification"
        })
    }



    useEffect(() => {
        if (error) {
            notificationError(error)
        } else if (result && !error) {
            notificationSuccess(result)
        }

    }, [result, error])


    return {
        notificationSuccess,
        notificationError,
        notificationWarning,
        notificationInfo
    }

}