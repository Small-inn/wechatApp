import {
    http,
    convertToArray,
    convertToCastString,
    convertToCastInfos
} from '../../../../utils/util'
class Movie {
    constructor(url, cb) {
        this.url = url
        this.cb = cb
    }

    getMovieData() {
        // this.cb = cb
        http(this.url, this.getData.bind(this))
    }

    getData(data) {
        console.log(data)
        if (!data) return
        const director = {
            avatar: "",
            name: "",
            id: ""
        }
        if (data.directors[0] != null) {
            if (data.directors[0].avatars != null) {
                director.avatar = data.directors[0].avatars.large
            }
            director.name = data.directors[0].name
            director.id = data.directors[0].id
        }
        let movie = {
            movieImg: data.images ? data.images.large : "",
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentCount: data.comments_count,
            year: data.year,
            generes: data.genres.join("、"),
            stars: convertToArray(data.rating.stars),
            score: data.rating.average,
            director: director,
            casts: convertToCastString(data.casts),
            castsInfo: convertToCastInfos(data.casts),
            summary: data.summary || '暂无'
        }
        this.cb(movie)
    }
}

export {
    Movie
}