export type MapData = {
    count: number,
    location: string,
    coordinates: [number, number],
    imageUrl: string | undefined
    label: string | undefined,
    articles: {
        title: string | undefined,
        url: string | undefined
    }[]
}