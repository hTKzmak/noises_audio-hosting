import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
        getData(state) {
            console.log(state.data)
        },
        // добавление данных
        addingData(state, action) {
            state.data = action.payload

            console.log('данные:')
            console.log(state.data)
        },
        // Удаление музыки пользователя по id, чтобы не отображался на разметке
        deleteMusic(state, action: PayloadAction<{ userId: number, musicId: number }>) {
            const { userId, musicId } = action.payload;

            state.data = state.data.map(user => {
                if (user.id === userId) {
                    return {
                        ...user,
                        music_tracks: user.music_tracks.filter((track: any) => track.id !== musicId)
                    };
                }
                return user;
            });

            console.log("Музыка удалена:", state.data);
        }
    },
})

// Action creators are generated for each case reducer function
export const { getData, addingData, deleteMusic } = productsSlice.actions

export default productsSlice.reducer