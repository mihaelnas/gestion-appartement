const {addUser, getAllUsers , updateUserById , deleteUserById} = require("../models/userModel")

const createUser = async (req, res) => {
    try {
        console.log(req.body)
        console.log("Donnee recue :", req.body)
        const {design , loyer} = req.body
        if (!design || !loyer || isNaN(loyer) || loyer <= 0 ) {
            return res.status(400).json({message : "Tous les champs sont requis"})
        }

        const newUser = await addUser(design, loyer)
        res.status(201).json({ message: "Utilisateur ajoutee", user: newUser})
    }catch (error){
        res.status(500).json({ message: "Erreur serveur", error: error.message})
    }
}

const getUsers = async (req , res) => {
    try{
        const users = await getAllUsers()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message})
    }
}

const updateUser = async (req, res) => {
    const {id} = req.params
    const {design,loyer} = req.body

    if (!design || !loyer ) {
        return res.status(400).json({ message: "Tous les champs sont requis"})
    }

    try {
        const updateUser = await updateUserById(id , design , loyer )
        if(!updateUser) {
            return res.status(400).json({ message: "Utilisateur non trouvee"})
        }
        res.json({message: "Utilisateur mise a jour", user: updateUser})
    } catch (error){
        res.status(500).json({ message: "Erreur serveur", error: error.message})
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params

    try {
        const isDeleted = await deleteUserById(id)
        if (!isDeleted){
            return res.status(404).json({message: "utilisateur non trouvee"})
        }
        res.json({ message: "Utilisateur supprimee"})
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message})
    }
}

module.exports = {createUser, getUsers, updateUser , deleteUser}