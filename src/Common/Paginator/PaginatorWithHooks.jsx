import React from "react";
import s from "./Paginator.module.css";

let Pagenator = ({ totalUsersCount, pageSize,  setNewPageSize, currentPage, onPageChanged }) => {
  //console.log(props.users);

  //--------------"ComponentDidMount"---------------------//
  
  //----destruction assaiment
  let [pageSize, setNewPageSize] = useState(10);
  //let [status, setStatus] = useState(props.status);

  //---------------"ComponentDidUpdate"-------------------//

  useEffect(() => {
    setNewPageSize(props.pageSize);
  }, [props.status]);//-зависимость от props.status !!!

  const onSetNewPageSize = e => {
    setNewPageSize(e.currentTarget.value);
  };

  //------------------------------------------------------//

  let pagesCount = Math.ceil(totalUsersCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  //console.log(pages);
  return (
    <div>
      Страниц:
      <input
        type="number"
        size="3"
        name="num1"
        min="10"
        max="100"
        step="10"
        defaultValue="10"
        onChange={onSetNewPageSize}
      />
      {pages.map(page => {
        return (
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
        );
      })}
      <input
        type="number"
        size="3"
        name="num2"
        min="1"
        max="10"
        step="10"
        defaultValue="1"
      />
      : На странице
    </div>
  );
};

export default Pagenator;
