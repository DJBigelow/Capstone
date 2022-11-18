import { useAsyncDebounce } from "react-table";

import { useState } from "react";

export const TableFilter = ({ globalFilter, setGlobalFilter, placeHolderText }: any) => {
  const [filterValue, setFilterValue] = useState(globalFilter);

  const onFilterChange = useAsyncDebounce((filterValue) => {
    setGlobalFilter(filterValue || undefined);
  }, 200);

  return (
    <input
      placeholder={placeHolderText}
      value={filterValue || ""}
      onChange={(e) => {
        setFilterValue(e.target.value);
        onFilterChange(e.target.value);
      }}
      className="form-control"
    ></input>
  );
};
