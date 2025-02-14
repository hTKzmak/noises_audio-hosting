// заготовленные данные
const musicData = [
    {
        "artist": "Scott Buckley",
        "music": [
            {
                "title": "Ignis",
                "artist": "Scott Buckley",
                "id": 1
            },
        ],
        "id": 1
    },
    {
        "artist": "Ludwig Forssell",
        "music": [
            {
                "title": "Chiralium",
                "artist": "Ludwig Forssell",
                "id": 2
            },
            {
                "title": "Chiral Carcass Culling",
                "artist": "Ludwig Forssell",
                "id": 3
            },
        ],
        "id": 2
    },
    {
        "artist": "Disasterpeace",
        "music": [
            {
                "title": "Forgotten",
                "artist": "Disasterpeace",
                "id": 4
            },
        ],
        "id": 3
    },
]

let musicList = []

for(let i of musicData){
    for(let j of i.music){
        musicList.push(j)
    }
}

console.log(musicList)