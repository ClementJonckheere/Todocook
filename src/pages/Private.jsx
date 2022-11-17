import { useContext } from 'react';
import { redirect, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Private = ({ children }) => {
  // On accède au contenu du context
  const authContext = useContext(AuthContext);
  // Si l'utilisateur est connecté, on retourne la page protégée sinon on rédirige l'utilisateur vers la page de connexion
  return authContext.isLogged ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default Private;
