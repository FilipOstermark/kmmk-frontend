import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { backendServiceInstance } from "src/api/BackendServiceImpl"
import KmmkLogo from "src/assets/kmmk-logo.png"
import { ImageWithBlur } from "./Common/ImageWithBlur"
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
        <ImageWithBlur
          src={KmmkLogo}
          blurRadiusPx={30}
          className="header-logo" />

        <NavigationMenu />
      </header>

      <article>
        <Outlet />
      </article>
    </>
  )
}
