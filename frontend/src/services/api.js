import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/users";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {"Content-Type":"application/json"}
})

export const addUser = async (userData) => {
    try {
        const response = await api.post("/", userData);
        return response.data;
    }catch (error) {
        console.error("Erreur API :", error.response?.data || error.message)
        throw error
    }
}

export const getUsers = async () => {
    try {
        const response = await fetch(API_BASE_URL)
        if(! response.ok){
            throw new Error("Erreur lors de la recuperation des utilisateurs")
        }
        return await response.json()
    } catch (error){
        console.log(error)
        return []
    }
}

export const fetchUsers = async () => {
    try{
        const response = await axios.get(API_BASE_URL)
        return response.data
    } catch (error){
        console.error("Erreur lors de la recuperation des utilisateurs", error)
        throw error
    }
}

export const updateUser = async (id, updateUserData) =>{
    try{
        const response = await axios.put(`${API_BASE_URL}/${id}`, updateUserData)
        return response.data
    }catch (error){
        console.error("Erreur lors de la modification", error)
        throw error
    }
}

export const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`)
    }catch (error){
        console.error("Erreur lors de la suppression de l'utilisation", error)
        throw error
    }
}