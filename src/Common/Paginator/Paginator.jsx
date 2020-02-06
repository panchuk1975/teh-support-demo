import React, { useState } from "react";
import s from "./Paginator.module.css";

let Pagenator = ({
  totalUsersCount,
  pageSize,
  //portionSize,
  setNewPageSize,
  //setNewPortionSize,
  currentPage,
  onPageChanged
}) => {
  //console.log(props.users);
  let pagesCount = Math.ceil(totalUsersCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let [portionNumber, setPortionNumber] = useState(1);
  let [portionSize, setNewPortionSize] = useState(8);

  let portionCount = Math.ceil(pagesCount / portionSize);

  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  //------------------------Use Local State------------------//

  let onSetNewPortionSize = event => {
    if (event.target.value < 4) return setNewPortionSize(4);
    setNewPortionSize((portionSize = event.target.value));
  };

  //------------------------Use Global State------------------//

  let onSetNewPageSize = event => {
    // console.log(event.target.value);
    setNewPageSize(event.target.value);
    onPageChanged(currentPage);
  };
  //console.log(pages);

  return (
    <div>
      <div className={s.inputs}>
        <span>
          Пользователей на странице:
          <input
            type="number"
            size="3"
            name="num1"
            min="10"
            max="100"
            step="10"
            defaultValue={pageSize}
            onChange={onSetNewPageSize}
          />
        </span>
        <span>
          Отображать страниц:
          <input
            type="number"
            size="3"
            name="num2"
            min="4"
            max="15"
            step="1"
            defaultValue={portionSize}
            onChange={onSetNewPortionSize}
          />
        </span>
      </div>

      <div className={s.paginator}>
        <span>
          {portionNumber > 1 && (
            <button
              className={s.buttons}
              onClick={() => {
                setPortionNumber(portionNumber - 1);
              }}
            >
              Prev
            </button>
          )}
        </span>
        {pages
          .filter(
            p => p >= leftPortionPageNumber && p <= rightPortionPageNumber
          )
          .map(page => {
            return (
              <span className = {s.pages}>
                <span
                  onClick={
                    e => {
                      onPageChanged(page);
                    }
                    // {this.props.setCurrentPage(page)}
                  }
                  className={currentPage === page && s.selectedPage}
                >
                  {page + ","}
                </span>
              </span>
            );
          })}
        <span>
          {portionNumber < portionCount && (
            <button
              className={s.buttons}
              onClick={() => {
                setPortionNumber(portionNumber + 1);
              }}
            >
              Next
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default Pagenator;
