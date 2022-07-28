import axios from "axios";
import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import GameBlock from "../components/gameblock";
import Sort from "../components/Sort";
import Skeleton from "../components/gameblock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContex } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setCurrentPage, setFilter } from "../redux/Slices/filterSlice";
import { sortList } from "../components/Sort";
import { useRef } from "react";
import { fetchGame, setItem } from "../redux/Slices/gameSlice";

const Home = () => {
  const navigate = useNavigate();
  const category = useSelector(state => state.filterSlice.category);
  const sortType = useSelector(state => state.filterSlice.sort);
  const currentPage = useSelector(state => state.filterSlice.currentPage);
  const { items, status } = useSelector(state => state.gameSlice);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useDispatch();

  const searchValue = useSelector(state => state.filterSlice.searchValue);

  // const [isLoading, setIsLoading] = React.useState(true);

  const getGames = async () => {
    // setIsLoading(true);

    const categoryAPI = category !== "Все жанры" ? "?genres=" + category : "?";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";

    // category === "Все жанры"
    //   ? "https://62aa2737371180affbd08847.mockapi.io/items"
    //   : "https://62aa2737371180affbd08847.mockapi.io/items?genres=" + category

    // setItems(data);
    dispatch(fetchGame({ categoryAPI, sortBy, order, search, currentPage }));

    // setCategoryId(data.genres);
    // setIsLoading(false);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(setFilter({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    // if (!isSearch.current) {

    // }
    getGames();
    // isSearch.current = false;
  }, [category, sortType.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        category,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [category, sortType.sortProperty, searchValue, currentPage]);

  // React.useEffect(() => {
  //   setData(getGames());
  // });

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={category} onClickCategory={i => dispatch(setCategory(i))} />
        <Sort value={sortType} />
      </div>
      <h2 className="content__title">Все игры</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Перезагрузите страницу</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...Array(6)].map((_, i) => <Skeleton key={i} />)
            : items.map((game, i) => <GameBlock key={i} {...game} />)}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangeCurrentPage={page => dispatch(setCurrentPage(page))} />
    </div>
  );
};

export default Home;
