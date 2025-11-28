import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, SortAsc, Grid, Plus } from "lucide-react"
import { useRef } from "react"
import { useSearchParams } from "react-router"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
} from "@/components/ui/accordion"

export const SearchControls = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [paramsValues, setParamsValues] = useSearchParams();

    const activeAccordion = paramsValues.get('active-accordion') ?? '';
    const selectedStrength = Number(paramsValues.get('strength') ?? 0);

    const setQueryParams = (name: string, value: string) => {
        setParamsValues((prev) => {
            prev.set(name, value);
            return prev;
        })
    }

    const deleteQueryParams = (name: string) => {
        setParamsValues((prev) => {
            prev.delete(name);
            return prev;
        })
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const value = inputRef.current?.value ?? '';
            setQueryParams('name', value);
        }
    }



    return (
        <>
            < div className="flex flex-col lg:flex-row gap-4 mb-8" >
                {/* Search */}
                < div className="relative flex-1 bg-white" >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                        ref={inputRef}
                        placeholder="Search heroes, villains, powers, teams..."
                        className="pl-12 h-12 text-lg"
                        onKeyDown={(event) => handleKeyDown(event)}
                        defaultValue={paramsValues.get('name') ?? ''}
                    />
                </div >

                {/* Action buttons */}
                < div className="flex gap-2" >
                    <Button variant={
                        activeAccordion === 'advanced-filters' ? 'default' : 'outline'
                    }
                        className="h-12"
                        onClick={() => {
                            console.log('dan-02 on click')
                            if (activeAccordion === "advanced-filters") {
                                deleteQueryParams('active-accordion')
                                return;
                            }
                            setQueryParams('active-accordion', 'advanced-filters')
                        }}>
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>

                    <Button variant="outline" className="h-12 bg-white">
                        <SortAsc className="h-4 w-4 mr-2" />
                        Sort by Name
                    </Button>

                    <Button variant="outline" className="h-12 bg-white">
                        <Grid className="h-4 w-4" />
                    </Button>

                    <Button className="h-12">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Character
                    </Button>
                </div>
            </div>

            <Accordion type="single" collapsible value={activeAccordion}>
                <AccordionItem value="advanced-filters">
                    <AccordionContent>
                        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                                <Button variant="ghost">Clear All</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Team</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All teams
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All categories
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Universe</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All universes
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All statuses
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm font-medium">Minimum Strength: {selectedStrength}/10</label>
                                <Slider defaultValue={[selectedStrength]}
                                    max={10}
                                    onValueChange={(value) => { setQueryParams('strength', value[0].toString()) }}
                                    step={1} />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


        </>
    )
}
