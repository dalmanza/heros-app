import type { Hero } from "./Hero.interface";

export interface SummaryResponse {
    totalHeroes: number;
    strongestHero: Hero;
    smartestHero: Hero;
    heroCount: number;
    villainCount: number;
};
