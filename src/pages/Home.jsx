import axios from "axios";
import React from "react";
import Categories from "../components/Categories";
import GameBlock from "../components/gameblock";
import Sort from "../components/Sort";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState("RPG");

  const getGames = async () => {
    const { data } = await axios.get("https://62aa2737371180affbd08847.mockapi.io/items");
    setItems(data);
    // setCategoryId(data.genres);
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
        <Categories setCategoryId={setCategoryId} />
        <Sort />
        {/* <Categories value={categoryId} onClickCategory={onClickCategory} />
    <Sort value={sortType} /> */}
      </div>
      <h2 className="content__title">Все игры</h2>
      {/* {status === "error" ? ( */}
      {/* <div className="content__error-info">
        <h2>Произошла ошибка</h2>
        <p>Пезагрузите страницу</p>
      </div> */}
      {/* // ) : ( */}
      <div className="content__items">
        {/* {items.map(item => (
          <GameBlock {...item} />
        ))} */}
        {items
          .filter(item => item.genres.includes(categoryId))
          .map(item => (
            <GameBlock {...item} />
          ))}
        {/* {status === "loading"
        ? [...Array(6)].map((_, i) => <Skeleton key={i} />)
        : items
            // Подходит для  поиска без бека, с постоянной датой
            //.filter(item => {
            //   if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
            //     return true;
            //   }
            //   return false;
            // })
            .map((game: any) => (
                key={game.id}
                title={game.title} // {...game} спред если все пропсы одинаковые
                price={game.price}
                image={game.imageUrl}
                sizes={game.sizes}
                types={game.types}
                id={game.id}
              />
            ))} */}
      </div>
      {/* )} */}
      {/* <Pagination currentPage={currentPage} onChangePage={(num: number) => dispatch(setCurrentPage(num))} /> */}
    </div>
  );
};

export default Home;
