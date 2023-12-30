import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Scoops = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/scoops").then((res) => setData(res.data));
  }, []);


  return (
    <div className="container my-5">
      <h1>Dondurma Çeşitleri</h1>
      <p>
        Tanesi: <span className="text-success">20 TL</span>
      </p>
      <h3>
        Çeşitler Ücreti: <span className="text-success"><span>{basket.length * 20}</span> TL</span>
      </h3>
      <div className="row gap-5 justify-content-between mt-4 p-3">
        {data.map((i) => (
          <Card basket={basket} setBasket={setBasket} item={i} key={i.name} />
        ))}
      </div>
    </div>
  );
};

export default Scoops;
