import '../components/Entree.css';
import { auth, db } from '../config/firebaseConfig';
import { collection, query, where, getDocs} from "firebase/firestore";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/DashboardScreen.css';

const Desserts = () => {
        const [desserts,setDesserts] = useState([])
            useEffect(() => {
                const recipeRef = query(collection(db, 'recipes'), where("category", "==", "3"));

        getDocs(recipeRef).then((querySnapshot) => {
          const recipeList = [];
          querySnapshot.forEach((doc) => {
            console.log(" => ", doc.data());
            recipeList.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setDesserts(recipeList);
        })
      }, []);

    return (
       <>
          <div className='recettes_incontournable mt-5'>
            <h1>Desserts</h1>
        </div>  
        <div className="container mt-4">
            <div className='row g-3'>
              {desserts.map((dessert) => (
                  <div className='col-12 col-md-6 col-lg-4'>
                  <div className="card" key={dessert.id}>
                  <img className="card-img-top justify-content-center" src={dessert.image} alt="image de la recette"/>
                    <div className="card-body">
                      <p className="card-user">{dessert.userId}</p>
                      <Link className="links" to={`/Recipe/${dessert.id}`}><h5 className="card-title">{dessert.title}</h5></Link>
                    </div>
                  </div>
                  </div>
                  ))}
              </div>
              </div>
        </>
    )

};
export default Desserts;
