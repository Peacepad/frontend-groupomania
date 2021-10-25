import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';


const Like = ({post}) => {


    

    return (
        <div>
            {post.likes} <FontAwesomeIcon icon={faThumbsUp} />
        </div>
    );
};

export default Like;