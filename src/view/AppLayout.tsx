import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { backendServiceInstance } from "src/api/BackendServiceImpl"
import KmmkLogo from "src/assets/kmmk-logo.png"
import { GlowImage } from "./Common/GlowImage"
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
        <GlowImage
          imageSrc={KmmkLogo}
          blurRadiusPx={25}
          wrapperClassName="header-logo"
          onClick={() => navigate("/toplist")} />

        <NavigationMenu />
      </header>

      <article>
        <Outlet />
      </article>
    </>
  )
}
