import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    //const carnetAdmin=
    const [carnet, setCarnet] = useState(''); 
    const [pass, setPass] = useState(''); 
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault(); 

        if (carnet === '12024' && pass === 'ipc1') {
            alert('Bienvenido Administrador');
            navigate('/admin'); // Redirigir a /admin
            return; // Termina aquí si es administrador
          }
      
          // Si no es administrador, intentar iniciar sesión con el servidor
          try {
            const response = await fetch('http://localhost:5000/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    carnet: carnet,  // Asegúrate de enviar el carnet correcto
                    password: pass,  // Asegúrate de enviar la contraseña correcta
                }),
            });
    
            const data = await response.json();
    
            if (!data.error) {
                alert(data.mensaje);
                // Almacena el carnet en las cookies para usarlo más adelante
                
    
                // Redirige a la siguiente página si el inicio de sesión es exitoso
                navigate('/create');
            } else {
                // Muestra el mensaje de error si el inicio de sesión falla
                alert(data.mensaje);
            }
    
        } catch (error) {
            console.log('Error en la solicitud', error);
            // Muestra un mensaje de error si algo sale mal
            alert('Hubo un error con el inicio de sesión. Intenta de nuevo.');
        }
    };




    return (

        <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
        <div className="form-signin bg-body-tertiary" style={{ width: '100%', maxWidth: '400px', borderRadius: "20px", padding: '30px' }}>
    
            <form onSubmit={handleSubmit}>
                <img 
                    className="mb-4" 
                    src="https://seeklogo.com/images/U/usac-logo-87DDCE2742-seeklogo.com.png?v=638231122380000000" 
                    alt="" 
                    width="72" 
                    height="72" 
                    style={{ borderRadius: '70px', marginBottom: '30px' }}
                />
                <h1 className="h3 mb-3 fw-normal" style={{ marginBottom: '30px' }}>Incio de Sesion</h1>
    
                <div className="form-floating" style={{ marginBottom: '20px' }}>
                    <input 
                        required 
                        type="text" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="name@example.com" 
                        value={carnet} 
                        onChange={(e) => setCarnet(e.target.value)} 
                    />
                    <label htmlFor="floatingInput" style={{ color: 'gray' }}>CUI/Registro académico</label>
                </div>
    
                <div className="form-floating" style={{ marginBottom: '30px' }}> 
                    <input 
                        required 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword" 
                        placeholder="Password" 
                        value={pass} 
                        onChange={(e) => setPass(e.target.value)} 
                    />
                    <label htmlFor="floatingPassword" style={{ color: 'gray' }}>Contraseña</label>
                </div>
    
                <button 
                    className="btn btn-primary w-100 py-2" 
                    type="submit" 
                    style={{ marginBottom: '20px' }} 
                >
                    Iniciar sesión
                </button>                
            </form>
    
            <p className="mt-3 mb-0 text-center" style={{ marginBottom: '20px' }}> 
                ¿Aun no tienes una cuenta? 
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/registro')}>Regístrate aquí</button>.
            </p>
    
            <p className="mt-3 mb-0 text-center">
                ¿Olvidaste tu contraseña? 
                <a href="#" onClick={() => navigate('/registro')}>Recuperar contraseña</a>.
            </p>
        </div>
    </div>


    );

};

export default Login;