import React, { useState } from 'react';
import { getAuth,signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from './Nav';
import { getDatabase, ref, get } from 'firebase/database';

function Bienvenido({app}) {

  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const db = getDatabase(app);
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;

  const userRef = ref(db, 'usuarios/' + userId);

  get(userRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      console.log('OEEE', userData)
      setUserData(userData);
    } else {
      console.log('El usuario no existe en la base de datos.');
    }
  })
  .catch((error) => {
    console.error('Error al obtener los datos del usuario:', error);
  });

  async function handleSignOut() {
    try {
      await signOut(auth); // Cierra sesión utilizando la función signOut de Firebase
      navigate('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  return (
    <div>
      <Navbar/>
      <p>Nombre: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <p>Cédula: {userData ? userData.cedula || 'No disponible' : 'Cargando...'}</p>
      <p>Altura: {userData ? userData.altura || 'No disponible' : 'Cargando...'}</p>
      <p>Proposito: {userData ? userData.proposito || 'No disponible' : 'Cargando...'}</p>
      <p>rutina asignada: {userData ? userData.rutina || 'No disponible' : 'Cargando...'}</p>
      <button onClick={handleSignOut}>Cerrar sesión</button>
    </div>
  );
}

export default Bienvenido;
