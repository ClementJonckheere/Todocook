import { Outlet } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import Searchbar from "../components/Searchbar";
import "../components/layout.css";
import "../components/Searchbar";
import { Link } from "react-router-dom";


const Layout = () => {

    const authContext = useContext(AuthContext);

    return (
        <>
        <header>
        <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <Link className="navbar-brand" id="logo" to="/">Todocook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/Entrée">Entrée</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Plats">Plats</Link>
        </li>
        <li className="nav-item">
          <Link  className="nav-link" to="/Dessert">Dessert</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Ajout-des-recettes">Ajouter</Link>
        </li>
      </ul>
      {authContext.isLogged && (
                            <button className="buttondeco" onClick={authContext.logout}>Déconnexion</button>
          )}
      <form className="d-flex" role="search">
        <input className="form-control me-2" id="search" type="search" placeholder="Je recherche une recette" aria-label="Search"/>
        <button id="search_button" className="btn btn-outline-success" type="submit">Rechercher</button>
      </form>
    </div>
  </div>
</nav>
        </header>          
           <main>
                <Outlet />
            </main>
            <footer className="footer">
                <span className="copyright">&copy; Réalisé par Clément Jonckheere en 2022</span>
            </footer>
            </> 
        );
};
export default Layout;