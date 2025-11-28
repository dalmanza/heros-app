import type { Hero } from "./Hero.interface";

export interface HerosResponse {
    total: number;
    pages: number;
    heroes: Hero[];
}
