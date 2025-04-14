import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductsState {
    data: any[],
    latest_music: any[]
    latest_artists: any[],
    popular_music: any[],
    popular_artists: any[]
}

const initialState: ProductsState = {
    data: [],
    latest_music: [],
    latest_artists: [],
    popular_music: [],
    popular_artists: []
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
        addingData(state, action: PayloadAction<any[]>) {
            state.data = action.payload;
            
            // Обновляем популярную и последнюю музыку/артистов
            const allMusic = action.payload.flatMap(user => user.music_tracks);
            
            // Последняя музыка (сортировка по ID в обратном порядке)
            state.latest_music = [...allMusic]
                .sort((a, b) => b.id - a.id)
                .slice(0, 24);
            
            // Популярная музыка (сортировка по количеству лайков)
            state.popular_music = [...allMusic]
                .sort((a, b) => (b.favorite_count || 0) - (a.favorite_count || 0))
                .slice(0, 24);
            
            // Последние артисты (сортировка по ID в обратном порядке)
            state.latest_artists = [...action.payload]
                .sort((a, b) => b.id - a.id)
                .slice(0, 24);
            
            // Популярные артисты (сортировка по количеству подписчиков)
            state.popular_artists = [...action.payload]
                .filter(user => (user.favorite_count || 0) > 0)
                .sort((a, b) => (b.favorite_count || 0) - (a.favorite_count || 0))
                .slice(0, 24);

            console.log(state.data)
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
        },
        // добавление и удаление музыки из списка отслеживаемых
        musicToFavorControl(state, action: PayloadAction<{ musicData: any, userID: number }>) {
            const { musicData, userID } = action.payload;

            const userIndex = state.data.findIndex((user: any) => user.id === userID);
            if (userIndex === -1) return;

            const isMusicInFavorites = state.data[userIndex].favorite_music.some(
                (music: any) => music.id === musicData.id
            );

            state.data = state.data.map(user => {
                if (user.id === userID) {
                    return {
                        ...user,
                        favorite_music: isMusicInFavorites
                            ? user.favorite_music.filter((track: any) => track.id !== musicData.id) // Удаляем
                            : [...user.favorite_music, musicData] // Добавляем
                    };
                }
                return user;
            });
        },
        artistToFavorControl(state, action: PayloadAction<{ artistData: any, userID: number }>) {
            const { artistData, userID } = action.payload;

            const userIndex = state.data.findIndex((user: any) => user.id === userID);
            if (userIndex === -1) return;

            const isArtistInFavorites = state.data[userIndex].favorite_artists.some(
                (user: any) => user.id === artistData.id
            );

            state.data = state.data.map(user => {
                if (user.id === userID) {
                    return {
                        ...user,
                        favorite_artists: isArtistInFavorites
                            ? user.favorite_artists.filter((track: any) => track.id !== artistData.id) // Удаляем
                            : [...user.favorite_artists, artistData] // Добавляем
                    };
                }
                return user;
            });
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    getData,
    addingData,
    uploadMusic,
    deleteMusic,
    musicToFavorControl,
    artistToFavorControl,
} = productsSlice.actions

export default productsSlice.reducer