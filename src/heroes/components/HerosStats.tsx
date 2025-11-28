import { Badge } from "@/components/ui/badge"
import { Users, Heart, Zap, Trophy } from "lucide-react"
import { HeroStatCard } from "./HeroStatCard"
import { useHeroSummary } from "../hooks/useHeroSummary"
import { use } from "react"
import { FavoriteHeroContext } from "../context/FavoriteHeroContext"


export const HerosStats = () => {

    const { data: summaryResponse } = useHeroSummary();
    const { favoritesCount } = use(FavoriteHeroContext);

    if (!summaryResponse) {
        return (<div>Loading</div>)
    }
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            <HeroStatCard
                title="Total Characters"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-2xl font-bold">{summaryResponse?.totalHeroes}</div>
                <div className="flex gap-1 mt-2">
                    <Badge variant="secondary" className="text-xs">
                        {summaryResponse?.heroCount} Heroes
                    </Badge>
                    <Badge variant="destructive" className="text-xs">
                        {summaryResponse?.villainCount} Villains
                    </Badge>
                </div>
            </HeroStatCard>


            <HeroStatCard
                title="Favorites"
                icon={<Heart className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-2xl font-bold text-red-600">{favoritesCount}</div>
                <p className="text-xs text-muted-foreground">{((favoritesCount / summaryResponse?.totalHeroes) * 100).toFixed(2)}% of total</p>
            </HeroStatCard>

            <HeroStatCard
                title="Strongest"
                icon={<Zap className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-lg font-bold">{summaryResponse?.strongestHero.alias}</div>
                <p className="text-xs text-muted-foreground">
                    Strength: {summaryResponse?.strongestHero.strength}/10
                </p>
            </HeroStatCard>


            <HeroStatCard
                title="Smartest"
                icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-lg font-bold">{summaryResponse?.smartestHero.alias}</div>
                <p className="text-xs text-muted-foreground">
                    Intelligence: {summaryResponse?.smartestHero.intelligence}/10
                </p>
            </HeroStatCard>
        </div >
    )
}
