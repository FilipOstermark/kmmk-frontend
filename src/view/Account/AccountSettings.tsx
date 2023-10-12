import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { JWT } from "src/model/JWT"
import { authTokenRepositoryInstance } from "src/repository/AuthTokenRepository"
import { userRepositoryInstance } from "src/repository/UserRepository"
import { authenticationServiceInstance } from "src/service/AuthenticationService"
import "src/view/Account/AccountSettings.css"

export const AccountSettings: () => JSX.Element = () => {
  
  const navigate = useNavigate()
  const [isDangerZoneExpanded, setIsDangerZoneExpanded] = useState(false)

  const jwt: JWT | null = authenticationServiceInstance.parsedJWT()
  
  function logout() {
    authTokenRepositoryInstance.clearAuthToken()
    navigate("/login")
  }

  function deleteUserOnConfirm() {
    if (confirm("Är du säker? Din användare kommer att raderas permanent.")) {
      userRepositoryInstance.deleteSelf()
              .then(logout)
              .catch(err => { console.error("Failed to delete user", err) })
      logout()
    }
  }

  return (
    <div className="account-settings">
      <h1>Användarkonto</h1>
      <div className="account-settings-user-info">
        <h3>Id:</h3>
        <h3>{jwt?.userId ?? "?"}</h3>
        <h3>Namn:</h3>
        <h3>{jwt?.name ?? "?"}</h3>
        <h3>E-post:</h3>
        <h3>{jwt?.sub ?? "?"}</h3>
      </div>

      <button className="account-settings-logout-button" onClick={() => {
        authTokenRepositoryInstance.clearAuthToken()
        navigate("/login")
      }}>Logga ut</button>

      <div className="account-settings-danger-zone">
        <h2 className="account-settings-danger-zone-title">☠️🔞 Danger zone 🔞☠️</h2>
        <button onClick={() => { setIsDangerZoneExpanded(prev => !prev) }}>
                {isDangerZoneExpanded ? "Dölj alternativ" : "Visa alternativ"}
        </button>
        
        <div className="account-settings-danger-zone-expandable" data-is-expanded={isDangerZoneExpanded}>
          <p className="account-settings-danger-zone-warning-text">
            ⚠️ Du kan välja att rensa din personliga data från systemet.
            Om du gör detta kommer ditt namn och din epost inte längre att
            kunna knytas till betygsättning på album, etc. Gör inte detta om du
            planerar att fortsätta använda sidan. ⚠️
          </p>
          <button onClick={deleteUserOnConfirm}>Ta bort användardata</button>
        </div>
      </div>

    </div>
  )
}
