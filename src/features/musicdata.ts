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
        },
        // загрузка своей музыки
        uploadMusic(state, action) {
            const userIndex = state.data.findIndex((user: any) => user.id === action.payload.user_id);
        
            if (userIndex !== -1) {
                state.data[userIndex].music_tracks.push(action.payload);
            }
        
            console.log('Данные после добавления музыки:', state.data);
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
export const { getData, addingData, uploadMusic, deleteMusic } = productsSlice.actions

export default productsSlice.reducer