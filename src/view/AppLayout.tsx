import { useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { backendServiceInstance } from "src/api/BackendServiceImpl"
import KmmkLogo from "src/assets/kmmk-logo.png"
import RuleBook from "src/assets/MoHU.pdf"

export const AppLayout: () => JSX.Element = () => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log("I render")
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
        <nav>
          <ul>
            <li>
              <Link to="/login">Logga in</Link>
            </li>
            <li>
              <Link to=''>Topplista</Link>
            </li>
            <li>
              <Link to='/new-album'>+ Nytt album</Link>
            </li>
            <li>
              <a href={RuleBook}>Manifest</a>
            </li>
          </ul>
        </nav>
      </header>

      <article>
        <Outlet />
      </article>
    </>
  )
}
