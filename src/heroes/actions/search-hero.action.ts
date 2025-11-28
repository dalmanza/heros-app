import { heroApi } from "../api/heroes.api"
import type { Hero } from "../types/Hero.interface";
import type { SearchParams } from "../types/interface/SearchParams";


const BASE_URL = import.meta.env.VITE_API_URL;

export const getSearchHeroesAction = async (params: SearchParams = {}) => {
    const { name, team, category, universe, status, strength
    } = params;

    if (!name && !team && !category && !universe && !status && !strength) {
        return []
    }


    const { data } = await heroApi.get<Hero[]>('/search', {
        params: {
            name: params.name,
            team: params.team,
            category: params.category,
            universe: params.universe,
            status: params.status,
            strength: params.strength,
        }
    });

    const response = data.map(hero => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }));

    return response;
}
