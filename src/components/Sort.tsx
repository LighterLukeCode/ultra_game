import React from "react";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSort } from "../redux/Slices/filterSlice";

export const sortList = [
  { name: "более популярным", sortProperty: "rating" },
  { name: "менее популярным", sortProperty: "-rating" },
  { name: "дороже", sortProperty: "price" },
  { name: "дешевле", sortProperty: "-price" },
  { name: "названию (z...a)", sortProperty: "title" },
  { name: "названию (a...z)", sortProperty: "-title" },
];

type SortType = {
  name: string;
  sortProperty: string;
};

const Sort = () => {
  const sortOption = useAppSelector(state => state.filterSlice.sort);
  const dispatch = useAppDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  const onClickToggle = (sort: SortType) => {
    dispatch(setSort(sort));
    setOpen(false);
  };

  React.useEffect(() => {
    const onClickCloseSort = (event: MouseEvent) => {
      const composed = event.composedPath();
      if (sortRef.current !== null) {
        if (!composed.includes(sortRef.current)) {
          setOpen(false);
        }
      }
    };
    document.body.addEventListener("click", onClickCloseSort);
    return () => document.body.removeEventListener("click", onClickCloseSort);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sortOption.name}</span>
      </div>

      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((sort, i) => (
              <li
                key={i}
                onClick={() => onClickToggle(sort)}
                className={sortOption.sortProperty === sort.sortProperty ? "active" : ""}
              >
                {sort.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
