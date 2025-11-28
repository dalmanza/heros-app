import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HerosStats } from "../components/HerosStats";
import { HeroGrid } from "../components/HeroGrid";
import { useSearchHero } from "../hooks/useSearchHero";
import { useSearchParams } from "react-router";
import type { SearchParams } from "../types/interface/SearchParams";

export const SearchPage = () => {

    const [useParams,] = useSearchParams();

    const params: SearchParams = {
        name: useParams.get('name') ?? '',
        team: useParams.get('team') ?? '',
        category: useParams.get('category') ?? '',
        universe: useParams.get('universe') ?? '',
        status: useParams.get('status') ?? '',
        strength: useParams.get('strength') ?? '',
    }

    const { data: searchResults } = useSearchHero(params);

    return (
        <>
            <CustomJumbotron title="Busca nuevos super Heroes" description="Descubre, explora y conoce nuevos super heroes y villanos" />
            <CustomBreadcrumbs currentPage="Buscador de Heroes" />
            <HerosStats />

            {/* Controls */}
            <SearchControls />

            <HeroGrid heroes={searchResults ?? []} />
        </>
    )
}

export default SearchPage;
