import axios from "axios";

export function fetchUserById(userId: string, cancelToken: any) {
    return axios.get(`/api/users/${userId}`, { cancelToken })
}