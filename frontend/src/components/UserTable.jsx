import "../styles/UserTable.css"
import {deleteUser } from "../services/api"
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from 'react-icons/fa';


const UserTable = ({users,setUsers, onEdit}) => {


    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
            const result = await deleteUser(id);
            if (result.success) {
                setUsers(users.filter(user => user.id !== id));
                console.log("Toast déclenché");
                toast.success("Utilisateur supprimé avec succès !");
            } else {
                toast.error("Échec de la suppression.");
            }
        }
    };

    const getObservation = (loyer) => {
        if (loyer < 1000) return "Bas";
        if (loyer >= 1000 && loyer <= 5000) return "Moyen";
        return "Élevé";
    };


    const totalLoyer = users.reduce((acc, user) => acc + user.loyer, 0);
    const minLoyer = users.length ? Math.min(...users.map(user => user.loyer)) : 0;
    const maxLoyer = users.length ? Math.max(...users.map(user => user.loyer)) : 0;

    return (
        <div className="user-table">
            <h2>Liste des appartements</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Design</th>
                        <th>Loyer</th>
                        <th>Observation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.design}</td>
                            <td>{user.loyer} Ar</td>
                            <td className={getObservation(user.loyer)}>{getObservation(user.loyer)}</td>
                            <td>
                                <button className="edit-btn" onClick={() => onEdit(user)}><FaEdit />Modifier</button>
                                <button className="delete-btn" onClick={() => handleDelete(user.id)}> <FaTrash />Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                        <tr>
                            <td colSpan="2"><strong>Total loyers :</strong></td>
                            <td><strong>{totalLoyer}Ar</strong></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><strong>Loyer minimal :</strong></td>
                            <td><strong>{minLoyer} Ar</strong></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><strong>Loyer maximal :</strong></td>
                            <td><strong>{maxLoyer} Ar</strong></td>
                            <td colSpan="2"></td>
                        </tr>
                </tfoot>
            </table>
        </div>
    )

}

export default UserTable