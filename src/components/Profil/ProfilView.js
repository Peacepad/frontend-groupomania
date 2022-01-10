import React from 'react';
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ProfilImage from './ProfilImage';


const ProfilView = () => {

    const userData = useSelector((state) => state.userReducer);
    const { register, handleSubmit, reset } = useForm();

    return (
        <div>
            <ProfilImage />
            <div className='profil-info'>
                <form className='profil-edit'>
                    <label>Prénom
                <input
                type="text" placeholder={userData[0].firstname}
                {...register("firstname")}
                
              />
              </label>
              <label>Nom <input
                type="text" placeholder={userData[0].lastname}
                {...register("lastname")}
                
              /></label>

              <label>Email <input
                type="text" placeholder={userData[0].email}
                {...register("email")}
                
              /></label>

                </form>
            </div>
        </div>
    );
};

export default ProfilView;