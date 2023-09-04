import { Link, Outlet } from "react-router-dom"
import KmmkLogo from "src/assets/kmmk-logo.png"
import RuleBook from "src/assets/MoHU.pdf"

export const AppLayout: () => JSX.Element = () => (
    <>
      <header>
        <img width={200} src={KmmkLogo}></img>
        <nav>
          <ul>
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