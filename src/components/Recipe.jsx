import "./recipe.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardComp from "./DashboardComp";
import { db } from "../config/firebaseConfig";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { async } from "@firebase/util";
import { useState } from "react";
import Loader from 'react-js-loader'


const Recipe = () => {
    const params = useParams()
    const displayparams = params
    const [recipe, setRecipe] = useState()
    const [isLoading, setIsLoading] = useState(true)
    async function getRecipe() {
        const recipeRef = doc(db, 'recipes', displayparams.id);

        const test = await getDoc(recipeRef)
        if(test.exists()){
            setRecipe(test.data())
            setIsLoading(false)
        }else{
            console.log("error")
        }
    }


    
    useEffect(() => { 
        getRecipe()
     }, [])
    console.log(recipe);

    const allIngredients = recipe?.ingredients?.split(',');
    const allRecipe = recipe?.recipe?.split(',');
    return (
        isLoading ? <Loader type="spinner-circle" bgColor='#000' /> :(
        <main className="main-recipe">
                <h2 className="titre-recipe d-flex justify-content-center"> {recipe.title}</h2>
                <p class="time-ingredient d-flex justify-content-center"> Temps de préparation : {recipe.preparation}</p>
                <img class="card-img-top" src={recipe.image} alt="image de la recette"/>
                <div class="card-body">
                    <div class="ingredients ">   
                        <h4 className="title_ingredients d-flex justify-content-center">Ingredients</h4>
                        <div className="allingredients d-flex justify-content-around">
                            {allIngredients.map((ingred) =>(
                                <p className="ingred">{ingred}</p>
                            ))}
                        </div>
                    </div>

                    <div className="etape">
                        </div>
                        {allRecipe.map((reci, index) =>(
                        <div key={index} className="etapes">
                            <div className="etape">
                                <h4>Etape {index+1}</h4>
                            {reci}
                            </div>
                        </div>
                    ))}
                </div>
        </main>
    )
    )
}
export default Recipe;