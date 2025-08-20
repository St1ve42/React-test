export const STUB = '-'

export const COLOR_GENRES: {[key: string]: [string, string]} = {
    "Action": ["#e74c3c", "#FFFFFF"],
    "Adventure": ["#3498db", "#FFFFFF"],
    "Animation": ["#f1c40f", "#000000"],
    "Comedy": ["#2ecc71", "#FFFFFF"],
    "Crime": ["#8e44ad", "#FFFFFF"],
    "Documentary": ["#ecf0f1", "#000000"],
    "Drama": ["#95a5a6", "#FFFFFF"],
    "Family": ["#e67e22", "#FFFFFF"],
    "Fantasy": ["#9b59b6", "#FFFFFF"],
    "History": ["#7f8c8d", "#FFFFFF"],
    "Horror": ["#000000", "#FFFFFF"],
    "Music": ["#f39c12", "#FFFFFF"],
    "Mystery": ["#34495e", "#FFFFFF"],
    "Romance": ["#fd79a8", "#FFFFFF"],
    "Science Fiction": ["#2c3e50", "#FFFFFF"],
    "Thriller": ["#c0392b", "#FFFFFF"],
    "TV Movie": ["#bdc3c7", "#000000"],
    "War": ["#7f8c8d", "#FFFFFF"],
    "Western": ["#a0522d", "#FFFFFF"]
};

export const SLIDES_PER_VIEW = 4
export const breakpoints = {
    280: {
        slidesPerView: 1
    },
    538: {
        slidesPerView: 2,
        spaceBetween: 10,
    },
    832: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    1152: {
        slidesPerView: 4,
        spaceBetween: 30,
    },
}

export const pageSelection = (startPageOfSelection: number): number[] => {
    const pages: number[] = []
    for (let i = startPageOfSelection; i < startPageOfSelection + 3; i++) {
        pages.push(i)
    }
    return pages
}

export const getDate = (date: string) => {
    let handledDate: Date | string[] | string = ''
    if(date){
        handledDate = new Date(date).toDateString().split(" ")
        handledDate[handledDate.length-2] = handledDate[handledDate.length-2] + ','
        handledDate.shift()
        handledDate = handledDate.join(" ")
    }
    else{
        handledDate = STUB
    }
    return handledDate
}