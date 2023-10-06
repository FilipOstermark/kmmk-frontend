import GoogleButton from "react-google-button"
import { backendServiceInstance } from "src/api/BackendServiceImpl"
import "/src/view/Login/Login.css"

export const Login: () => JSX.Element = () => (
    <div className="login-page">
      <h1>Logga in</h1>
      <GoogleButton onClick={() => { 
        backendServiceInstance.loginWithGoogle() 
      }} />
    </div>
  )
