import { getHerosByPageAction } from "../actions/get-heroes-by-page.action"
import { useQuery } from "@tanstack/react-query";

interface Props {
    page: number,
    limit: number,
    category: string
}

export const usePaginatedHero = ({ page, limit, category }: Props) => {
    return useQuery({
        queryKey: ['heroes', { 'page': page, 'limit': limit, 'category': category }],
        queryFn: () => getHerosByPageAction(+page, +limit, category),
        staleTime: 1000 * 60 * 2 // Refresh cache every 2 minutes
    })
}
