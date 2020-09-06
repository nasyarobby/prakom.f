import React from "react";
import {
  MdKeyboardArrowDown as AscIcon,
  MdKeyboardArrowUp as DescIcon,
} from "react-icons/md";
import { useState } from "react";

function TableRenderer({
  headers,
  data,
  footer,
  onClickHeader,
  tableClassName,
  ascending,
  indexOfSortCol,
  sortFn,
  hiddenCols,
}) {
  return (
    <table className={tableClassName || "withborder"}>
      <thead>
        <tr>
          {headers
            .map((hd) => (hd.value ? hd : { value: hd.toString() }))
            .map((hd, index) => {
              if (hd.sortable === undefined) hd.sortable = true;

              if (hiddenCols.includes(index)) return null;
              else
                return (
                  <th
                    key={hd.value}
                    className={hd.sortable && `cursor-pointer`}
                    onClick={(e) => {
                      hd.sortable !== false &&
                        onClickHeader &&
                        onClickHeader(index);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{hd.value}</span>
                      <span>
                        {hd.sortable &&
                          index === indexOfSortCol &&
                          (ascending ? <AscIcon /> : <DescIcon />)}
                      </span>
                    </div>
                  </th>
                );
            })}
        </tr>
      </thead>
      <tbody>
        {data.sort(sortFn).map((row, rowIndex) => {
          return (
            <tr key={row.index}>
              {row.data.map((col, colIndex) => {
                if (hiddenCols.includes(colIndex)) return null;
                else return <td key={colIndex}>{col.value}</td>;
              })}
            </tr>
          );
        })}
      </tbody>

      {footer && (
        <tfoot>
          <tr>
            {footer.map((foo, index) => {
              if (hiddenCols.includes(index)) return null;
              return <td key={index}>{foo}</td>;
            })}
          </tr>
        </tfoot>
      )}
    </table>
  );
}

function StatelessDataTable({
  src,
  headers,
  sortBy,
  ascending,
  onClickHeader,
  tableClassName,
  footer,
  keyIndex,
  renderer,
  sortFn,
  hiddenCols,
}) {
  if (Array.isArray(src) === false) {
    return null;
  }

  if (headers === undefined) {
    headers = Array.isArray(src[0])
      ? src[0].map((e, index) => `Col ${index}`)
      : [];
  }

  const getIndexOfSortCol = (val) =>
    !isNaN(Number(val)) ? val : headers.findIndex((h) => h.value === val);

  const indexOfSortCol = getIndexOfSortCol(sortBy);

  const _body = src
    .map((row, index) => {
      return {
        index,
        data: row
          .map((col) => {
            if (col === undefined) return { value: "", rawValue: "" };
            else if (col === null) return { value: "null", rawValue: null };
            else
              return {
                value: col.value === undefined ? col : col.value,
                rawValue:
                  col.rawValue === undefined
                    ? col.value === undefined
                      ? col
                      : col.value
                    : col.rawValue,
              };
          })
          .map((col) => {
            if (typeof col.value === "object" && col.value instanceof Date) {
              col.value = col.value.toString();
            }
            return col;
          }),
      };
    })
    .map((row) =>
      keyIndex !== undefined
        ? { ...row, index: row.data[keyIndex].rawValue }
        : row
    );

  const Renderer = renderer;

  const defaultSortFn = (a, b) => {
    if (ascending)
      return (
        (a.data[indexOfSortCol].rawValue > b.data[indexOfSortCol].rawValue) -
        (a.data[indexOfSortCol].rawValue < b.data[indexOfSortCol].rawValue)
      );
    else
      return (
        (b.data[indexOfSortCol].rawValue > a.data[indexOfSortCol].rawValue) -
        (b.data[indexOfSortCol].rawValue < a.data[indexOfSortCol].rawValue)
      );
  };

  return (
    <Renderer
      data={_body}
      headers={headers}
      footer={footer}
      onClickHeader={onClickHeader}
      indexOfSortCol={indexOfSortCol}
      tableClassName={tableClassName}
      ascending={ascending}
      sortFn={sortFn || defaultSortFn}
      hiddenCols={hiddenCols}
    />
  );
}

function DataTable({
  src,
  headers,
  sortBy,
  ascending,
  onClickHeader,
  tableClassName,
  footer,
  keyIndex,
  renderer,
  sortFn,
  hiddenCols,
}) {
  const [_sortBy, _setSortBy] = useState(sortBy !== undefined ? sortBy : 0);
  const [_ascending, _setAscending] = useState(
    ascending !== undefined ? ascending : true
  );

  if (onClickHeader !== undefined) {
    return (
      <StatelessDataTable
        src={src}
        headers={headers}
        tableClassName={tableClassName}
        sortBy={sortBy}
        ascending={ascending}
        onClickHeader={onClickHeader}
        footer={footer}
        keyIndex={keyIndex}
        renderer={renderer || TableRenderer}
        sortFn={sortFn}
        hiddenCols={hiddenCols || []}
      />
    );
  } else {
    return (
      <StatelessDataTable
        src={src}
        headers={headers}
        tableClassName={tableClassName}
        sortBy={_sortBy}
        ascending={_ascending}
        onClickHeader={(index) => {
          if (index === _sortBy) {
            _setAscending((prev) => !prev);
          } else {
            _setSortBy(index);
          }
        }}
        footer={footer}
        keyIndex={keyIndex}
        renderer={renderer || TableRenderer}
        sortFn={sortFn}
        hiddenCols={hiddenCols || []}
      />
    );
  }
}

export default DataTable;
