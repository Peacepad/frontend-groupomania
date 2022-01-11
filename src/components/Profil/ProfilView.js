import React from 'react';
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ProfilImage from './ProfilImage';


const ProfilView = () => {

    const userData = JSON.parse(localStorage.getItem("userData"))
    const { register, handleSubmit, reset } = useForm();

    return (
        <div>
            <ProfilImage />
            <div className='profil-info'>
                <form className='profil-edit'>
                    <label>Prénom : <input
                type="text" defaultValue={userData.userFirstname}
                {...register("firstname")}
                
              />
              </label>
              <label>Nom : <input
                type="text" defaultValue={userData.userLastname}
                {...register("lastname")}
                
              /></label>

              <label>Email : <input
                type="text" defaultValue={userData.userEmail}
                {...register("email")}
                
              /></label>

                </form>
            </div>
        </div>
    );
};

export default ProfilView;