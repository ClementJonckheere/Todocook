import Recipe from '../components/Recipe';
import { auth, db } from '../config/firebaseConfig';
import { collection, getDocs} from "firebase/firestore";
import { useEffect, useState } from 'react';

const DashboardComp = () => {
    const [recipes,setRecipes] = useState([])
    const [count, setCount] = useState(0);
    const [recettes, setRecettes] = useState([]);
        useEffect(() => {
            const recetteRef = collection(db, 'recettes');
  
    getDocs(recetteRef).then((querySnapshot) => {
      const recettesList = [];
      querySnapshot.forEach((doc) => {
        recettesList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setRecettes(recettesList);
    })
  }, []);
  
  console.log(recettes);
    return(
        <div className='cards'>
            {recettes.map((recette) => (
                <div className="card" key={recette.id}>
                    <h2>{recette.title}</h2>
        </div>
            ))}
        </div>
        )
}
    export default DashboardComp;