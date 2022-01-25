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

import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import Comment from "./Comment/Comment";

const Posts = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  
  const [playOnce, setPlayOnce] = useState(true);
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));

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
        setUpdateElement(!updateElement);
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

  // ------------- EditPost ----------------------------

  const editPost = (post) => {
    const postId = post.post_id;

    // Envoyer la mise à jour
    const onEdit = async () => {
      const token = localStorage.getItem("token");

      let editData = new FormData(); //formdata object

      editData.append("userId", token);
      editData.append("edit-text", data.text);
      editData.append("image", selectedFile);

      axios({
        method: "put",
        url: `http://localhost:8000/api/post/${postId}`,
        data: editData,
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

      setPlayOnce(!playOnce);
      setUpdateElement(!updateElement);
      closeEdit();
    };

    // fermer l'Edition --------
    function closeEdit() {
      ReactDOM.hydrate(
        closeEditPost,
        document.getElementById(`post-card__edit${postId}`)
      );
    }

    // Ouvrir l'Edition --------
    function openEdit(post) {
      ReactDOM.hydrate(
        editPost,
        document.getElementById(`post-card__edit${postId}`)
      );
    }

    const editPostDom = (
      <div className="edit-post__container">
        <div className="edit-post__close" onClick={() => closeEdit()}>
          x
        </div>
        <form className="edit-post__form" onSubmit={handleSubmit(onEdit)}>
          <input className="edit-post__body" {...register("edit-text")}></input>
          <input type="file" {...register("edit-image")} />
          <input type="submit" className="edit-post__btn"></input>
        </form>
      </div>
    );

    const editPost = React.createElement("div", { postId }, editPostDom);
    const closeEditPost = React.createElement("div", { postId }, null);

    openEdit(post);
  };

  // Afficher la date sous le bon format

  const showDate = (post) => {
    let mySqlDate = post.post_date;

    let mySqlDate2 = mySqlDate.replace("T", " ");
    let mySqlDate3 = mySqlDate2.replace("Z", "");

    let t = `${mySqlDate3}`.split(/[- :]/);

    let mouths = [
      "janvier",
      "fevrier",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "aout",
      "septembre",
      "obtobre",
      "novembre",
      "décembre",
    ];
    let selectedMouth = parseInt(t[1]);
    let goodMouth = mouths[selectedMouth];

    let correctDate = `Le ${t[3]} ${goodMouth} ${t[0]} à ${t[3]}h${t[4]}`;

    return correctDate;
  };

  // Afficher l'espace pour commenter

  const showSendComment = (post) => {
    const showCommentDOM = document.getElementById(
      `comment-container__${post.post_id}`
    );

    if (showCommentDOM.style.display == "flex") {
      if (document.getElementById(`comment-container__${post.post_id}`)) {
        const showCommentDOM = document.getElementById(
          `comment-container__${post.post_id}`
        );
        showCommentDOM.style.display = "none";
      }
    } else {
      if (document.getElementById(`comment-container__${post.post_id}`)) {
        const showCommentDOM = document.getElementById(
          `comment-container__${post.post_id}`
        );
        showCommentDOM.style.display = "flex";
      }
    }
  };

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
            <li key={post.post_id} id={post.post_id} className="post-list__li">
              <div className="post-card">
                <div id={`post-card__edit${post.post_id}`}></div>

                {userData.userId == post.post_user_id && (
                  <div className="post-edit">
                    <Popover
                      className="post-edit"
                      position={Position.BOTTOM_RIGHT}
                      content={({ close }) => (
                        <Menu>
                          <Menu.Group>
                            <Menu.Item
                              icon={EditIcon}
                              intent="success"
                              onClick={() => {
                                editPost(post);
                                close();
                              }}
                            >
                              Éditer...
                            </Menu.Item>
                            <Menu.Item
                              icon={TrashIcon}
                              intent="danger"
                              onClick={() => deletePost(post.post_id)}
                            >
                              Supprimer...
                            </Menu.Item>
                          </Menu.Group>
                        </Menu>
                      )}
                    >
                      <Button className="post-edit__btn">
                        <FontAwesomeIcon icon={faEllipsisH} />
                      </Button>
                    </Popover>
                  </div>
                )}

                <div className="post-info">
                  <div className="post-info__avatar">
                    {post.user_imageURL ? (
                      <img
                        src={post.user_imageURL}
                        alt="avatar de l'utilisateur"
                      />
                    ) : (
                      <Avatar
                        name={post.firstname + " " + post.lastname}
                        size={40}
                      />
                    )}
                  </div>
                  <div className="post-info__about">
                    <div className="post-info__name">
                      {post.firstname + " " + post.lastname}
                    </div>

                    <div className="post-info__date">{showDate(post)}</div>
                  </div>
                </div>
                <div className="post-body" id={"post-body__" + post.post_id}>
                  {post.post_body}
                  {postBodyDiv}
                </div>

                <div className="post-image">
                  {post.post_imageURL != null && (
                    <img src={post.post_imageURL} alt="image du Post" />
                  )}
                </div>

                <div className="post-interact">
                  <Like post={post} />

                  <div className="post-comment">
                    <div className="post-comment__display">
                      <FontAwesomeIcon icon={faComment} />
                      {post.listComment.length}
                    </div>

                    <div
                      className="post-comment__btn"
                      onClick={() => showSendComment(post)}
                    >
                      <FontAwesomeIcon icon={faComment} /> Commenter
                    </div>
                  </div>
                </div>
              </div>

              <Comment post={post} setPlayOnce={setPlayOnce}/>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Posts;
