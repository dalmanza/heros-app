import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.actions";

export const useHeroSummary = () => {
    return useQuery({
        queryKey: ["stats"],
        queryFn: () => getSummaryAction(),
        staleTime: 1000 * 60 * 4 // Refresh every 4 minutes.
    });
}
