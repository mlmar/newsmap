import { type NewsFeature } from "./News"

export type MapData = {
    count: NewsFeature['properties']['count'],
    location: NewsFeature['properties']['name'],
    coordinates: NewsFeature['geometry']['coordinates'],
    imageUrl: NewsFeature['properties']['shareimage']
    label: string | undefined,
    articles: {
        title: string | undefined,
        url: string | undefined
    }[]
}