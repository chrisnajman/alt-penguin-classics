import { NavLink } from "react-router-dom"
import Nav from "./Nav"
import logo from "../img/logo.png"

function Header() {
  return (
    <header className="site-header">
      <NavLink
        to="."
        end
        className="site-header--h1"
        title="Link to Home page"
      >
        <img
          src={logo}
          alt=""
          width="50"
          aria-hidden="true"
        />
        Alt-Penguin Classics
        <span className="visually-hidden">(Link to Home page)</span>
      </NavLink>
      <Nav />
    </header>
  )
}

export default Header
