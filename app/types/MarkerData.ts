export type MarkerData = {
    count: number,
    location: string,
    coordinates: [number, number],
    imageUrl: string | undefined
    articles: {
        title: string | undefined,
        url: string | undefined
    }[]
}