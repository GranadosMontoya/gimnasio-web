import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

function SuperComponent() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rutina, setRutina] = useState('');
  const [showModal, setShowModal] = useState(false);

  async function handleSignOut() {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      const userRef = ref(db, 'usuarios');
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          // Convierte los datos de usuarios a un array
          const userList = Object.keys(usersData).map((uid) => {
            return {
              uid,
              ...usersData[uid],
            };
          });
          setUsers(userList);
        }
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    }

    fetchUsers();
  }, [db]);

  const handleAsignarRutina = (user) => {
    // Aquí puedes abrir el modal y configurar el usuario seleccionado
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleGuardarRutina = async () => {
    // Actualizar la clave rutina del usuario seleccionado
    if (selectedUser) {
      const userRef = ref(db, `usuarios/${selectedUser.uid}`);
      await set(userRef, {
        ...selectedUser,
        rutina,
      });
      setShowModal(false);
    }
  };

  return (
    <div>
      <div className="row justify-content-left">
        <div className="col-md-6">
          <div className="card" style={{ width: '21rem' }}>
            <div className="card-body">
              <h5 className="card-title">¡Bienvenido!</h5>
              <p>Señor Granados, eres un super usuario</p>
              <button onClick={handleSignOut}>Cerrar sesión</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.nombre} - {user.cedula}
              <button onClick={() => handleAsignarRutina(user)}>Asignar Rutina</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <h2>Asignar Rutina</h2>
          <textarea
            value={rutina}
            onChange={(e) => setRutina(e.target.value)}
          />
          <button onClick={handleGuardarRutina}>Guardar Rutina</button>
        </Modal>
      </div>
    </div>
  );
}

export default SuperComponent;
