import axios from "axios";

export const GET_USER = "GET_USER";

export const getUser = (uid) => {
    return (dispatch) => {
        return axios({
            method: "get",
            url: `http://localhost:8000/api/user/${uid}`,
            headers: {'authorization': 'Bearer ' + localStorage.getItem('token')}
        })
        .then((res) => {
            dispatch({ type: GET_USER, payload: res.data 
            })
        })
            .catch((err) => console.log(err));
        }

        
    }
