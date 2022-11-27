import '../components/Entree.css';
import { auth, db } from '../config/firebaseConfig';
import { collection, query, where, getDocs} from "firebase/firestore";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/DashboardScreen.css';

const Plats = () => {
        const [plats,setPlats] = useState([])
            useEffect(() => {
                const recipeRef = query(collection(db, 'recipes'), where("category", "==", "2"));

        getDocs(recipeRef).then((querySnapshot) => {
          const recipeList = [];
          querySnapshot.forEach((doc) => {
            console.log(" => ", doc.data());
            recipeList.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setPlats(recipeList);
        })
      }, []);

    return (
      <>
      <div className='recettes_incontournable mt-5'>
            <h1>Plats</h1>
        </div>  
        <div className="container mt-4">

<div className='row g-3'>
        {plats.map((plat) => (
           <div className='col-12 col-md-6 col-lg-4'>
            <div className="card" key={plat.id}>
             <img className="card-img-top" src={plat.image} alt="image de la recette"/>
              <div className="card-body">
                <p className="card-user">{plat.userId}</p>
                <Link className="links" to={`/Recipe/${plat.id}`}><h5 className="card-title">{plat.title}</h5></Link>
              </div>
            </div>
            </div>
            ))}
        </div>
                
        </div>
        </>

    )

};
export default Plats;

