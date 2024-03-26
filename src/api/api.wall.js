import axios from "./axios"



export const getWall = async () => {
    return await axios.get(`wall/getkeys`)
}

export const profileUpload = async (data) => {
    return await axios.post(`wall/profilepic`, data),
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
}

export const wallUpload = async (data) => {
    for (const pair of data.entries()) {
        console.log(pair[0], pair[1]);
    }
    return await axios.post(`wall/upload`, data),
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
}

export const wallDelete = async (key) => {
    return await axios.delete(`wall/delete`, {params:{key:key}})
}
