import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useHistory} from "react-router-dom";


const Login = () => {

  let history = useHistory();
  //Erreurs du formulaire
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Afficher un message d'erreur lorsque le serveur renvoi 401
  const [responseServer, setResponseServer] = useState('');
  const sayResponse = () => {
    setResponseServer(`Mot de ou passe ou Utilisateur incorrect`);
  };

  //Envoyer données formulaires
  const onSubmit = async (loginData) => {
    fetch("http://localhost:8000/api/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error('ça marche pas')
        }
        else{
          history.push('/')
        }
        return response.json();
      })
      .then((dataFromServer) => {
        localStorage.setItem("userId", dataFromServer.token);

      })
      .catch(() => {
        sayResponse();
      });
  };




  return (
    <main className="auth">
      <div className="logo-globe"><img src="./img/icon.png" alt="logo-globe" /></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          id="login__email"
          defaultValue="test@gmail.com"
          placeholder="Adresse Email"
          name="email"
          {...register("email", {
            required: "Vous devez préciser une adresse email.",
          })}
        />
        {errors.email && (
          <span className="invalid-feedback">{errors.email.message}</span>
        )}
        <input
          type="password"
          defaultValue="test884P"
          id="login__password"
          placeholder="Mot de passe"
          name="password"
          {...register("password", {
            required: "Vous devez préciser un mot de passe.",
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
              message:
                "Le mot de passe doit contenir 1 majuscule, 1 minuscule, 1 chiffre et 8 caractères minimum.",
            },
          })}
        />
        {errors.password && (
          <span className="invalid-feedback">{errors.password.message}</span>
        )}
        <span className="invalid-feedback">{responseServer}</span>
        <input type="submit" id="login__submit"></input>
      </form>
      <div className="more__auth">
        <p>Nouveau sur Groupomania? <Link to ="/signup" className="bluelink">Créer un compte.</Link></p>
        
      </div>
    </main>
  );
};

export default Login;
