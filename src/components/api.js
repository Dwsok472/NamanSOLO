import axios from "axios";

export async function UserLogin(username, password) {
    try {
        const response = await axios.post("", {
            username: username,
            password: password
        });
        return response.data; // 서버에서 반환한 데이터
    } catch (error) {
        console.error('Login error:', error);
        throw error; // 에러 처리
    }

}