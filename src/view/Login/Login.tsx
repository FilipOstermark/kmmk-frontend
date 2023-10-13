import { useState } from "react"
import GoogleButton from "react-google-button"
import { Link } from "react-router-dom"
import { backendServiceInstance } from "src/api/BackendServiceImpl"
import { FRONTEND_TITLE } from "src/util/constants"
import "/src/view/Login/Login.css"

export const Login: () => JSX.Element = () => {
  const [isPrivacyPolicyAccepted, setIsPrivacyPolicyAccepted] = useState(false)

  return (
    <form>
      <div className="login-page">
      
        <h1>Logga in</h1>

        <GoogleButton disabled={!isPrivacyPolicyAccepted} onClick={() => { 
          backendServiceInstance.loginWithGoogle() 
        }} />

        <div 
          className="login-accept-privacy-box" 
          onClick={() => {setIsPrivacyPolicyAccepted(prev => !prev)}}
        >
          <input 
            required 
            type="checkbox"
            checked={isPrivacyPolicyAccepted} 
            onChange={ e => { setIsPrivacyPolicyAccepted(e.target.checked) } }
          />
          <label>
            Jag intygar härmed att jag har läst och 
            godkänner <Link to="/privacy-policy">{FRONTEND_TITLE}
            s integritetspolicy.</Link>
          </label>
        </div>
      
      </div>
    </form>
  )
}
