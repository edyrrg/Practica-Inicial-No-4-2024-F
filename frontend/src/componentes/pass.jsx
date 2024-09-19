import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pass = () => {
  const [carnet, setCarnet] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Realiza una petición GET a la API para obtener los usuarios
      const response = await fetch('http://localhost:3060/api/usuarios');
      const usuarios = await response.json();

      // Busca si el usuario con el carnet y correo proporcionado existe en la base de datos
      const usuarioValido = usuarios.find(
        user => user.nu_carnet === parseInt(carnet.trim()) && user.correo_electronico === correo.trim()
      );

      if (usuarioValido) {
        setIsVerified(true);
        setMensaje('Datos verificados. Ahora puede ingresar una nueva contraseña.');
      } else {
        setMensaje('El carnet o correo electrónico son incorrectos.');
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
      setMensaje('Hubo un problema al verificar los datos.');
    }
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMensaje('Las contraseñas no coinciden.');
      return;
    }

    try {
      // Realiza un PATCH a la API para actualizar la contraseña
      const response = await fetch('http://localhost:3060/api/reset_password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "carnet_id": carnet,
          "correo": correo,
          "new_pass": password
        }),
        redirect : "follow"
      });

  
      if (response.status==200) {
        setMensaje('Contraseña actualizada correctamente.');
        navigate('/login'); // Redirigir a /admin
      } else {
        setMensaje('Error al actualizar la contraseña.');
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
      setMensaje('Hubo un problema al actualizar la contraseña.');
    }
  };

  return (
    <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
      <div
        className='form-signin bg-body-tertiary'
        style={{ width: '100%', maxWidth: '600px', borderRadius: '20px', padding: '20px' }}
      >
        <h1 className='h3 mb-3 fw-normal text-center'>¿Olvidó su contraseña?</h1>

        {!isVerified ? (
          <form onSubmit={handleSubmit}>
            <div className='form-floating' style={{ marginBottom: '15px' }}>
              <input
                required
                type='text'
                className='form-control'
                id='floatingCarnet'
                placeholder='Carnet'
                value={carnet}
                onChange={(e) => setCarnet(e.target.value)}
              />
              <label htmlFor='floatingCarnet'>Carnet</label>
            </div>

            <div className='form-floating' style={{ marginBottom: '15px' }}>
              <input
                required
                type='email'
                className='form-control'
                id='floatingCorreo'
                placeholder='Correo Electrónico'
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <label htmlFor='floatingCorreo'>Correo Electrónico</label>
            </div>

            <button className='btn btn-primary w-100 py-2' type='submit'>
              Verificar datos
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset}>
            <div className='form-floating' style={{ marginBottom: '15px' }}>
              <input
                required
                type='password'
                className='form-control'
                id='floatingPassword'
                placeholder='Nueva Contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor='floatingPassword'>Nueva Contraseña</label>
            </div>

            <div className='form-floating' style={{ marginBottom: '15px' }}>
              <input
                required
                type='password'
                className='form-control'
                id='floatingConfirmPassword'
                placeholder='Confirma tu nueva contraseña'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor='floatingConfirmPassword'>Confirma tu nueva contraseña</label>
            </div>

            <button className='btn btn-success w-100 py-2' type='submit'>
              Restablecer Contraseña
            </button>
          </form>
        )}

        {mensaje && <p className='mt-3 text-center'>{mensaje}</p>}
      </div>
    </div>
  );
};

export default Pass;
