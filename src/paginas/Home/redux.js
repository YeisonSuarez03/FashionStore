import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { data } from './data';

const initialState = {
    error: null,
    loading: false,
    data: [],

    prices: null,
    colors: null,
    sizes: null,
    sleeves: null,
    name: null,

    dataById: null,

    dataCart: [],
    resultCart: null,
    errorCart: null,

}

//filter functions
const filterByPrices = (prices = [], item) => {
    if(!prices || prices?.length <= 0) return true;
    return (item?.price >= prices[0]) && (item?.price <= prices[1])
}

const filterByColors = (colors = [], item) => {
    if(!colors || colors?.length <= 0) return true;
    return colors?.some(v => item?.color?.includes(v))
}

const filterBySizes = (sizes = [], item) => {
    if(!sizes || sizes?.length <= 0) return true;
    return sizes?.some(v => item?.sizes?.includes(v))
}

const filterBySleeves = (sleeves = [], item) => {
    if(!sleeves || sleeves?.length <= 0) return true;
    return sleeves?.some(v => item?.sleeves?.includes(v))
}

const filterByName = (search = "", item) => {
    if(!search || search?.length <= 0) return true;
    return search?.split(" ")?.some(v => item?.name?.includes(v?.trim()))
}


export const search = createAsyncThunk(
    "products/search",
    async (params, thunkApi) => {
        try {
            const { products: { prices, colors, sizes, sleeves, name } } = thunkApi.getState();
            const dataFiltered = data?.filter(item =>
                filterByPrices(prices, item) &&
                filterByColors(colors, item) &&
                filterBySizes(sizes, item) &&
                filterBySleeves(sleeves, item) &&
                filterByName(name, item)
            );
            return dataFiltered
        } catch (error) {
            return []
        }
    })

const slice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        //grid filters
        setFilter: (state, action) => {
            state[action.payload?.filter] = action.payload?.value
        },
        //data id setters
        setDataById: (state, action) => {
            state.dataById = action.payload
        },
        clearDataById: (state, action) => {
            state.dataById = null
        },
        
        //handle cart
        setAddToCart: (state, action) => {
            if (!action.payload?.quantityMax || action.payload?.quantityMax <= 0) {
                state.errorCart = "El producto se encuentra agotado"
                return;
            }
            if (state.dataCart?.find(v => v?.id == action.payload?.id)) {
                state.errorCart = "El producto ya se encuentra en el carrito"
                return;
            }

            state.dataCart = [...state.dataCart, action.payload]
            state.resultCart = "El producto ha sido añadido al carrito exitosamente"
        },
        setDeleteFromCart: (state, action) => {
            state.dataCart = state.dataCart?.filter(v => v?.id != action.payload)
        },
        setUpdateFromCart: (state, action) => {
            const indexOf = state.dataCart?.map(v => v?.id)?.indexOf(action.payload?.id);
            const previousData = state.dataCart[indexOf]
            const updatedArray = state.dataCart;
            updatedArray.splice(indexOf, 1, {...previousData, quantity: action.payload?.quantity})
            state.dataCart = updatedArray
        },
        clearResultsCart: (state, action) => {
            state.errorCart = null
            state.resultCart = null
        },


        //clear global
        clearResults: (state, action) => {
            state.error = null;
            state.dataById = null;
            state.dataCart = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(search.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(search.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.data = action.payload
        })
        builder.addCase(search.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.payload
        })
    }
})

export const productsSlice = slice.reducer

export const { clearResults, setFilter, clearDataById, setDataById, setAddToCart, setDeleteFromCart, setUpdateFromCart, clearResultsCart } = slice.actions

