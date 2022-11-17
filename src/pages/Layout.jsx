import { Outlet } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import Searchbar from "../components/Searchbar";
import "../components/layout.css";
import "../components/Searchbar";

const Layout = () => {

    const authContext = useContext(AuthContext);

    return (
        <>
        <header>
        <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" id="logo" href="/">Todocook</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/Entrée">Entrée</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Plats">Plats</a>
        </li>
        <li class="nav-item">
          <a  class="nav-link" href="/Dessert">Dessert</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Ajoutrecette">Ajouter des recettes</a>
        </li>
      </ul>
      {authContext.isLogged && (
                            <button className="buttondeco" onClick={authContext.logout}>Déconnexion</button>
          )}
      <form class="d-flex" role="search">
        <input class="form-control me-2" id="search" type="search" placeholder="Je recherche une recette" aria-label="Search"/>
        <button id="search_button" class="btn btn-outline-success" type="submit">Rechercher</button>
      </form>
    </div>
  </div>
</nav>
        </header>          
           <main>
                <Outlet />
            </main>
            <footer>
                <span className="copyright">&copy; Réalisé par Clément Jonckheere en 2022</span>
            </footer>
            </> 
        );
};
export default Layout;