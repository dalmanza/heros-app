
import { useQuery } from '@tanstack/react-query'
import { getSearchHeroesAction } from '../actions/search-hero.action';
import type { SearchParams } from '../types/interface/SearchParams';

export const useSearchHero = (params: SearchParams) => {
    return useQuery({
        queryKey: ['search', { params }],
        queryFn: () => getSearchHeroesAction(params),
        staleTime: 1000 * 60 * 10
    });
}
