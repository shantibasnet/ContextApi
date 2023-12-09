import { useContext, useEffect } from "react"
import UserProvider, { UserContext } from "./contexts/UserContext"
import { ThemeContext, ThemeProvider } from "./contexts/ThemeContext"

function UserDetails(){
  const {user} = useContext(UserContext)
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.backgroundColor = themeContext?.theme === 'dark' ? '#333' : '#fff';
  }, [themeContext?.theme]);

  return(
  <>
  <p>User Name: {user.name}</p>
  <p>User Email:{user.email}</p>
  <p>User Status: {user.login ? "Logged In" : "Logged Out"}</p>
  </>
  )
}

function Theme(){

const {user, setUser} = useContext(UserContext)
const themeContext = useContext(ThemeContext);

useEffect(() => {
  setUser({
    name: "Shanti",
    email: "Sha@example.com",
    login: true
  });
}, []);

return (
  <>
    <p>Current Theme: {themeContext?.theme}</p>
    <button onClick={themeContext?.toggleTheme}>Toggle Theme</button>
  </>
);
}




export default function App(){
  return(
    <UserProvider>
      <ThemeProvider>
      <UserDetails/>
      <Theme/>
      </ThemeProvider>
    </UserProvider>

  )
}