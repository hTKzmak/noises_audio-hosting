import { createSlice } from '@reduxjs/toolkit';

// обложки и музыки для заготовленных данных
import ignis from '../music/ignis.mp3'
import artworks from '../music/artworks.jpg'

import chiralium from '../music/chiralium.mp3'
import chiralCarcassCulling from '../music/chiral_carcass_culling.mp3'
import death_stranding from '../music/ds_ost.jpg'

import forgotten from '../music/forgotten.mp3'
import fez from '../music/fez.jpg'

// заготовленные данные
export const musicData = [
    {
        "title": "Ignis",
        "artist": "Scott Buckley",
        "artwork": artworks,
        "url": ignis,
        "id": 1
    },
    {
        "title": "Chiralium",
        "artist": "Ludwig Forssell",
        "artwork": death_stranding,
        "url": chiralium,
        "id": 2
    },
    {
        "title": "Chiral Carcass Culling",
        "artist": "Ludwig Forssell",
        "artwork": death_stranding,
        "url": chiralCarcassCulling,
        "id": 3
    },
    {
        "title": "Forgotten",
        "artist": "Disasterpeace",
        "artwork": fez,
        "url": forgotten,
        "id": 4
    },
]

export interface ProductsState {
    data: any[],
}

const initialState: ProductsState = {
    // обычные данные с API (но сейчас с заготовленных данных musicData)
    data: musicData,
}

export const productsSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        getData(){
            console.log(initialState.data)
        }
    },
})

// Action creators are generated for each case reducer function
export const { getData } = productsSlice.actions

export default productsSlice.reducer