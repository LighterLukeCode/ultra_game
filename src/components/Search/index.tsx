import React from "react";
import styles from "./search.module.scss";
import { useAppDispatch } from "../../redux/hooks";
import { useRef } from "react";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../redux/Slices/filterSlice";

const Search = () => {
  const [value, setValue] = React.useState("");
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setValue("");
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce(str => {
      dispatch(setSearchValue(str));
    }, 300),
    []
  );

  const onChangeInput = e => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 50 50"
        height="50px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 50 50"
        width="50px"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect fill="none" height="50" width="50" />
        <circle
          cx="21"
          cy="20"
          fill="none"
          r="16"
          stroke="#000000"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          stroke="#000000"
          strokeMiterlimit="10"
          strokeWidth="4"
          x1="32.229"
          x2="45.5"
          y1="32.229"
          y2="45.5"
        />
      </svg>
      <input ref={inputRef} value={value} onChange={onChangeInput} placeholder="Поиск игры" className={styles.input} />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          height="14px"
          version="1.1"
          viewBox="0 0 14 14"
          width="14px"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <title />
          <desc />
          <defs />
          <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
            <g fill="#000000" id="Core" transform="translate(-341.000000, -89.000000)">
              <g id="close" transform="translate(341.000000, 89.000000)">
                <path
                  d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z"
                  id="Shape"
                />
              </g>
            </g>
          </g>
        </svg>
      )}
    </div>
  );
};

export default Search;
