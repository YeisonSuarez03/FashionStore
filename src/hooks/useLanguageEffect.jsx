import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useLanguageEffect = (callback, dependencies = []) => {

    const { IdIdioma } = useSelector(state => state.common)

    useEffect(() => {
        callback && callback(IdIdioma)
    }, [IdIdioma, ...dependencies])
}
