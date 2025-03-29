import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import rating from "../../rating/api/rating";
import useDebounce from "../../../hooks/useDebounce";
import useFilter from "../../rating/hooks/useFilters";
import { Button } from "@repo/ui/button";

const RatingTable = () => {
  const asd = useFilter();

  const { data, isPending, isError } = useQuery({
    queryKey: ["rating", asd],
    queryFn: () => rating.getRating(),
  });

  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search);

  return (
    <div>
      <Button />
      <span>RatingTable: {`${JSON.stringify(asd)}`} </span>
      <span>Active search: {debouncedValue}</span>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
};

export default RatingTable;
