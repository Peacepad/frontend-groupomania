import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  Popover,
  Menu,
  Position,
  EditIcon,
  TrashIcon,
  Button,
} from "evergreen-ui";

const Posts = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);

  useEffect(() => {
    if (playOnce) {
      axios.get("http://localhost:8000/api/post").then((res) => {
        setData(res.data);
        setPlayOnce(false);
      });

      const sortedPost = () => {
        const postObj = Object.keys(data).map((i) => data[i]);
        const sortedArray = postObj.sort((a, b) => {
          return b.post_id - a.post_id;
        });
        setSortedData(sortedArray);
        console.log(sortedArray);
      };
      sortedPost();
    }
  }, [data, playOnce]);

  return (
    <div className="Posts">
      <ul className="post-list">
        {sortedData.map((post) => (
          <li key={post.post_id}>
            <div className="post-card">
              <div className="post-edit">
                <Popover
                  className="post-edit"
                  position={Position.BOTTOM_LEFT}
                  content={
                    <Menu>
                      <Menu.Group>
                        <Menu.Item icon={EditIcon} secondaryText="⌘R">
                          Modifier
                        </Menu.Item>
                      </Menu.Group>
                      <Menu.Divider />
                      <Menu.Group>
                        <Menu.Item disabled icon={TrashIcon} intent="danger">
                          Supprimer...
                        </Menu.Item>
                      </Menu.Group>
                    </Menu>
                  }
                >
                  <Button className="post-edit__btn">
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </Button>
                </Popover>
              </div>

              <div className="post-user">
                <Avatar name={post.firstname + " " + post.lastname} size={40} />
              </div>
              <div className="post-body">{post.body}</div>
              <div className="post-image">
                {post.imageURL != null && (
                  <img src={post.imageURL} alt="image du Post" />
                )}
              </div>

              <div className="post-review">
                <div className="post-review__likes">
                  <p>
                    0 <FontAwesomeIcon icon={faThumbsUp} />
                  </p>
                </div>
                <div className="post-review__comment">
                  <p>
                    0 <FontAwesomeIcon icon={faComment} />
                  </p>
                </div>
              </div>

              <div className="post-interact">
                <div className="post-interact__like">
                  <p>
                    <FontAwesomeIcon icon={faThumbsUp} className="post-like" />{" "}
                    J'aime
                  </p>
                </div>

                <div className="post-interact__comment">
                  <p>
                    <FontAwesomeIcon icon={faComment} /> Commenter
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
