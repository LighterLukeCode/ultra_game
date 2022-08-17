import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Game } from "../interfaces/Game";

const FullGame = () => {
  const { id } = useParams();
  const [game, setGame] = useState<Game>();

  const getGame = async () => {
    try {
      const { data } = await axios.get(`https://62aa2737371180affbd08847.mockapi.io/items/` + id);

      return setGame(data);
    } catch (err) {
      console.log("ошибка", err);
    }
  };

  React.useEffect(() => {
    getGame();
  }, []);

  if (!game) {
    return <h1>идет загрузка.....</h1>;
  }

  return (
    <div className="container">
      <img src={game.imageUrl} alt="Game" />
      <h3>{game.title}</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et error ipsa quisquam voluptatibus, rem voluptas
        quaerat neque quos similique corporis vitae autem facilis nihil voluptate, laboriosam possimus cupiditate
        consectetur eum.{" "}
      </p>
      <span>{game.price} рублей</span>
    </div>
  );
};

export default FullGame;
