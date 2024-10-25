import PropTypes from "prop-types"
function Loading({ title }) {
  return (
    <>
      <p className="visually-hidden">Loading {title}...</p>
      <div
        className="loading"
        aria-hidden="true"
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  )
}

Loading.propTypes = {
  title: PropTypes.string,
}

export default Loading
