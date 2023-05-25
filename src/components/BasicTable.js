import React, { useEffect, useMemo, useState } from "react";
import Filtered from "../components/Filtered";
import { usePagination, useSortBy, useTable } from "react-table";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const BasicTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredData(data);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "userId",
        sortType: 'basic',
      },
      {
        Header: "ID",
        accessor: "id",
        sortType: 'basic',
      },
      {
        Header: "TITLE",
        accessor: "title",
        sortType: 'alphanumeric',
      },
      {
        Header: "BODY",
        accessor: "body",
        sortType: 'alphanumeric',
      },
    ],
    []
  );

  const handleFilter = (searchQuery) => {
    const filtered = users.filter((user) => {
      return user.title.toLowerCase().includes(searchQuery.toLowerCase());
      
    });
    setFilteredData(filtered);
  };

  const tableInstance = useTable(
    { columns, data: filteredData, initialState: { pageIndex: 0, pageSize: 5 } },
    useSortBy, usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    pageOptions,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = tableInstance;

  return (
    <div>
      <Filtered onFilter={handleFilter} />

      {filteredData.length > 0 ? (
        <TableContainer component={Paper}>
          <Table {...getTableProps()} style={{ border: "solid 1px blue" }}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        borderBottom: "solid 3px red",
                        background: "aliceblue",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {console.log(column.render("Header"), "sddsdsd")}
                      {column.render("Header")}
                      <span>
                         {column.isSorted ? (column.isSortedDesc ? '^' : '>') : ''}
                  </span>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <TableCell
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                          background: "papayawhip",
                        }}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Loading data...</p>
      )}

      <div style={{marginTop: 10, float: 'right'}}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
      </div>
    </div>
  );
};

export default BasicTable;
