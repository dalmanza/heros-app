import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/Hero.interface";

interface FavoriteHeroContext {

    // State 
    favorites: Hero[],
    favoritesCount: number,

    // Methods
    toggleFavorite: (hero: Hero) => void,
    isFavorite: (hero: Hero) => boolean,
}

// Otra forma de resolver este error es creando un archivo de contexto en otro folder, separado de provider
// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);


const getFavoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem('favorites');

    return favorites ? JSON.parse(favorites) : [];
}

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage);

    const toggleFavorite = (hero: Hero) => {
        const heroExists = favorites.find(h => h.id === hero.id)

        if (heroExists) {
            const newFavorites = favorites.filter(h => h.id != hero.id);
            setFavorites(newFavorites);
            return;
        }

        setFavorites([...favorites, hero])
    }

    const isFavorite = (hero: Hero) => {
        return favorites.some(h => h.id === hero.id);
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    return (
        <FavoriteHeroContext value={{
            favorites: favorites,
            favoritesCount: favorites.length,
            toggleFavorite: toggleFavorite,
            isFavorite: isFavorite,
        }}>
            {children}
        </FavoriteHeroContext>
    )
}