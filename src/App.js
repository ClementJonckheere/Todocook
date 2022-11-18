import { useEffect, useState } from 'react';
import './App.css';


import { collection, getDocs} from "firebase/firestore";
import { signOut } from 'firebase/auth';

import { auth, db } from './config/firebaseConfig';
import Layout from './pages/Layout';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import DashboardScreen from './pages/DashboardScreen';
import LoginScreen from './pages/LoginScreen';
import { AuthContext } from './context/AuthContext';
import Private from './pages/Private';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Dessert from './pages/Dessert';
import Plats from './pages/Plats';
import Entrée from './pages/Entrée';
import AddRecipe from './pages/AddRecipe';
import Recipe from './components/Recipe';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardScreen />,
      },
      {
        path: 'login',
        element: <LoginScreen />,
      },
      {
        path: 'dessert',
        element: <Dessert />,
      },
      {
        path: 'plats',
        element: <Plats />,
      },
      {
        path: 'entrée',
        element: <Entrée />,
      },
      {
        path: 'Ajout-des-recettes',
        element: <AddRecipe />,
      },
      {
        path: 'Recipe',
        element: <Recipe />,
      }
    ],
  },


]);

function App() {
  const [count, setCount] = useState(0);
  const [recettes, setRecettes] = useState([]);

  const [isLogged, setIsLogged] = useState(false);
  const login = () => {
    setIsLogged(true);
  }
  const logout = () => {
    signOut(auth).then(() => {
      setIsLogged(false);
    })
  }

// useEffect(() => {
//   const recetteRef = collection(db, 'recettes');

//   getDocs(recetteRef).then((querySnapshot) => {
//     const recettesList = [];
//     querySnapshot.forEach((doc) => {
//       recettesList.push({
//         id: doc.id,
//         ...doc.data(),
//       });
//     });
//     setRecettes(recettesList);
//   })
// }, []);

// console.log(recettes);

  return (
    <AuthContext.Provider 
    value={{
      isLogged,
      login,
      logout,
    }}>
    <RouterProvider router={router}/>
    </AuthContext.Provider>

  );
}

export default App;

      {/* <div className='card'>
        {recettes.map((recette) => (
          <div key={recette.id}>
            <h2>{recette.title}</h2>
          </div>
        )
          )}
      </div> */}
