import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from 'axios';
import Createpost from "../components/Createpost";

const News = () => {
  const [data, setData] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:8000/api/post/')
    .then((res) => setData(res.data));
    
    console.log(data);
  }, [])

  return (
    <div>
      <Header />
      <Createpost/>
      <div className="posts">
        <ul className="posts-list">
          {data.map((post) => {
            <li>{post.body}</li>
          })}
        </ul>
      </div>
    </div>
  );
};

export default News;
