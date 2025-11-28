import { useQuery } from "@tanstack/react-query"
import { getHeroDetailsAction } from "../actions/get-hero-details.action"

export const useHeroDetails = (idSlug: string) => {

    return useQuery({
        queryKey: ['heroDetails', idSlug],
        queryFn: () => getHeroDetailsAction(idSlug),
        staleTime: 1000 * 60 * 5 // Refresh cache every 5 minutes
    })
}