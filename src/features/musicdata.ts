import { createSlice } from '@reduxjs/toolkit';

export interface ProductsState {
    data: any[],
}

const initialState: ProductsState = {
    // обычные данные с API (но сейчас с заготовленных данных musicData)
    data: [],
}

export const productsSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        // отображение данных в консоле
        getData() {
            console.log(initialState.data)
        },
        // добавление данных
        addingData(state, action) {
            state.data = action.payload

            // console.log(state.data)
        },
    },
})

// Action creators are generated for each case reducer function
export const { getData, addingData } = productsSlice.actions

export default productsSlice.reducer