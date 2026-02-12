export type News = {
    type: string,
    features: NewsFeature[]
}

export type NewsFeature = {
    type: string,
    geometry: {
        type: string,
        coordinates: [
            number,
            number
        ]
    },
    properties: {
        name: string,
        count: number,
        shareimage: string,
        html: string
    }
}