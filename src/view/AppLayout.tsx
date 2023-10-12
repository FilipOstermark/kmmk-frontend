import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { backendServiceInstance } from "src/api/BackendServiceImpl"
import KmmkLogo from "src/assets/kmmk-logo.png"
import { NavigationMenu } from "./Navigation/NavigationMenu"

export const AppLayout: () => JSX.Element = () => {
  const navigate = useNavigate()

  useEffect(() => {
    backendServiceInstance.setAuthenticationRequiredHandler(() => {
      navigate("/login")
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <header>
        <img 
          width={200} 
          src={KmmkLogo} 
          onClick={() => { navigate('/') }}
          alt="KMMK Logo"
          ></img>
        <NavigationMenu />
      </header>

      <article>
        <Outlet />
      </article>
    </>
  )
}
