import axios from "axios";
import React from "react";
import Categories from "../components/Categories";
import GameBlock from "../components/gameblock";
import Sort from "../components/Sort";
import Skeleton from "../components/gameblock/Skeleton";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getGames = async () => {
    const { data } = await axios.get("https://62aa2737371180affbd08847.mockapi.io/items");
    setItems(data);
    // setCategoryId(data.genres);
    setIsLoading(false);
  };

  React.useEffect(() => {
    getGames();
  }, []);

  // React.useEffect(() => {
  //   setData(getGames());
  // });

  return (
    <div className="container">
      <div className="content__top">
        {/* <Categories value={categoryId} onClickCategory={onClickCategory} />
    <Sort value={sortType} /> */}
        <Categories />
        <Sort />
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
              .map(game => (
                <GameBlock {...game} />

                // {...game} спред если все пропсы одинаковые
              ))}
      </div>
      {/* )} */}
      {/* <Pagination currentPage={currentPage} onChangePage={(num: number) => dispatch(setCurrentPage(num))} /> */}
    </div>
  );
};

export default Home;
