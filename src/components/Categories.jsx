import React from "react";

const Categories = ({ setCategoryId }) => {
  const categories = [
    "Action/RPG",
    "Adventure",
    "Shooter",
    "BattleRoyle",
    "Sport",
    "Simulator",
    "Racing",
    "MMO",
    "RPG",
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li key={i} onClick={() => setCategoryId(item)}>
            {item}
          </li>
        ))}
        {/* {categories.map((title, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? "active" : ""}>
            {title}
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default Categories;
