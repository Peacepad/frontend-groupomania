import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";

import Createpost from "../components/Createpost";

const News = () => {
  

  return (
    <div>
      <Header />
      <Createpost/>
      <Posts/>
        
    
    </div>
  );
};

export default News;
