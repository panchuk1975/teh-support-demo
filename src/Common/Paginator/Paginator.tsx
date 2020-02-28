import React, {useState} from "react";
import s from './Paginator.module.css';
import {
    SetNewPageSizeActionType
  } from "../../Redux/usersReducer";


type PropsType = {
    totalUsersCount: number
    pageSize: number
    setNewPageSize: (newPageSize: number) => SetNewPageSizeActionType
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}
let Paginator: React.FC<PropsType> = ({
                                          totalUsersCount,
                                          pageSize,
                                          //portionSize,
                                          setNewPageSize,
                                          //setNewPortionSize,
                                          currentPage,
                                          onPageChanged,
                                      }) => {
    //console.log(props.users);
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let [portionNumber, setPortionNumber] = useState<number>(1);
    let [portionSize, setNewPortionSize] = useState(8);

    let portionCount = Math.ceil(pagesCount / portionSize);

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    //------------------------Use Local State------------------//

    let onSetNewPortionSize = (event: any) => {
        if (event.target.value < 4) return setNewPortionSize(4);
        setNewPortionSize((portionSize = event.target.value));
    };

    //------------------------Use Global State------------------//

    let onSetNewPageSize = (event: any) => {
        // console.log(event.target.value);
        setNewPageSize(event.target.value);
        onPageChanged(currentPage);
    };

    // @ts-ignore
    let classFlag: any;

    return (
        <div>
            <div className={s.inputs}>
        <span>
          Пользователей на странице:
          <input
              type="number"
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
                        //------className problem delete-----------------//
                        if (currentPage === page) {classFlag = s.selectedPage}
                        else  classFlag = s.pages
                        //-------------------------------------------------//
                        return (
                            <span key = {page} className={s.pages}>
                <span
                    onClick={
                        e => {
                            onPageChanged(page);
                        }
                        // {this.props.setCurrentPage(page)}
                    }
                    className = {classFlag}
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

export default Paginator;