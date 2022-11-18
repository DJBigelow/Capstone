import { useTable, useGlobalFilter, useFilters, Row } from "react-table";
import { TableFilter } from "./TableFilter";

type TableProps<T> = {
  columns: {
    Header: string;
    accessor: string | ((originalRowObj: T, rowIndex: number) => any);
    Cell?: ({ value }: any) => string | React.Component
  }[];
  data: T[];
  hiddenColumns?: string[];
  rowClick?: any;
  filterPlaceholderText?: string;
};

export const Table = <T extends unknown>({
  columns,
  data,
  hiddenColumns,
  rowClick,
  filterPlaceholderText,
}: TableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: columns as any,
      data: data as object[],
      initialState: { hiddenColumns: hiddenColumns || [] },
    },
    useFilters,
    useGlobalFilter
  );

  return (
    <div>
      <TableFilter
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
        placeHolderText={filterPlaceholderText}
      ></TableFilter>

      <div className="table-responsive">
        <table
          {...getTableProps()}
          className="table table-hover table-striped"
          style={{ height: "400px" }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} scope="col">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: Row<object>) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
                    if (rowClick) rowClick(row.original as T);
                  }}
                  style={{ cursor: rowClick ? "pointer" : "auto" }}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
