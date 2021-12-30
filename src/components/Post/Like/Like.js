import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Like = ({ post }) => {
  const [likeNumber, setLikeNumber] = useState();
  const [data, setData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const [likePut, setLikePut] = useState(0);

  const token = localStorage.getItem("token");

  // --------------------- Mettre un like
  const like = (post_id) => {
    axios({
      method: "POST",
      url: `http://localhost:8000/api/like/${post_id}`,
      headers: {
        authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    }).then(() => {
      setLikePut(likePut + 1);
    });
  };

  useEffect(() => {
    const getLike = () => {
      // -------------------- Récupérer les likes pour les post

      axios
        .get(`http://localhost:8000/api/post/${post.post_id}/likes`)
        .then((res) => {
      
          setLikeNumber(res.data);

          setPlayOnce(!playOnce);
         
        });
    };
    getLike();
  }, [likePut]);


  return (
    <div className="post-like">
      <span className="post-like__display">
        <FontAwesomeIcon icon={faThumbsUp} /> {likeNumber}
      </span>
      <span className="post-like__btn" onClick={() => like(post.post_id)}>
        <FontAwesomeIcon icon={faThumbsUp} className="post-like" /> J'aime
      </span>
    </div>
  );
};

export default Like;
