import { NavLink } from "react-router-dom"

export default function Nav() {
  return (
    <nav className="site-navigation">
      <ul>
        <li>
          <NavLink
            to="."
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="about"
            end
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
