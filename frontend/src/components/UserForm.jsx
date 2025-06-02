import {useState, useEffect} from "react";
import React from "react";
import { addUser, updateUser } from "../services/api";
import { toast } from "react-toastify";
import "../styles/UserForm.css"

const UserForm = ({  onClose, setUsers, editingUser}) => {
    const [userData, setUserData] = useState({design:"",loyer:""})

    useEffect(() => {
        if (editingUser) {
          setUserData(editingUser);  
        }
      }, [editingUser]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: name === "loyer" ? Number(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let result;
    
            if (editingUser) {
                result = await updateUser(editingUser.id, userData); // Met à jour l'utilisateur existant
                if (result) {
                    setUsers((prevUsers) =>
                        prevUsers.map((user) => (user.id === editingUser.id ? result : user))
                    );
                    toast.success("Utilisateur modifié avec succès !");
                }
            } else {
                result = await addUser(userData); // Ajoute un nouvel utilisateur
                if (result) {
                    setUsers((prevUsers) => [...prevUsers, result]);
                    toast.success("Utilisateur ajouté !");
                } else {
                    toast.error("Erreur: utilisateur non ajouté !");
                    return;
                }
            }
    
            onClose();
        } catch (error) {
            console.error("Erreur:", error);
            toast.error("Erreur: utilisateur non ajouté !");
        }


    }

    const handleOverlayClick = (event) => {
        if (event.target.classList.contains("overlay")){
            onClose()
        }
    }

    return (
        <div className="overlay" onClick={handleOverlayClick}>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>{editingUser ? "Modifier un utilisateur" : "Ajouter un utilisateur"}</h2>
                <input
                    type="text"
                    placeholder="Design"
                    name="design"
                    value={userData.design}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <input
                    type="number"
                    name="loyer"
                    placeholder="Loyer"
                    value={userData.loyer}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <button type="submit" className="form-button"> {editingUser ? "Modifier" : "Ajouter"}</button>

            </form>
        </div>
        
    )


}

export default UserForm