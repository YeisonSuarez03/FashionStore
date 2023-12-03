import React, { useEffect } from 'react'
import { useState } from 'react';

export const useDebounce = (onDebounce, delayTime = 800) => {

    const [fieldValue, setFieldValue] = useState("");
    const [options, setOptions] = useState(null);
    const [valueDelayed, setValueDelayed] = useState("");

    const clear = () => {
        setFieldValue("")
        setOptions(null)
        setValueDelayed("")
    }

    const handleChange = (value, newOptions = null) => {
        setFieldValue(value);
        if (newOptions && options !== newOptions) setOptions(newOptions)
    }


    useEffect(() => {
        let timeout;
        timeout = setTimeout(() => {
            setValueDelayed(fieldValue);
        }, delayTime);
        return () => {
            clearTimeout(timeout)
        }
    }, [fieldValue])

    useEffect(() => {
        if ((fieldValue !== "" && valueDelayed !== "") && fieldValue === valueDelayed) {
            onDebounce(valueDelayed, options);
            clear()
        }
    }, [valueDelayed])


    return {
        handleChange, options, clear
    }

}
