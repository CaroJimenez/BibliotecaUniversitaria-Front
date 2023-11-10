import './App.css';
import React, { useState } from 'react';

function App() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const handleClick = () => {
    console.log('Iniciar sesión');
    // Puedes agregar lógica adicional aquí
  };
  
  return (
    <div className="App">
      <header className="App-header">
      <img src='/libro.png'/>
        <div className='form'>
          <div className='textContainer'>
          <a className='text'>Correo</a>
          </div>
          <div className='inputContainer'>
            <input></input>
          </div>
          <div className='passwordContainer'>
          <a className='text'>Contraseña</a>
          </div>
          <div className='inputContainer'>
          <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder='Contraseña'
            />
          <button onClick={togglePasswordVisibility}>
              {passwordVisible ? 'Ocultar' : 'Mostrar'}
            </button>
          
            
          </div>
          <div className='buttonContainer'>
          <button className='buttonLogin' onClick={handleClick}>Iniciar sesión</button>
          </div>

          <div className='linkContainer'>
          <a className='textLink'>¿Olvidaste tu contraseña?</a>
          </div>
          <a className='textLink'>Registrarse</a>
          

        </div>
      </header>
    </div>
  );
}

export default App;
