import React from "react";
import { useForm } from "react-hook-form";
import { FilePicker, TextInput, TextInputField } from "evergreen-ui";

const Createpost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="create-post__container">
      <form className="create-post">

      <textarea className="create-post__text"></textarea>
          <FilePicker className="create-post__file"
            multiple = {false}
            width={250}
            onChange={(files) => console.log(files)}
            placeholder="Select the file here!"
          />{" "}

      </form>
    </div>
  );
};

export default Createpost;
