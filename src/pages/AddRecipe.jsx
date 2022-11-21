import {useEffect, useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import {auth, db, storage} from "../config/firebaseConfig";
import '../components/AddRecipe.css';
import { useFormik } from 'formik';
// import React from 'react'; 
// import { Formik } from 'formik';
// import { useFormik } from "formik";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const AddRecipe = () => {

    const {acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject} = useDropzone();

    const [thumb, setThumb] = useState(null)

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);
    useEffect(() => {
        if (acceptedFiles[0]) {
            const url = URL.createObjectURL(acceptedFiles[0])
            setThumb(url)
        }
    }, [acceptedFiles])

    const handelUpload = () => {
        const imageRef = ref(storage, `media/${acceptedFiles[0].path}`)
        return uploadBytes(imageRef, acceptedFiles[0])
    }

    console.log(acceptedFiles[0])

const onSubmit = (values) => {
    handelUpload().then(querysnapshot =>{
        getDownloadURL(querysnapshot.ref).then(url => {
            console.log(url)
            const recipeColRef = collection(db, "recipes")
            addDoc(recipeColRef, {
                ...values,
                image:url,
                userId: auth.currentUser.email
            }).then( () => {
                    window.alert("enrigistrement effectué")
            })
        })
    })

}
    
    const formik = useFormik({
        initialValues:{
            title:'',
            category:'',
            ingredients:'',
            recipe:'',
            image:'',
            preparation:''
        },
        onSubmit,
})
console.log(auth.currentUser.uid);

    return (
        <main className='main_ajout'>
            <div className="text_ajout">
                <h1 className='titre_ajout'>Ajouter des recettes</h1>
            </div>
            <div className='formulaire_ajout'>
        <form className='formulaire' onSubmit={formik.handleSubmit}>
        <section className="container justify-content-center">
            <div className="mb-3 justify-content-center">
                <label htmlFor="titre_recette" className="form-label">Titre de la recette</label>
                <input type="text" className="form-control" id="titre_recette" aria-describedby="titre_recette" name="title" onChange={formik.handleChange} value={formik.values.title} />
            </div>
            <div className="mb-3">
            <select className="form-select" aria-label="Default select example" name="category" onChange={formik.handleChange}  value={formik.values.category} >
                <option selected>Choisissez la catégorie</option>
                <option value="1">Entrée</option>
                <option value="2">Plats</option>
                <option value="3">Dessert</option>
            </select>
            </div>
            <div className="mb-3 justify-content-center">
                <label htmlFor="preparation" className="form-label">Temps de préparation</label>
                <input type="text" className="form-control" id="preparation" aria-describedby="preparation" name="preparation" onChange={formik.handleChange} value={formik.values.preparation} />
            </div>

            <div class="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Ingredients</label>
                <textarea className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="ingredients" onChange={formik.handleChange}  value={formik.values.ingredients}></textarea>
                <div id="ingredient" className="form-text">Chaque ingredient doit être s'épparé par une virgule</div>
            </div>

            <div class="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Etapes de la recette</label>
                <textarea className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="recipe" onChange={formik.handleChange}  value={formik.values.recipe}></textarea>
                <div id="ingredient" className="form-text" >Chaque étape de la recette doit être s'épparé par une virgule</div>
            </div>


            {thumb && (
                <div>
                    <img className="img-fluid" src={thumb} alt={'image uploadé'}/>
                </div>
            )}
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Glissez déposer ici, ou clicker pour choisir votre fichier</p>
            </div>
            {thumb && (
                <div>
                    <button type="submit" className="btn_formulaire btn btn-primary">Envoyer</button>
                </div>
            )}
        </section>
        </form>
        </div>
        </main>
    )

};
export default AddRecipe;