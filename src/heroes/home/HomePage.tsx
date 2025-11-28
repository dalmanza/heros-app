import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HerosStats } from "../components/HerosStats"
import { HeroGrid } from "../components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
import { useSearchParams } from "react-router"
import { use, useMemo } from "react"
import { useHeroSummary } from "../hooks/useHeroSummary"
import { usePaginatedHero } from "../hooks/usePaginatedHero"
import { FavoriteHeroContext } from "../context/FavoriteHeroContext"

export const HomePage = () => {

    const [paramsValues, setParamsValues] = useSearchParams();
    const activeTab = paramsValues.get('tab') ?? 'all';
    const page = paramsValues.get('page') ?? '1';
    const limit = paramsValues.get('limit') ?? '6';
    const category = paramsValues.get('category') ?? 'all';
    const { favoritesCount, favorites } = use(FavoriteHeroContext);

    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains']
        return validTabs.includes(activeTab) ? activeTab : 'all'
    }, [activeTab])

    const { data: herosResponse } = usePaginatedHero({ page: +page, limit: +limit, category: category });
    const { data: summaryResponse } = useHeroSummary();

    const handleTabOnclick = (tab: string = 'all', category: string = 'all') => (
        setParamsValues((prev) => {
            prev.set('category', category)
            prev.set('tab', tab)
            prev.set('page', '1')
            return prev;
        })
    );

    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron title="Wiki de Super heroes" description="Descubre, explora y conoce super heroes y villanos" />

                <CustomBreadcrumbs currentPage="Super Heroes" />
                {/* Stats Dashboard */}
                <HerosStats />



                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all"
                            onClick={() => handleTabOnclick('all', 'all')}>
                            All Characters ({summaryResponse?.totalHeroes})
                        </TabsTrigger>
                        <TabsTrigger value="favorites"
                            onClick={() => handleTabOnclick('favorites', 'fav')}> Favorites ({favoritesCount})
                        </TabsTrigger>

                        <TabsTrigger value="heroes"
                            onClick={() => handleTabOnclick('heroes', 'hero')}>Heroes ({summaryResponse?.heroCount})
                        </TabsTrigger>
                        <TabsTrigger value="villains"
                            onClick={() => handleTabOnclick('villains', 'villain')}>Villains ({summaryResponse?.villainCount})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <HeroGrid heroes={herosResponse?.heroes ?? []}></HeroGrid>
                    </TabsContent>
                    <TabsContent value="favorites">
                        <HeroGrid heroes={favorites ?? []}></HeroGrid>
                    </TabsContent>
                    <TabsContent value="heroes">
                        <HeroGrid heroes={herosResponse?.heroes ?? []}></HeroGrid>
                    </TabsContent>
                    <TabsContent value="villains">
                        <HeroGrid heroes={herosResponse?.heroes ?? []}></HeroGrid>
                    </TabsContent>
                </Tabs>

                {/* Pagination */}
                {
                    selectedTab !== 'favorites' && (
                        <CustomPagination totalPages={herosResponse?.pages ?? 1} />
                    )
                }
            </>
        </>
    )
}
