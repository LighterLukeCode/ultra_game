import React from "react";
import axios from "axios";
import { useState } from "react";

const Test = () => {
  // async function fetch() {
  //   const { data } = await axios.get("https://barter.vg/u/a0/t/json/");
  //   // const newData = [...data].filter(i => i > 10);

  //   for (const [key, value] of Object.entries(data)) {
  //     const newData = [key, value];
  //     if (Number(key) < 20) {
  //       console.log(newData);
  //     }
  //   }
  // }
  // fetch();
  const jsonData = require("./data.json");
  console.log(jsonData[0].imageUrl);

  // async function getFetch() {
  //   // fetch("./data.json")
  //   //   .then(response => {
  //   //     return response.json();
  //   //   })
  //   //   .then(jsondata => console.log(jsondata));
  //   const res = await fetch("https://62aa2737371180affbd08847.mockapi.io/items/");
  //   const data = await res.json();

  //   console.log(data);
  // }

  // getFetch();

  const [item, setItem] = useState();
  React.useEffect(() => {
    // async function getItem() {
    //   const res = await fetch("./data.json");
    //   const data = await res.json();
    //   console.log(data);
    // }
  }, []);

  return (
    <div>
      <h1>gfdgdfgdfg</h1>
      <img src={jsonData[0].imageUrl}></img>
    </div>
  );
};

export default Test;
