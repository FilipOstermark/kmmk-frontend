import { useNavigate } from "react-router-dom"
import { JWT } from "src/model/JWT"
import { authTokenRepositoryInstance } from "src/repository/AuthTokenRepository"
import { userRepositoryInstance } from "src/repository/UserRepository"
import { authenticationServiceInstance } from "src/service/AuthenticationService"
import "src/view/Account/AccountSettings.css"

export const AccountSettings: () => JSX.Element = () => {
  
  const navigate = useNavigate()
  const jwt: JWT | null = authenticationServiceInstance.parsedJWT()
  
  function logout() {
    authTokenRepositoryInstance.clearAuthToken()
    navigate("/login")
  }

  return (
    <div className="account-settings">
      <h1>Användarkonto</h1>
      <h3>{jwt?.name ?? "?"}</h3>
      <h3>{jwt?.sub ?? "?"}</h3>

      <button onClick={() => {
        authTokenRepositoryInstance.clearAuthToken()
        navigate("/login")
      }}>Logga ut</button>

      <div>
        <h2>Danger zone</h2>
        <button onClick={() => {
          userRepositoryInstance.deleteSelf()
            .then(logout)
            .catch(err => { console.error("Failed to delete user", err) })
        }}>Ta bort användardata</button>
      </div>
    </div>
  )
}
