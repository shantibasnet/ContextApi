import { useContext, useEffect } from "react";
import UserProvider, { UserContext } from "./contexts/UserContext";
import { ThemeContext, ThemeProvider } from "./contexts/ThemeContext";
import './App.css';


// UserDetails.tsx
function UserDetails() {
  const { user, logout,login} = useContext(UserContext);
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.backgroundColor = themeContext?.theme === 'dark' ? '#333' : '#fff';
  }, [themeContext?.theme]);

  const handleLogout = () => {
    logout();
   
  };
  const handleLogin = () => {
    login();
  };

  return (
    <div style={{ position: 'relative' }}>
    <div style={{ color: themeContext?.theme === 'dark' ? '#fff' : '#000' }}>
      <div className="center-container">
        <p>User Name: {user.name}</p>
      <p>User Email: {user.email}</p>
      <p>User Status: {user.login ? 'Logged In' : 'Logged Out'}</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleLogin}>Login</button>
      </div>
      </div>
      </div>
   
  );
}

function Theme() {
  const { dispatch: userDispatch } = useContext(UserContext);
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    userDispatch({
      type: 'SET_USER',
      payload: {
        name: 'Shanti',
        email: 'Sha@example.com',
        login: true,
      },
    });
  }, [userDispatch]);

  return (
    <div style={{ position: 'absolute', top: 10, right: 10 }}>
    <div style={{ color: themeContext?.theme === 'dark' ? '#fff' : '#000' }}>
    <p>Current Theme: {themeContext?.theme}</p>
    <button onClick={themeContext?.dispatch}>Toggle Theme</button>
  </div>
  </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
      <div className="container">
        <UserDetails />
        <Theme />
        </div>
      </ThemeProvider>
    </UserProvider>
  );
}
