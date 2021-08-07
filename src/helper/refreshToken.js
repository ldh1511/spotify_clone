import { setRefreshToken } from '../apis/info';
const refreshToken = async (fn) => {
    let data = await setRefreshToken();
    localStorage.setItem('token', data.data.access_token);
    fn.map((item)=>item && item());
};
export default refreshToken;