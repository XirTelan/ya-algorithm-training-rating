import { Route } from "@/routes";
import useDebounce from "@/shared/hooks/useDebounce";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@repo/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { FilterIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";

const FilterBlock = () => {
  const { search: initValue, limit } = Route.useSearch();
  const [search, setSearch] = useState(initValue ?? "");
  const [currentLimit, setCurrentLimit] = useState(String(limit));
  const debouncedValue = useDebounce(search);

  const navigate = useNavigate({ from: Route.fullPath });

  useEffect(() => {
    navigate({
      search: (prev) => ({
        ...prev,
        search: debouncedValue,
        limit: Number(currentLimit),
      }),
    });
  }, [debouncedValue, currentLimit]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="my-2 flex  gap-1">
      <div className="relative flex grow">
        <Search
          className="absolute right-0 m-auto bottom-0 top-0 me-2"
          size={16}
        />
        <Input value={search} onChange={handleSearch} placeholder="ФИО" />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button aria-label="open search filters" variant="outline">
            <FilterIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Фильтры</h4>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label>Размер страницы</Label>
                <Select
                  value={currentLimit}
                  onValueChange={(value) => setCurrentLimit(value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder=" Limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterBlock;
