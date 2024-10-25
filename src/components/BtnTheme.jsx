import { useState, useEffect } from "react"
import { THEME_KEY } from "../utils/localStorageKey"
function BtnTheme() {
  function getStoredTheme() {
    try {
      const storedTheme = localStorage.getItem(THEME_KEY)
      return storedTheme ? JSON.parse(storedTheme) : false
    } catch (error) {
      console.error("Error parsing theme from localStorage:", error)
      return false
    }
  }

  const [theme, setTheme] = useState(getStoredTheme)

  useEffect(() => {
    document.documentElement.classList.toggle("lightmode", theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  function handleMode() {
    setTheme((prevTheme) => !prevTheme)
  }
  return (
    <div className="theme-toggler">
      <p className="light">
        Light
        <span className="visually-hidden">
          {theme ? " theme active" : " theme inactive"}
        </span>
      </p>
      <button
        type="button"
        onClick={handleMode}
        aria-pressed={theme ? "false" : "true"}
        aria-label="Toggle theme"
      >
        <span></span>
      </button>
      <p className="dark">
        Dark
        <span className="visually-hidden">
          {theme ? " theme inactive" : " theme active"}
        </span>
      </p>
    </div>
  )
}

export default BtnTheme
