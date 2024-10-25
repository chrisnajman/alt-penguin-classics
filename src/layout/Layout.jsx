import { Outlet } from "react-router-dom"
import SkipLink from "../components/SkipLink"
import BtnTheme from "../components/BtnTheme"
import Header from "../components/Header"
import Footer from "../components/Footer"

function Layout() {
  return (
    <>
      <SkipLink />
      <BtnTheme />
      <div className="site-container">
        <Header />
        <Outlet />
        <Footer gitRepo="alt-penguin-classics" />
      </div>
    </>
  )
}

export default Layout
