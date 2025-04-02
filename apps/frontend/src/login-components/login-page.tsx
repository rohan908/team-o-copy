import React,{useState} from 'react';
import LogInPageButton from './components/login-page-button.tsx';
import LogInPopUp from "./components/login-pop-up.tsx";
function LoginPage(){

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        setIsPopupOpen(true);
    }

    const handleClose = () => {
        setIsPopupOpen(false);

        // clear the form fields
        setUsername('');
        setPassword('');
    }

    const handleLogin=()=>{
        // store in local for now
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        console.log(username,password);
        setIsPopupOpen(false);
        // clear the form fields
        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <LogInPageButton onClick={handleClick} variant={'primary'} disabled={false}>
                Log In
            </LogInPageButton>
            {/* Render the popup outside the button */}
            <LogInPopUp isOpen={isPopupOpen} onClose={handleClose} title={"Login"}>
                {/* Popup content goes here */}
                <form>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <input
                        type = "password"
                        placeholder="Enter password:"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="flex items-center justify-center gap-4 mt-10">
                        <button
                            onClick={handleLogin} // add log in functionality here
                            disabled={!username || !password} // disables the button if a username and password haven't been entered
                            // This bit of fancy styling greys out the button when it is disabled
                            className={`px-4 py-2 rounded transition-colors ${
                                username && password
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
                                    : 'bg-gray-300 text-gray-400 cursor-not-allowed opacity-50'
                            }`}
                        >Log In</button>
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 bg-red-200 hover:bg-red-300 rounded"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </LogInPopUp>
            {/*
            Displaying of saved values for debugging
            <p>Username: {username}</p>
            <p>Password: {password}</p>
            */}
        </div>
    );
}
export default LoginPage;