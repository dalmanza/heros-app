import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { useSearchParams } from "react-router";

interface Props {
    totalPages: number
}

export const CustomPagination = ({ totalPages }: Props) => {
    const [paramsValues, setParamsValues] = useSearchParams();

    const queryPage = paramsValues.get('page') ?? '1';
    const page = isNaN(+queryPage) ? 1 : +queryPage;

    const handleNextPage = () => {
        setParamsValues((prev) => {
            const currentPages = prev.get('page') ?? '1';
            if (+currentPages + 1 > totalPages) {
                return prev;
            }
            const newPage = (+currentPages) + 1
            prev.set('page', newPage.toString());
            return prev;
        })
    }

    const handlePreviousPage = () => {
        setParamsValues((prev) => {
            const currentPages = prev.get('page') ?? '1';
            if (+currentPages - 1 <= 0) {
                return prev;
            }
            const newPage = (+currentPages) - 1
            prev.set('page', newPage.toString());
            return prev;
        })
    }


    function handlePageChange(index: number): void {
        setParamsValues((prev) => {
            prev.set('page', (+index + 1).toString())
            return prev;
        })
    }

    return (
        <div className="flex items-center justify-center space-x-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={handlePreviousPage}>
                <ChevronLeft className="h-4 w-4" />
                Previous
            </Button>
            {
                Array.from({ length: totalPages })
                    .map((_, index) => (
                        <Button
                            key={index}
                            variant={page === (index + 1) ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handlePageChange(index)}>
                            {index + 1}
                        </Button>
                    ))
            }

            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={handleNextPage}>
                Next
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
