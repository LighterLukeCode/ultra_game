import React from "react";

const Categories = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const categories = [
    "Все жанры",
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
        {categories.map((title, i) => (
          <li key={i} onClick={() => setActiveTab(i)} className={activeTab === i ? "active" : ""}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
