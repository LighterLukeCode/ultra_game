import axios from "axios";
import React from "react";
import GameBlock from "../components/gameblock";

const Home = () => {
  const [items, setItems] = React.useState(null);

  const getGames = async () => {
    const { data } = await axios.get("https://62aa2737371180affbd08847.mockapi.io/items");
    return data;
  };

  React.useEffect(() => {
    setItems(getGames());
  }, []);

  // React.useEffect(() => {
  //   setData(getGames());
  // });

  return (
    <div className="container">
      <div className="content__top">
        {/* <Categories value={categoryId} onClickCategory={onClickCategory} />
    <Sort value={sortType} /> */}
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {/* {status === "error" ? ( */}
      {/* <div className="content__error-info">
        <h2>Произошла ошибка</h2>
        <p>Пезагрузите страницу</p>
      </div> */}
      {/* // ) : ( */}
      <div className="content__items">
        {items.map(item => (
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
            .map((pizza: any) => (
                key={pizza.id}
                title={pizza.title} // {...pizza} спред если все пропсы одинаковые
                price={pizza.price}
                image={pizza.imageUrl}
                sizes={pizza.sizes}
                types={pizza.types}
                id={pizza.id}
              />
            ))} */}
      </div>
      {/* )} */}
      {/* <Pagination currentPage={currentPage} onChangePage={(num: number) => dispatch(setCurrentPage(num))} /> */}
    </div>
  );
};

export default Home;
