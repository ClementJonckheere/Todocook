import { signup } from "../config/firebaseConfig";


function signUp() {
    return (
        <div className="authentification">
            <input placeholder="Email" />
            <input type="password" placeholder="Password" />
        </div>
    )
}
export default signUp;