import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faImage } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Popover,
  Menu,
  Position,
  EditIcon,
  TrashIcon,
  Button,
} from "evergreen-ui";
import EditComment from "./EditComment";

const Comment = ({ post, playOnce, setPlayOnce }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { register, handleSubmit, setValue} = useForm({
    mode: "onChange",
  });

  const sendComment = async (data) => {
    const token = localStorage.getItem("token");

    let commentData = new FormData();

    const image = data.image[0];

    commentData.append("userId", token);
    commentData.append(`text`, data.text);
    commentData.append("postId", post.post_id);
    commentData.append("image", image);

    axios({
      method: "POST",
      url: `http://localhost:8000/api/comment/${post.post_id}`,
      data: commentData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Bearer " + token,
      },
    })
      .then(() => {
        setPlayOnce(!playOnce);
        setValue("text", "");
        document.getElementById(`comment-form__${post.post_id}`).reset();
        document.getElementById(`label-file__${post.post_id}`).style.backgroundColor = "rgb(239, 239, 239)";
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const deleteComment = (comment_id) => {
    const token = localStorage.getItem("token");
    axios({
      method: "DELETE",
      url: `http://localhost:8000/api/comment/${comment_id}`,
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then(() => {
        setPlayOnce(!playOnce);
        document.getElementById(`comment-form__${post.post_id}`).reset();
        document.getElementById(`label-file__${post.post_id}`).style.backgroundColor = "rgb(239, 239, 239)";
      })
      .catch(console.log("Le commentaire n'a pas pu être supprimé"));
  };

    // Afficher la date sous le bon format

    const showDate = (comment) => {
      let mySqlDate = comment.comment_date;
      
  
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
      let goodMouthNumber = parseInt(t[1]) - 1;
  
      let goodMouth = mouths[goodMouthNumber];
  
      let goodHour = parseInt(t[3]);
  
      let correctDate = `Le ${t[2]} ${goodMouth} ${t[0]} à ${goodHour}h${t[4]}`;
  
      return correctDate;
    };


    const showEditComment = (comment) => {
      const showEditCommentDOM = document.getElementById(
        `edit-comment-container__${comment.comment_id}`
      );
  
      const editCommentAreaDOM = document.getElementById(`edit-comment-body__${comment.comment_id}`);
  
      if (showEditCommentDOM.style.display === "flex") {
        if (document.getElementById(`edit-comment-container__${comment.comment_id}`)) {
          const showEditDOM = document.getElementById(
            `edit-comment-container__${comment.comment_id}`
          );
          showEditCommentDOM.style.display = "none";
          
          const editCommentBackgroundDOM = document.getElementById(
            `edit-comment-background__${comment.comment_id}`
          );
          editCommentBackgroundDOM.style.display = "none";
          
        }
      } else {
        if (document.getElementById(`edit-comment-container__${comment.comment_id}`)) {
          const showEditCommentDOM = document.getElementById(
            `edit-comment-container__${comment.comment_id}`
          );
          showEditCommentDOM.style.display = "flex";
         
          const editCommentBackgroundDOM = document.getElementById(
            `edit-comment-background__${comment.comment_id}`
          );
          editCommentBackgroundDOM.style.display = "flex";
          
        }
        if (editCommentAreaDOM) {
          // Mettre le focus à la fin du texte et non au début
          editCommentAreaDOM.focus();
  
          editCommentAreaDOM.selectionStart = editCommentAreaDOM.value.length;
        }
      }
    };

    const selectImage = () => {
      if(document.getElementById(`comment-image__${post.post_id}`))
      {const inputDOM = document.getElementById(`comment-image__${post.post_id}`);
      console.log("avant " + inputDOM.files[0]);

      inputDOM.addEventListener('change', () => {

        
        if(inputDOM.files[0] !== undefined){
          console.log("après " + inputDOM.files[0]);
          document.getElementById(`label-file__${post.post_id}`).style.backgroundColor = "#66FF99";
          }
        


      })
        
      
    }}


  return (
    <>
      <div
        className="comment-container"
        id={`comment-container__${post.post_id}`}
      >
        <form className="comment-form "id={`comment-form__${post.post_id}`} onSubmit={handleSubmit(sendComment)}>
          <textarea
            {...register(`text`)}
            placeholder="Ecrivez un commentaire ..."
            id={`commentForPost${post.post_id}`}
          ></textarea>

          <label className="label-file" id={`label-file__${post.post_id}`}>
            <FontAwesomeIcon icon={faImage} />
            <input
              type="file"
              className="comment-image"
              onFocus={selectImage(post.post_id)}
              id={`comment-image__${post.post_id}`}              {...register(`image`)}
              name="image"
            ></input>
          </label>

          <input type="submit"></input>
        </form>
      </div>

      <div className="comments">
        <ul className="comments-list">
          {post.listComment.sort((a, b) => a.comment_id - b.comment_id).map((comment) => (
            <li
              key={comment.comment_id}
              id={`comment-card${comment.comment_id}`}
              className={`comment-card`}
            >
              <EditComment comment={comment} setPlayOnce={setPlayOnce} />
              <div className="comment-user">
                {comment.comment_user_imageURL ? (
                  <img
                    src={comment.comment_user_imageURL}
                    alt="photo de profil de l'utilisateur"
                  />
                ) : (
                  <Avatar
                    name={
                      comment.comment_firstname + " " + comment.comment_lastname
                    }
                    size={40}
                  />
                )}
              </div>
              <div className="comment-body__container">
                <div className="comment-body">
                  <div className="comment-body__user">
                    <p>
                      {comment.comment_firstname +
                        " " +
                        comment.comment_lastname}
                    </p>
                  </div>
                  {comment.comment_body && <p>{comment.comment_body}</p>}
                </div>

                {comment.comment_imageURL && (
                  <img
                    src={comment.comment_imageURL}
                    alt="illustration du commentaire"
                  />
                )}
              </div>
              {userData.userId === comment.comment_user_id && (
                <div className="comment-edit">
                  <Popover
                    className="comment-edit"
                    position={Position.BOTTOM_RIGHT}
                    content={({ close }) => (
                      <Menu>
                        <Menu.Group>
                          <Menu.Item icon={EditIcon} intent="success" onClick={() => {showEditComment(comment); close()}}>
                            Éditer...
                          </Menu.Item>
                          <Menu.Item
                            icon={TrashIcon}
                            intent="danger"
                            onClick={() => deleteComment(comment.comment_id)}
                          >
                            Supprimer...
                          </Menu.Item>
                        </Menu.Group>
                      </Menu>
                    )}
                  >
                    <Button className="comment-edit__btn">
                      <FontAwesomeIcon icon={faEllipsisH} />
                    </Button>
                  </Popover>
                </div>
              )}

              <div className="comment-date">{showDate(comment)}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Comment;
