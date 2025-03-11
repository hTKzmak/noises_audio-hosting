import { createSlice } from '@reduxjs/toolkit';

// // обложки и музыки для заготовленных данных
// import ignis from '../preparedData/music/ignis.mp3'
// import artworks from '../preparedData/music/artworks.jpg'

// import chiralium from '../preparedData/music/chiralium.mp3'
// import chiralCarcassCulling from '../preparedData/music/chiral_carcass_culling.mp3'
// import death_stranding from '../preparedData/music/ds_ost.jpg'

// import forgotten from '../preparedData/music/forgotten.mp3'
// import fez from '../preparedData/music/fez.jpg'

// // изображения исполнитеелй
// import scottBuckley from '../preparedData/artist/scottBuckley.jpg'
// import ludvigForssell from '../preparedData/artist/ludvigForssell.jpg'
// import disasterpeace from '../preparedData/artist/disasterpeace.jpg'

// // заготовленные данные
// export const musicData = [
//     {
//         "artist": "Scott Buckley",
//         "image": scottBuckley,
//         "music": [
//             {
//                 "title": "Ignis",
//                 "artist": "Scott Buckley",
//                 "artwork": artworks,
//                 "url": ignis,
//                 "id": 1
//             },
//         ],
//         "id": 1
//     },
//     {
//         "artist": "Ludwig Forssell",
//         "image": ludvigForssell,
//         "music": [
//             {
//                 "title": "Chiralium",
//                 "artist": "Ludwig Forssell",
//                 "artwork": death_stranding,
//                 "url": chiralium,
//                 "id": 2
//             },
//             {
//                 "title": "Chiral Carcass Culling",
//                 "artist": "Ludwig Forssell",
//                 "artwork": death_stranding,
//                 "url": chiralCarcassCulling,
//                 "id": 3
//             },
//         ],
//         "id": 2
//     },
//     {
//         "artist": "Disasterpeace",
//         "image": disasterpeace,
//         "music": [
//             {
//                 "title": "Forgotten",
//                 "artist": "Disasterpeace",
//                 "artwork": fez,
//                 "url": forgotten,
//                 "id": 4
//             },
//         ],
//         "id": 3
//     },
// ]

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