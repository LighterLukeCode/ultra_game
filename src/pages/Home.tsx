import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import GameBlock from "../components/gameblock";
import Sort from "../components/Sort";
import Skeleton from "../components/gameblock/Skeleton";
import Pagination from "../components/Pagination";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FilterConfig, setCategory, setCurrentPage, setFilter } from "../redux/Slices/filterSlice";
import { sortList } from "../components/Sort";
import { useRef } from "react";
import { fetchGame, setItem } from "../redux/Slices/gameSlice";

const Home = () => {
  const navigate = useNavigate();
  const category = useAppSelector(state => state.filterSlice.category);
  const sortType = useAppSelector(state => state.filterSlice.sort);
  const currentPage = useAppSelector(state => state.filterSlice.currentPage);
  const { items, status } = useAppSelector(state => state.gameSlice);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useAppDispatch();

  const searchValue = useAppSelector(state => state.filterSlice.searchValue);

  const getGames = async () => {
    const categoryAPI = category !== "Все жанры" ? "?genres=" + category : "?";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(fetchGame({ categoryAPI, sortBy, order, search, currentPage }));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as FilterConfig;

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

      const normalizedSort = sort === undefined ? { name: "более популярным", sortProperty: "rating" } : sort;

      dispatch(setFilter({ ...params, normalizedSort }));
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

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={category} onClickCategory={id => dispatch(setCategory(id))} />
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
            : items.map((game, i) => <GameBlock key={i} game={game} />)}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangeCurrentPage={page => dispatch(setCurrentPage(page))} />
    </div>
  );
};

export default Home;
