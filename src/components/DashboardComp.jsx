import Recipe from '../components/Recipe';
import { auth, db } from '../config/firebaseConfig';
import { collection, getDocs} from "firebase/firestore";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DashboardComp = () => {
    const [recipes,setRecipes] = useState([])
        useEffect(() => {
            const recipeRef = collection(db, 'recipes');
  
    getDocs(recipeRef).then((querySnapshot) => {
      const recipeList = [];
      querySnapshot.forEach((doc) => {
        recipeList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setRecipes(recipeList);
    })
  }, []);
    return(
      <div className='container mt-4'>
      <div className='row g-3'>
          {recipes.map((recipe) => (
            <div className='col-12 col-md-6 col-lg-4'>
              <div className="card" key={recipe.id}>
              <img class="card-img-top" src={recipe.image} alt="image de la recette"/>
                <div class="card-body">
                  <p class="card-user">{recipe.userId}</p>
                  <Link className="links" to={`/Recipe/${recipe.id}`}><h5 class="card-title">{recipe.title}</h5></Link>
                </div>
              </div>
              </div>
              ))}
          </div>
        </div>
        )
}
    export default DashboardComp;