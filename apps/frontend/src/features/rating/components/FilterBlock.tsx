import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@repo/ui/popover";
import { FilterIcon, Search } from "lucide-react";

const FilterBlock = () => {
  return (
    <section className="my-2 flex  gap-1">
      <div className="relative flex grow">
        <Search
          className="absolute right-0 m-auto bottom-0 top-0 me-2"
          size={16}
        />
        <Input placeholder="ФИО" />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <FilterIcon />
        </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  defaultValue="100%"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">Max. width</Label>
                <Input
                  id="maxWidth"
                  defaultValue="300px"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  defaultValue="25px"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxHeight">Max. height</Label>
                <Input
                  id="maxHeight"
                  defaultValue="none"
                  className="col-span-2 h-8"
                />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <Button variant={"secondary"}>Reset</Button>
            <Button>Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
    </section>
  );
};

export default FilterBlock;
