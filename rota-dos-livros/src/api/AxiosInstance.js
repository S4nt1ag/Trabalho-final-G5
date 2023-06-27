import axios from 'axios';

export const AxiosInstance = axios.create({
    //Colocar o seu id do PC
    // baseURL: "http://192.168.1.113:8080/api" //breno
    // baseURL: "http://192.168.1.4:8080/api"
     baseURL: "http://192.168.1.5:8080/api" //sant
    // baseURL: "http://192.168.10.107:8080/api" //allan
    // baseURL: "http://192.168.0.40:8080/api" //rodolpho
});