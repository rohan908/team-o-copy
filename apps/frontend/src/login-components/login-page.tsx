import React,{useState} from 'react';
import LogInPageButton from './components/login-page-button.tsx';
import LogInPopUp from "./components/login-pop-up.tsx";

interface LoginPageProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}
function LoginPage({isLoggedIn, setIsLoggedIn}: LoginPageProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [showLoginFeedback, setShowLoginFeedback] = useState(false);
    const handleClick = () => {
        setIsPopupOpen(true);
    }

    const handleClose = () => {
        setIsPopupOpen(false);
        setUsername('');
        setPassword('');
    }

    const handleLogin=()=>{
        const validUser = username === "dev" && password === '1234';
        if(validUser){
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            setLoginStatus("success");
            setIsLoggedIn(true);
        }else{
            setLoginStatus("error");
        }
        console.log(username,password);
        console.log(loginStatus);
        setIsPopupOpen(false);
        setShowLoginFeedback(true);
        setUsername('');
        setPassword('');
    };
    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        setIsLoggedIn(false);
    };

    return (
        <div>
            {!isLoggedIn ? (
                <LogInPageButton onClick={handleClick} variant={'primary'} disabled={false}>
                    Log In
                </LogInPageButton>
            ) : (
                <LogInPageButton onClick={handleLogout} variant={'secondary'} disabled={false}>
                    Log Out
                </LogInPageButton>
            )}


            <LogInPopUp
                isOpen={showLoginFeedback}
                onClose={() => {
                    setShowLoginFeedback(false);
                    setLoginStatus('');
                }}
                title={loginStatus === 'success' ? 'Login Successful' : 'Login Failed'}
            >
                <div className={`p-4 text-center rounded-md font-semibold ${
                    loginStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {loginStatus === 'success' ? 'Welcome back!' : 'Incorrect username or password.'}
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => {
                            setShowLoginFeedback(false);
                            setLoginStatus('');
                        }}
                        className={`px-4 py-2 rounded text-white ${
                            loginStatus === 'success'
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-red-600 hover:bg-red-700'
                        }`}
                    >
                        Close
                    </button>
                </div>
            </LogInPopUp>
            <LogInPopUp isOpen={isPopupOpen} onClose={handleClose} title={"Login"}>
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
                            onClick={handleLogin}
                            disabled={!username || !password}
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
        </div>
    );
}
export default LoginPage;