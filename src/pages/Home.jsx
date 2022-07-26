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

const Home = () => {
  const navigate = useNavigate();
  const category = useSelector(state => state.filterSlice.category);
  const sortType = useSelector(state => state.filterSlice.sort);
  const currentPage = useSelector(state => state.filterSlice.currentPage);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContex);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getGames = async () => {
    setIsLoading(true);

    const categoryAPI = category !== "Все жанры" ? "?genres=" + category : "?";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";

    const { data } = await axios.get(
      `https://62aa2737371180affbd08847.mockapi.io/items${categoryAPI}&page=${currentPage}&limit=6&sortBy=${sortBy}&order=${order}&${search}`

      // category === "Все жанры"
      //   ? "https://62aa2737371180affbd08847.mockapi.io/items"
      //   : "https://62aa2737371180affbd08847.mockapi.io/items?genres=" + category
    );
    setItems(data);
    // setCategoryId(data.genres);
    setIsLoading(false);
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
    if (!isSearch.current) {
      getGames();
    }

    isSearch.current = false;
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
        {/* <Categories value={categoryId} onClickCategory={onClickCategory} />
    <Sort value={sortType} /> */}
        <Categories value={category} onClickCategory={i => dispatch(setCategory(i))} />
        <Sort value={sortType} />
      </div>
      <h2 className="content__title">Все игры</h2>
      {/* {status === "error" ? ( */}
      {/* <div className="content__error-info">
        <h2>Произошла ошибка</h2>
        <p>Пезагрузите страницу</p>
      </div> */}
      {/* // ) : ( */}
      <div className="content__items">
        {/* {games.map(item => (
          <GameBlock {...item} />
        ))} */}
        {/* <GameBlock /> */}
        {/* {items
          .filter(item => item.genres.includes(categoryId))
          .map(item => (
            <GameBlock {...item} />
          ))} */}
        {isLoading
          ? [...Array(6)].map((_, i) => <Skeleton key={i} />)
          : items
              // Подходит для  поиска без бека, с постоянной датой
              //.filter(item => {
              //   if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
              //     return true;
              //   }
              //   return false;
              // })
              .map((game, i) => (
                <GameBlock key={i} {...game} />

                // {...game} спред если все пропсы одинаковые
              ))}
      </div>
      <Pagination currentPage={currentPage} onChangeCurrentPage={page => dispatch(setCurrentPage(page))} />
      {/* )} */}
      {/* <Pagination currentPage={currentPage} onChangePage={(num: number) => dispatch(setCurrentPage(num))} /> */}
    </div>
  );
};

export default Home;
