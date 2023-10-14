import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal';
import '../Styles/InicioSesion.css';

function InicioSesion({app}) {
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cedula, setCedula] = useState('');
  const [username, setUsername] = useState('');
  const [genero, setGenero] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [proposito, setProposito] = useState("");
  const Superusuario=false;
  const rutina = ''

  const handleRegistroClick = async () => {
    const user = auth.currentUser;

    if (!cedula || !username) {
      alert('Por favor, completa todos los campos antes de registrarte.');
      return;
    }


    if (user) {
      const userRef = ref(db, 'usuarios/' + user.uid);
      const userData = {
        nombre: nombre,
        email: email,
        cedula: cedula,
        username: username,
        genero: genero,
        edad: edad,
        peso: peso,
        altura: altura,
        proposito: proposito,
        Superusuario : Superusuario,
        rutina : rutina
      };
      await set(userRef, userData);
      signInWithGoogle();
    }
  };

  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getDatabase(app);
  const googleAuthProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const userRef = ref(db, 'usuarios/' + user.uid);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        get(userRef)
        .then((snapshot) => {
          const userData = snapshot.val();
          const Admin = userData.Superusuario
          if (Admin) {
            navigate('/super')
          }else{
            navigate('/bienvenido');
          }
        })
        .catch((error) => {
          console.error('Error al obtener los datos del usuario:', error);
        });
        navigate('/bienvenido');
      } else {
        setNombre(user.displayName || '');
        setEmail(user.email || '');
        setShowModal(true)
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  const customStyles = {
    content: {
      width: '70%',
      maxWidth: '700px',
      margin: 'auto',
    },
  };
  return (
    <div className="container mt-5 mi_clase">
      <div className="row justify-content-left">
        <div className="col-md-6">
          <div className="card" style={{ width: '21rem'}}>
            <div className="card-body">
              <h5 className="card-title">¡Bienvenido!</h5>
              <p>
                nombre y sus entrenadores han entrenado a cualquier tipo de persona.
                Sin importanr sus limitaciones y posibles problemas de salud.
                Somos fieles creyentes que todo el mundo merece el chance de estar saludable y nuestra meta como compañía es ayudarte
                a conseguir TUS metas. No importa qué nivel de entrenamiento tengas, nosotros nos acomodamos a ti!
                nombre DIFERENTE A LOS DEMÁS
                nombre es diferente porque no nos consideramos ser solo una compañía de entrenamiento personal.
                Enfocándonos en nuestros clientes nos aseguramos que todo el mundo esté recibiendo un entrenamiento experto y
                personalizado. Ningún cliente recibe el mismo entrenamiento, pero todos reciben la misma atención y cariño e importancia
              </p>
              <button
                className="btn btn-outline-primary btn-block custom-button"
                onClick={signInWithGoogle}
              >
                <img
                  src="/images/google.png"
                  alt="Sign in with Google"
                  style={{
                    width: '40px',
                    height: '40px',
                    marginRight: '10px',
                    verticalAlign: 'middle'
                  }} />
                Iniciar sesión con Google
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        style={customStyles}
        onRequestClose={() => setShowModal(false)}
      >
        <h2>¡Bienvenido! Por favor, completa tus datos:</h2>
        <form>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo:</label>
                  <input
                    type="text"
                    id="nombre"
                    className="form-control"
                    value={nombre}
                    required={true}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="cedula">Cédula:</label>
                  <input
                    type="number"
                    id="cedula"
                    className="form-control"
                    value={cedula}
                    required={true}
                    onChange={(e) => setCedula(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    required={true}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-lg font-bold mb-4">Selecciona tu género:</label>
                  <button
                    type="button"
                    onClick={() => setGenero("Masculino")}
                    className={`btn btn-primary custom-margin-right`}
                  >
                    Masculino
                  </button>
                  <button
                    type="button"
                    onClick={() => setGenero("Femenino")}
                    className={`btn btn-primary custom-margin-right`}
                  >
                    Femenino
                  </button>

                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="edad">Edad:</label>
                  <input
                    type="number"
                    id="edad"
                    className="form-control"
                    value={edad}
                    required={true}
                    onChange={(e) => setEdad(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="peso">Peso (kg):</label>
                  <input
                    type="number"
                    id="peso"
                    className="form-control"
                    value={peso}
                    required={true}
                    onChange={(e) => setPeso(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="altura">Altura (cm):</label>
                  <input
                    type="number"
                    id="altura"
                    className="form-control"
                    value={altura}
                    required={true}
                    onChange={(e) => setAltura(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="altura">Proposito del entrenamiento:</label>
                  <input
                    type="text"
                    id="proposito"
                    className="form-control"
                    value={proposito}
                    onChange={(e) => setProposito(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="container-button">
            <div className="button-container">
              <button type="button" className="btn btn-primary" onClick={handleRegistroClick}>
                Siguiente
              </button>
            </div>
          </div>
        </form>
      </Modal>

    </div>
  );
}

export default  InicioSesion;