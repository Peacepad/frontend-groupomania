import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Like = ({ post, playOnce, setPlayOnce }) => {
 
  
 

  const token = localStorage.getItem("token");

  // --------------------- Mettre un like
  const like = (post_id) => {

    document.getElementById(`post-like__display-${post.post_id}`).classList.remove('like-anim');
    
    axios({
      method: "POST",
      url: `http://localhost:8000/api/like/${post_id}`,
      headers: {
        authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    }).then(() => {
      setPlayOnce(!playOnce);
      document.getElementById(`post-like__display-${post.post_id}`).classList.add('like-anim');
      
    });
  };

  


  return (
    <div className="post-like">
      <div className="post-like__display" id={`post-like__display-${post.post_id}`}>
        <FontAwesomeIcon icon={faThumbsUp} /> {post.listLike.length}
      </div>
      <div className="post-like__btn" onClick={() => like(post.post_id)}>
        <FontAwesomeIcon icon={faThumbsUp} className="post-like" /> J'aime
      </div>
    </div>
  );
};

export default Like;
