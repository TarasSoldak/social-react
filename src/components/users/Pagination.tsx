import React, { useState } from "react";
import Button from "../button/Button";
import style from "./paginator.module.css";
import "./users.css";

type PropsType = {
  totalUsersCount: number
  pageSize: number
  onPageChange: (pageNumber: number) => void
  currentPage: number
  portionSize?: number
}

const Pagination: React.FC<PropsType> = ({ totalUsersCount, pageSize, onPageChange, currentPage, portionSize = 26, }) => {
  const pageCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i < pageCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pageCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={style.paginator}>
      {portionNumber > 1 && (
        <Button
          disabled={false}
          onClick={() => setPortionNumber(portionNumber - 1)}
          title="Prev"
        />
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <span
              key={p}
              onClick={() => onPageChange(p)}
              className={currentPage === p ? style.page : ""}
            >
              <span className={style.pageNumber}>{p}</span>
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <Button
          disabled={false}
          onClick={() => setPortionNumber(portionNumber + 1)}
          title="Next"
        />
      )}
    </div>
  );
};

export default Pagination;
