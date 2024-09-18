import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Sidebar from './sideBar';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [comentario, setComentario] = useState('');

  // Filtros
  const [cursoFilter, setCursoFilter] = useState('');
  const [catedraticoFilter, setCatedraticoFilter] = useState('');
  const [cursoSearch, setCursoSearch] = useState('');
  const [catedraticoSearch, setCatedraticoSearch] = useState('');
  const [personalID, setPersonalID] = useState('');
  const [error, setError] = useState('');
  const mockUsers = [
    { id: '12345', name: 'Juan Pérez', profile: '/profile/12345' },
    { id: '67890', name: 'Ana Martínez', profile: '/profile/67890' },
  ];

  const handleUserSearch = () => {
    const user = mockUsers.find((u) => u.id === personalID);
    if (user) {
      window.location.href = user.profile; // Redirigir al perfil
    } else {
      setError('Usuario no encontrado.');
    }
  };
  // Datos simulados
  const mockPosts = [
    {
      id: 1,
      curso: 'Compiladores',
      catedratico: 'Jorge Ramirez',
      text: 'Este es un post sobre Compiladores.',
      dateTime: '2024-09-15T10:30:00',
      likes: 5,
      comments: [
        { name: 'Estudiante 1', comment: 'Muy interesante', faculty: 'Ingeniería' }
      ],
    },
    {
      id: 2,
      curso: 'Lógica',
      catedratico: 'Claudia Contreras',
      text: 'Post sobre Lógica matemática.',
      dateTime: '2024-09-14T12:15:00',
      likes: 3,
      comments: [
        { name: 'Estudiante 2', comment: 'Me encanta este tema', faculty: 'Matemáticas' }
      ],
    },
  ];

  useEffect(() => {
    const sortedPosts = mockPosts.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)); // Ordenar por fecha
    setPosts(sortedPosts);
    setFilteredPosts(sortedPosts);
    setShowComments(Array(sortedPosts.length).fill(false)); // Inicializa los comentarios ocultos
  }, []);

  const toggleComments = (index) => {
    const newShowComments = [...showComments];
    newShowComments[index] = !newShowComments[index];
    setShowComments(newShowComments);
  };

  const toggleLike = (post) => {
    const isLiked = likedPosts.includes(post.id);
    if (isLiked) {
      setLikedPosts(likedPosts.filter((id) => id !== post.id));
      post.likes -= 1; // Simula la acción de quitar "Me gusta"
    } else {
      setLikedPosts([...likedPosts, post.id]);
      post.likes += 1; // Simula la acción de dar "Me gusta"
    }
    setPosts([...posts]); // Actualiza los posts con los nuevos "Me gusta"
  };

  const handleChange = (event) => {
    setComentario(event.target.value);
  };

  const handleSubmit = (event, postId) => {
    event.preventDefault();
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        post.comments.push({
          name: 'Estudiante Actual',
          comment: comentario,
          faculty: 'Ingeniería'
        });
      }
      return post;
    });
    setPosts(updatedPosts);
    setComentario('');
  };

  // Función para aplicar filtros
  const applyFilters = () => {
    let filtered = posts;

    // Filtrar por curso seleccionable
    if (cursoFilter) {
      filtered = filtered.filter(post => post.curso === cursoFilter);
    }

    // Filtrar por catedrático seleccionable
    if (catedraticoFilter) {
      filtered = filtered.filter(post => post.catedratico === catedraticoFilter);
    }

    // Filtrar por búsqueda manual de curso
    if (cursoSearch) {
      filtered = filtered.filter(post => post.curso.toLowerCase().includes(cursoSearch.toLowerCase()));
    }

    // Filtrar por búsqueda manual de catedrático
    if (catedraticoSearch) {
      filtered = filtered.filter(post => post.catedratico.toLowerCase().includes(catedraticoSearch.toLowerCase()));
    }

    setFilteredPosts(filtered);
  };

  return (
    <div className="App" style={{ width: '100%', alignContent: 'center' }}>
      <Sidebar activeWindow="postList" />

      <div className="content" >
        <div className="container mt-5">


          <div className="row" style={{ marginLeft: '-100px' }}>

            <div className="col-md-3" style={{ backgroundColor: 'white', borderRadius: '10px', width: '300px' }}>
              {/* Sección de Filtros */}
              <div className="col-md-12" style={{  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',marginBottom: '30px', marginTop: "20px" ,border: '2px solid #00bfff',borderRadius:'20px'}}>
                <h3 style={{margin:'20px'}}>Búsqueda de Usuario por Registro Personal</h3>
                <Form inline style={{margin:'20px'}}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el Número de Registro Personal"
                      value={personalID}
                      onChange={(e) => setPersonalID(e.target.value)}
                      style={{ border: '2px solid #00bfff', borderRadius: '5px', marginRight: '10px' }}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleUserSearch} style={{margin:'20px'}}>
                    Buscar
                  </Button>
                </Form>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              </div>
              <div className="mb-4" style={{  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',marginBottom: '30px', marginTop: "20px" ,border: '2px solid #00bfff',borderRadius:'20px'}}>
                <h5 >Filtros</h5>
                <Form>
                  {/* Filtro por selección de Curso */}
                  <Form.Group controlId="formCursoSelect" style={{margin:'10px'}}>
                    <Form.Label >Filtrar por Curso (selección)</Form.Label>
                    <Form.Control
                      as="select"
                      value={cursoFilter}
                      onChange={(e) => setCursoFilter(e.target.value)}
                      style={{ border: '2px solid #00bfff', borderRadius: '5px' }}
                    >
                      <option value="">Selecciona un curso</option>
                      <option value="Compiladores">Compiladores</option>
                      <option value="Lógica">Lógica</option>
                      <option value="Inglés">Inglés</option>
                      <option value="IPC1">IPC1</option>
                    </Form.Control>
                  </Form.Group>

                  {/* Filtro por selección de Catedrático */}
                  <Form.Group controlId="formCatedraticoSelect" style={{margin:'10px'}}>
                    <Form.Label >Filtrar por Catedrático (selección)</Form.Label>
                    <Form.Control
                      as="select"
                      value={catedraticoFilter}
                      onChange={(e) => setCatedraticoFilter(e.target.value)}
                      style={{ border: '2px solid #00bfff', borderRadius: '5px' }}
                    >
                      <option value="">Selecciona un catedrático</option>
                      <option value="Jorge Ramirez">Jorge Ramirez</option>
                      <option value="Claudia Contreras">Claudia Contreras</option>
                      <option value="Mateo Hernan">Mateo Hernan</option>
                      <option value="Nicte Perez">Nicte Perez</option>
                    </Form.Control>
                  </Form.Group>

                  {/* Filtro por búsqueda manual de Curso */}
                  <Form.Group controlId="formCursoSearch" style={{margin:'10px'}}>
                    <Form.Label >Buscar por Nombre de Curso</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre del curso"
                      value={cursoSearch}
                      onChange={(e) => setCursoSearch(e.target.value)}
                      style={{ border: '2px solid #00bfff', borderRadius: '5px' }}
                    />
                  </Form.Group>

                  {/* Filtro por búsqueda manual de Catedrático */}
                  <Form.Group controlId="formCatedraticoSearch"  style={{margin:'10px'}}>
                    <Form.Label >Buscar por Nombre de Catedrático</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre del catedrático"
                      value={catedraticoSearch}
                      onChange={(e) => setCatedraticoSearch(e.target.value)}
                      style={{ border: '2px solid #00bfff', borderRadius: '5px' }}
                    />
                  </Form.Group>

                  <Button variant="primary" onClick={applyFilters}style={{marginBottom:'10px'}} className="mt-3">
                    Aplicar Filtros
                  </Button>
                </Form>
              </div>
            </div>
            <div className="col-md-9" style={{ width: '900px', marginLeft: '20px', borderRadius: '20px', backgroundColor: 'white', }}>
              <h2 >Lista de Posts</h2>
              {/* Listado de Posts */}
              {filteredPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="card mb-4"
                  style={{ borderRadius: '10px', padding: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', border: '2px solid #00bfff' }}
                >
                  <div className="card-body" style={{ padding: '20px' }}>
                    <h5 className="card-title">{post.curso}</h5>
                    <p className="card-text">{post.catedratico}</p>
                    <p className="card-text mt-2" style={{ fontSize: '18px', lineHeight: '1.5' }}>{post.text}</p>
                    <p className="card-text">
                      <small className="text-muted">Publicado el {new Date(post.dateTime).toLocaleString()}</small>
                    </p>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant={likedPosts.includes(post.id) ? 'success' : 'primary'}
                        onClick={() => toggleLike(post)}
                        style={{ padding: '10px 20px' }}
                      >
                        {likedPosts.includes(post.id) ? 'Quitar Me gusta' : 'Me gusta'} ({post.likes})
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => toggleComments(index)}
                        style={{ padding: '10px 20px' }}
                      >
                        Mostrar Comentarios ({post.comments.length})
                      </Button>
                    </div>
                    {showComments[index] && (
                      <div className="comments mt-4" style={{ paddingTop: '10px' }}>
                        <h6>Comentarios:</h6>
                        {post.comments.map((comment, idx) => (
                          <div key={idx} className="card mb-2" style={{ borderRadius: '5px' }}>
                            <div className="card-body" style={{ padding: '10px' }}>
                              <p><strong>{comment.name}</strong> ({comment.faculty})</p>
                              <p>{comment.comment}</p>
                            </div>
                          </div>
                        ))}
                        <div className="mb-3 mt-3">
                          <Form.Control
                            as="textarea"
                            rows={4}
                            value={comentario}
                            onChange={handleChange}
                            style={{ borderRadius: '5px', border: '1px solid #ccc' }}
                          />
                          <Button
                            variant="primary"
                            onClick={(event) => handleSubmit(event, post.id)}
                            className="mt-3"
                            style={{ padding: '10px 20px' }}
                          >
                            Enviar
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostList;