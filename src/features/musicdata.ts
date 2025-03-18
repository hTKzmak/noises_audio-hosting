import { createSlice } from '@reduxjs/toolkit';

export interface ProductsState {
    data: any[],
}

const initialState: ProductsState = {
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
        // добавление своей загруженной музыки в библиотеку
        addMusicToLibrary(state, action) {
            const musicData = action.payload;
            const userIndex = state.data.findIndex(user => user.id === musicData.user_id);

            console.log(musicData)
            console.log(state.data)
            console.log(userIndex)

            if (userIndex !== -1) {
                // Если пользователь уже существует, добавляем музыку в его библиотеку
                state.data[userIndex].musicLibrary.push(musicData);
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { getData, addingData, addMusicToLibrary } = productsSlice.actions

export default productsSlice.reducer