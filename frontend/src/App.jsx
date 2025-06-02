import { useEffect, useState } from "react";
import React from "react";
import UserForm from "./components/UserForm";
import Navbar from "./components/navbar";
import { ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import UserTable from "./components/UserTable";
import { fetchUsers} from "./services/api"
import "./styles/Navbar.css"
import "./App.css"
import LoyerChart from "./components/LoyerChart";

function App() {
  const [showForm, setShowForm] = useState(false)
  const [users , setUsers] = useState([])
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
        try {
            const data = await fetchUsers();
            if (data && Array.isArray(data)) {
                setUsers(data);
            } else {
                setUsers([]); 
            }
        } catch (error) {
            console.error("Erreur lors du chargement des utilisateurs :", error);
        }
    };
    loadUsers();
}, [users]);

  

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000}/>
      <Navbar onAddClick={() => {setShowForm(true); setEditingUser(null);}}/>
      {showForm && <UserForm setUsers={setUsers}
      onClose={() => setShowForm(false)}
      editingUser={editingUser} 
      />}
      <UserTable users={users} setUsers={setUsers}   onEdit={(user) => { 
      setEditingUser(user);  
      setShowForm(true); 
  }} />
      <LoyerChart users={users} />
    </div>
  )
}

export default App;