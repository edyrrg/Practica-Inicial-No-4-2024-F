import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [carnetID, setCarnetID] = useState('');  // Agregar campo carnetID
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [pass, setPass] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3060/api/usuarios', {  // URL corregida
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carnetID: carnetID,            // Enviar carnetID
          nombres: nombres,              // Enviar nombres
          apellidos: apellidos,          // Enviar apellidos
          correo: correo,                // Enviar correo
          pass: pass                     // Enviar contraseña como 'pass'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registro exitoso');
        navigate('/Login');  // Redirige al usuario al iniciar sesión tras registrarse
      } else {
        alert('Error: ' + data.mensaje);
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
      alert('Hubo un error al registrar. Intenta de nuevo.');
    }
  };

  return (
    <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
      <div
        className='form-signin bg-body-tertiary'
        style={{ width: '100%', maxWidth: '600px', borderRadius: '20px', padding: '20px' }}
      >
        <form onSubmit={handleSubmit}>
          <div className='d-flex justify-content-center'>
            <img
              className='center-margin'
              src='https://e7.pngegg.com/pngimages/713/762/png-clipart-computer-icons-button-login-image-file-formats-logo.png'
              alt='Logo de Registro'
              width='72'
              height='57'
            />
          </div>
          <h1 className='h3 mb-3 fw-normal text-center'>Registro</h1>

          {/* Campo para ingresar el carnet */}
          <div className='form-floating' style={{ marginBottom: '15px' }}>
            <input
              required
              type='text'
              className='form-control'
              id='floatingCarnet'
              placeholder='Carnet'
              value={carnetID}
              onChange={(e) => setCarnetID(e.target.value)}
            />
            <label htmlFor='floatingCarnet'>Número de Carnet</label>
          </div>

          <div className='form-floating' style={{ marginBottom: '15px' }}>
            <input
              required
              type='text'
              className='form-control'
              id='floatingNombres'
              placeholder='Nombre'
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />
            <label htmlFor='floatingNombres'>Nombre</label>
          </div>

          <div className='form-floating' style={{ marginBottom: '15px' }}>
            <input
              required
              type='text'
              className='form-control'
              id='floatingApellidos'
              placeholder='Apellido'
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
            <label htmlFor='floatingApellidos'>Apellido</label>
          </div>

          <div className='form-floating' style={{ marginBottom: '15px' }}>
            <input
              required
              type='email'
              className='form-control'
              id='floatingCorreo'
              placeholder='Correo'
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <label htmlFor='floatingCorreo'>Correo</label>
          </div>

          <div className='form-floating' style={{ marginBottom: '15px' }}>
            <input
              required
              type='password'
              className='form-control'
              id='floatingPassword'
              placeholder='Contraseña'
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <label htmlFor='floatingPassword'>Contraseña</label>
          </div>

          <button className='btn btn-primary w-100 py-2' type='submit'>
            Registrarse
          </button>
        </form>

        <p className='mt-3 mb-0 text-center'>
          ¿Ya tienes una cuenta?{' '}
          <button
            className='btn btn-secondary btn-lg'
            onClick={() => navigate('/Login')}
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default Registro;
