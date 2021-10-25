import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';  import { useSelector } from 'react-redux';
import { userReducer } from 'react';

const LikeButton = ({post}) => {
    const token = localStorage.getItem("token");
    const [liked, setLiked] = useState(false);
  
    const userData = useSelector((state) => state.userReducer);





    function like(post_id) {

        
        axios({
          method: "POST",
          url: `http://localhost:8000/api/like`,
          headers: {
            authorization: "Bearer " + token,
            "content-type": "application/json",
          },
          data: {
            postId: post_id,
            
          },
        });
      }


    
    return (
        <button onClick={() => like(post.post_id)}>
             <FontAwesomeIcon icon={faThumbsUp} className="post-like" />{" "}
                    J'aime
        </button>
    );
};

export default LikeButton;