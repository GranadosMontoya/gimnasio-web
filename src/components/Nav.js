import React from 'react';
import { getAuth } from 'firebase/auth';
import '../Styles/Navbar.css'

function Navbar() {
    const auth = getAuth(); // Obtiene la instancia de autenticación
    return (
        <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
        <h5>Bienvenid@, {auth.currentUser.displayName}!</h5>
        <img src={auth.currentUser.photoURL} alt="Foto de perfil" className='imageUSer'/>
        </div>
        </nav>
    );
}

export default Navbar;
