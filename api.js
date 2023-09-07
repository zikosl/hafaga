import axios from "axios";

export const URL = 'http://10.0.2.2:4000/'
//export const URL = 'https://hafaga.app/'
export default axios.create({
    baseURL: URL
})
