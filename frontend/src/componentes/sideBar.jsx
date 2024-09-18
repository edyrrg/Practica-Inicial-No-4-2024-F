import React from 'react';
import { Link, } from 'react-router-dom';


const Sidebar = ({ activeWindow }) => {

    const handleSignOut = () => {
        // Lógica para cerrar sesión

        alert('Cerrando sesión...');


    };


    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
                <symbol id="perfil" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />

                </symbol>
                <symbol id="postList" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                </symbol>
                <symbol id="postear" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </symbol>


            </svg>


            <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary sidebar">
                <div className="nav nav-pills nav-flush flex-column mb-auto text-centerd-flex flex-column flex-shrink-0 bg-body-tertiary" style={{ width: '4.5rem' }}>
                    <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                        <li className="nav-item">
                            <Link to="/perfil" className={`nav-link py-3 border-bottom rounded-0 ${activeWindow === 'perfil' && 'active'}`} title="perfil" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="create"><use xlinkHref="#perfil" /></svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/postList" className={`nav-link py-3 border-bottom rounded-0 ${activeWindow === 'postList' && 'active'}`} title="pagina Inicial" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Orders"><use xlinkHref="#postlist" /></svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/postear" className={`nav-link py-3 border-bottom rounded-0 ${activeWindow === 'Postear' && 'active'}`} title="Postear" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Posteo"><use xlinkHref="#postear" /></svg>
                            </Link>
                        </li>

                    </ul>
                    <div className="dropdown border-top">


                        <ul className="dropdown-menu text-small shadow">

                            <li><Link className="dropdown-item" to="/" onClick={handleSignOut}>Sign out</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="b-example-vr"></div>
            </div>
        </div>
    );
}


export default Sidebar;