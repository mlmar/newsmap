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
        urlpubtimedate: string,
        name: string,
        urltone: number,
        urllangcode: string,
        urlsocialimage: string,
        url: string,
        mentionedthemes: string
    }
}