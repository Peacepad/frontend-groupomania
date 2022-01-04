import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  Popover,
  Menu,
  Position,
  EditIcon,
  TrashIcon,
  Button,
} from "evergreen-ui";
import Like from "./Like/Like";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const Posts = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const token = localStorage.getItem("token");
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    function getData() {
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
        };
        sortedPost();
      }
    }
    getData();
  }, [data, playOnce]);

  function deletePost(post_id) {
    axios({
      method: "DELETE",
      url: `http://localhost:8000/api/post/${post_id}`,
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then(() => {
        setPlayOnce(!playOnce);
        setUpdateElement(!updateElement)
      })
      .catch(console.log("Le post n'a pas pu être supprimé"));
  }

  // Create Post

  // -------------- Afficher l'image choisie
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };
  // ------------

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    let formData = new FormData(); //formdata object

    formData.append("userId", token);
    formData.append("text", data.text);
    formData.append("image", selectedFile);

    axios({
      method: "post",
      url: "http://localhost:8000/api/post/create",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    reset();
    setPreview(undefined);
    setPlayOnce(!playOnce);
    setUpdateElement(!updateElement);
    setSelectedFile(undefined);
  };

  // ---------------- UpdatePost
  const [updateElement, setUpdateElement] = useState(false);

  let postBodyDiv;

  const updatePost = (post) => {
    setUpdateElement(!updateElement);
  }


    
  





  


  return (
    <React.Fragment>
      <div className="create-post__container">
        <form className="create-post" onSubmit={handleSubmit(onSubmit)}>
          <div className="create-post__edit">
            <textarea
              className="create-post__text"
              {...register("text", {
                required: "Vous devez écrire un message",
              })}
            ></textarea>

            {selectedFile && <img src={preview} alt="Aperçu du fichier" />}
          </div>

          <div className="create-post__btn-container">
            <div className="create-post__btn-img">
              <button className="create-post__btn">Ajouter une image</button>
              <input
                type="file"
                {...register("image")}
                onChange={onSelectFile}
              />
            </div>

            <input type="submit" className="create-post__btn"></input>
          </div>
        </form>
      </div>

      <div className="Posts">
        <ul className="post-list">
          {sortedData.map((post) => (
            <li key={post.post_id} id={post.post_id}>
              <div className="post-card">
                {userData[0].user_id == post.user_id && (
                  <div className="post-edit">
                    <Popover
                      className="post-edit"
                      position={Position.BOTTOM_LEFT}
                      content={
                        <Menu>
                          
                          <Menu.Group>
                            <Menu.Item
                              icon={TrashIcon}
                              intent="danger"
                              onClick={() => deletePost(post.post_id)}
                            >
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
                )}

                <div className="post-user">
                  <Avatar
                    name={post.firstname + " " + post.lastname}
                    size={40}
                  />
                </div>
                <div className="post-body" id={"post-body__" + post.post_id}>
                  {post.body}
                  {postBodyDiv}
                </div>

                <div className="post-image">
                  {post.imageURL != null && (
                    <img src={post.imageURL} alt="image du Post" />
                  )}
                </div>

                <div className="post-interact">
                  <Like post={post} />

                  <div className="post-comment">
                    <div className="post-comment__display">
                      <p>
                        0 <FontAwesomeIcon icon={faComment} />
                      </p>
                    </div>

                    <div className="post-interact__comment">
                      <p>
                        <FontAwesomeIcon icon={faComment} /> Commenter
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Posts;
