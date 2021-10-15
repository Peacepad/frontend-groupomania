import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import News from "./pages/News";
import { UidContext } from "./components/AppContext.js";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/userActions";
import axios from "axios";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchId = async () => {
      if (localStorage.getItem("token")) {
        axios({
          method: "get",
          url: "http://localhost:8000/api/user/getid",
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((res) => {
            setUid(res.data);
          })
          .catch((err) => console.log("no token"));
      }
    };

    fetchId();

    if (uid) dispatch(getUser(uid));
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/" component={News} />
        </Switch>
      </BrowserRouter>
    </UidContext.Provider>
  );
}

export default App;
