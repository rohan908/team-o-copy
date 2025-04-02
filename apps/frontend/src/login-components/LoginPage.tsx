import React,{useState} from 'react';
import LogInPageButton from './components/LogInPageButton.tsx';
import LogInPopUp from "./components/LogInPopUp.tsx";
function LoginPage(){

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleClick = () => {
        setIsPopupOpen(true);
    }

    const handleClose = () => {
        setIsPopupOpen(false);
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin=()=>{
        // store in local for now
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        console.log(username,password);
        setIsPopupOpen(false);
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
                    <input
                        type = "password"
                        placeholder="Enter password:"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={handleLogin} // add log in functionality here
                        className="px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded"
                    >Log In</button>
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-red-200 hover:bg-red-300 rounded"
                    >
                        Close
                    </button>
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