import { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../components/LoginScreen.css';

const LoginScreen = () => {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();
  // use effect qui permet de faire la redirection en cas de changement du status de connexion d'un utilisateur
  useEffect(() => {
    if (authContext.isLogged) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [authContext.isLogged]); // le status stock

  const onSubmit = (values) => {
    const { email, password } = values;
    // fonction firebase qui permet d'authenfier un utilisateur avec son email et son mot de passe
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        // On appelle la fn login du context qui permet de changer le state partagé dans le context (isLogged)
        authContext.login();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
  });

  return (
    <div className='container'>
      <form className="formlogin" method="post" onSubmit={formik.handleSubmit}>
        <div className='container_form_email mb-3'>
          <div className='label'>
            <label className="form-label" htmlFor="email">Email</label>
          </div>
            <input
              type="email"
              className="form-control input"
              placeholder="name@example.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
        </div>

        <div className='container_form_password mb-3'>
            <div className='label'>
              <label className="form-label" htmlFor="password">Password</label>
            </div>
            <input
              className="form-control input"
              name="password"
              autoComplete="false"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            </div>
        <button className="btn-login btn btn-primary" type="submit">Se connecter</button>
        <Link to={`/signup`}><p class="card-title">S'inscrire</p></Link>
      </form>
    </div>
  );
};

export default LoginScreen;
