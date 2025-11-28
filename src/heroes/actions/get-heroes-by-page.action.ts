import { heroApi } from "../api/heroes.api"
import type { HerosResponse } from "../types/get-heroes-response"


const BASE_URL = import.meta.env.VITE_API_URL;

export const getHerosByPageAction = async (pages: number, limit: number = 5, category: string = 'all'): Promise<HerosResponse> => {

    if (isNaN(pages)) {
        pages = 1;
    }

    if (isNaN(limit)) {
        pages = 1;
    }

    const { data: herosResponse } = await heroApi.get<HerosResponse>('/', {
        params: {
            limit: limit,
            offset: (pages - 1) * limit,
            category: category,
        }
    })

    const heroes = herosResponse.heroes.map(hero => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }));

    return {
        ...herosResponse,
        heroes: heroes,
    }
}