import React, { useState } from 'react'; 
import Sidebar from './sideBar';

const Postear = () => {
  const [formData, setFormData] = useState({
    descripcion: '',
    curso: '',
    catedratico:'',
  });
// Manejar cambios en los select

//para envier al posteo a back
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/publicar', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carnet:  Cookies.get('usuario'), 
                                curso: formData.curso,
                                catedratico: formData.catedratico,
                                texto:formData.descripcion}),
      })


    

      const data = await response.json();

      console.log(data)
      alert(data.mensaje)

    } catch (error) {

      console.log("Error en la solicitud", error);

    }
    
  };

  return (
    <div className="App">
      <Sidebar activeWindow="Postear" />
      <div className="content" style={{ width: '1000px' }}>
        <div className="container mt-5 bg-body-tertiary p-4" style={{ width: '100%', maxWidth: '1200px', borderRadius: '20px' }}>
          <h2>Crear un nuevo post</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripción del post (Obligatorio)</label>
              <textarea
                className="form-control"
                id="descripcion"
                name="descripcion"
                value={formData.descricion}
                style={{ border: '2px solid #00bfff', borderRadius: '5px' }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="curso" className="form-label">Curso(Obligatorio)</label>
              <select
                className="form-select"
                id="curso"
                name="curso"
                value={formData.curso}
                style={{ border: '2px solid #00bfff', borderRadius: '5px' }}
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="Compiladores">Compiladores</option>
                <option value="Logica">Logica</option>
                <option value="Ingles">Ingles</option>
                <option value="IPC1">IPC1</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="catedratico" className="form-label">Curso(Obligatorio)</label>
              <select
                className="form-select"
                id="catedratico"
                name="catedratico"
                value={formData.curso}
                style={{ border: '2px solid #00bfff', borderRadius: '5px' }}
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="Jorge Ramirez">Jorge Ramirez</option>
                <option value="Claudia Contreras">Claudia Contrerass</option>
                <option value="Mateo Hernan">Mateo Hernan</option>
                <option value="Nicte Perez">Nicte Perez</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary">Publicar</button>
          </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Postear;