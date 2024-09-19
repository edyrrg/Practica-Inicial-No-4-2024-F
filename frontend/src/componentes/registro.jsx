import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPass] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/Registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          correo,
          password,
        }),
      });

      const data = await response.json();

      console.log(data);
      alert(data.mensaje);
    } catch (error) {
      console.error('Error en la solicitud', error);
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

          <div className='form-floating' style={{ marginBottom: '15px' }}>
            <input
              required
              type='text'
              className='form-control'
              id='floatingNombre'
              placeholder='Nombre'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <label htmlFor='floatingNombre'>Nombre</label>
          </div>

          <div className='form-floating' style={{ marginBottom: '15px' }}>
            <input
              required
              type='text'
              className='form-control'
              id='floatingApellido'
              placeholder='Apellido'
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
            <label htmlFor='floatingApellido'>Apellido</label>
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
              value={password}
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