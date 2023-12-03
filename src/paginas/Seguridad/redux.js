import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    loading: false,
    result: null,

    errorLogin: null,
    loadingLogin: false,
    resultLogin: null,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setRegisterUser: (state, action) => {
            state.loading = true;
            const dataUsers = localStorage.getItem("users") ? [...JSON.parse(localStorage.getItem("users"))] : [];
            if (dataUsers?.find(v => v?.userName == action.payload?.userName)) {
                state.error = "El usuario ya se encuentra registrado";
            }else{
                const nextId = dataUsers?.length > 0 ? dataUsers?.at(-1)?.id + 1 : 1
                const usersUpdated = [...dataUsers, {...action.payload, id: nextId}]
                localStorage.setItem("users", JSON.stringify(usersUpdated))
                state.result = "Usuario registrado correctamente."
            }
            state.loading = false;
        },
        setLoginUser: (state, action) => {
            state.loadingLogin = true;
            const dataUsers = localStorage.getItem("users") ? [...JSON.parse(localStorage.getItem("users"))] : [];
            const userFound = dataUsers?.find(v => (v?.userName == action.payload?.userName))
            if (userFound && userFound?.password == action.payload?.password) {
                state.resultLogin = userFound?.id
                localStorage.setItem("token", userFound?.id)
            }
            else if(userFound?.password != action.payload?.password){
                state.errorLogin = "Contraseña incorrecta"
            }
            else if(!userFound){
                state.errorLogin = "El usuario no existe"
            }
            state.loadingLogin = false;
        },
        clearResults: (state, action) => {
            state.error = null;
            state.result = null;
            state.errorConfirm = null;
            state.resultConfirm = null;
            state.errorLogin = null;
            state.resultLogin = null;
        },
    },
    extraReducers: (builder) => {
        
    }
})

export const authSlice = slice.reducer

export const { clearResults, setLoginUser, setRegisterUser } = slice.actions

