import axios from 'axios';

const setAuthToken = token =>{
    if(token){
        //aplicar la autorizacion a todas las consultas is esta logeado
        axios.defaults.headers.authorization = token;
    }else{
        //Borramos las camebezar de la autorización 
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;