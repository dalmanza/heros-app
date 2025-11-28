import { heroApi } from "../api/heroes.api";
import type { Hero } from "../types/Hero.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroDetailsAction = async (idSlug: string) => {
    const { data: heroDetails } = await heroApi.get<Hero>(`/${idSlug}`)

    return {
        ...heroDetails,
        image: `${BASE_URL}/images/${heroDetails.image}`
    }


}
