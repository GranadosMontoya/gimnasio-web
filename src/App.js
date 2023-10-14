import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import InicioSesion from './components/InicioSesion';
import Bienvenido  from './components/Bienvenido';
import SuperComponent from './components/SuperComponent';

const firebaseConfig = {
  apiKey: "AIzaSyDrgO7FMRXeE1czdeECaWoWNMv3wNFNlY8",
  authDomain: "gimnasio-120a3.firebaseapp.com",
  projectId: "gimnasio-120a3",
  storageBucket: "gimnasio-120a3.appspot.com",
  messagingSenderId: "232780247572",
  appId: "1:232780247572:web:3635fd33f6fea75ba92d01"
};


const app = initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<InicioSesion app={app}/>} />
          <Route path="/bienvenido" element={<Bienvenido app={app}/>} />
          <Route path="/super" element={<SuperComponent/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
