import axios from "axios";

export const login = async (email, password) => {
    const result = await axios.post('http://localhost:8140/login', { email, password }, { withCredentials: true });

    return result;

}

// function login(email, password) {
//     axios({
//         url: "http://localhost:8140/login",
//         method: "POST",
//         withCredentials: true, // 서로다른 도메인에 요청시 여부
//         data: {
//             email: email,
//             password: password
//         },
//     }).then((result) => {
//         return result.data;
//     }).catch((error) => {
//         console.log(error);
//     })
// }

// export default login;