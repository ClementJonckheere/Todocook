import DashboardComp from '../components/DashboardComp';
import '../components/DashboardScreen.css';
// import Recipe from '../components/Recipe';

const DashboardScreen = () => {
    
    return (
        <main className='main_dashboard'>
        <div className='container-fluid'>
        <div className="contentAccueil">
            <div className="presentationAccueil">
                <p className='text'>Avec <span className='spanTodocook'>Todocook</span>, plus de cuisine dans ta vie !</p>
                <p className='text'>Ne manquer plus d'inspiration, sachez quoi manger. Découvrez toutes nos recettes pour les entrées, plats
                    et desserts.</p>
            </div>
            <div className='recettes_incontournable'>
                <h1>Recettes incontournables</h1>
                <div className='cards_recettes_incontournable'>
                        {
                <DashboardComp />
}       
            </div>
                </div>
        </div>
        </div>
        </main>
    )
}
export default DashboardScreen;