import PropTypes from "prop-types"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const PageTitle = ({ title }) => {
  const location = useLocation()

  useEffect(() => {
    document.title = title
  }, [location, title])

  return null
}

PageTitle.propTypes = {
  title: PropTypes.string,
}

export default PageTitle
