import '../components/Entree.css';
import { auth, db } from '../config/firebaseConfig';
import { collection, query, where, getDocs} from "firebase/firestore";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/DashboardScreen.css';

const Entrée = () => {
        const [entrees,setEntrees] = useState([])
            useEffect(() => {
                const recipeRef = query(collection(db, 'recipes'), where("category", "==", "1"));

        getDocs(recipeRef).then((querySnapshot) => {
          const recipeList = [];
          querySnapshot.forEach((doc) => {
            console.log(" => ", doc.data());
            recipeList.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setEntrees(recipeList);
        })
      }, []);

    return (
      <>
      <div className='recettes_incontournable mt-5'>
            <h1>Entrées</h1>
        </div>  
        <div className="container mt-4">

          <div className='row g-3'>

            {entrees.map((entree) => (
               <div className='col-12 col-md-6 col-lg-4'>
              <div className="card" key={entree.id}>
              <img className="card-img-top" src={entree.image} alt="image de la recette"/>
                <div className="card-body">
                  <p className="card-user">{entree.userId}</p>
                  <Link className="links" to={`/Recipe/${entree.id}`}><h5 className="card-title">{entree.title}</h5></Link>
                </div>
              </div>
              </div>
              ))}
          </div>
                  
          </div>
          </>
      )

};
export default Entrée;