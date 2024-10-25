import { Link } from "react-router-dom"
import { FaCircleArrowLeft } from "react-icons/fa6"
import { useRouteError } from "react-router-dom"
import PageTitle from "../components/PageTitle"

export default function Error() {
  const error = useRouteError()
  const message = error?.message || "An unexpected error occurred"
  const statusText = error?.statusText || "No additional information"
  const status = error?.status || "Unknown status"

  return (
    <>
      <main
        id="main-content"
        className="main-content"
      >
        <div className="container error-pages">
          {status === 404 ? (
            <>
              <PageTitle title="404 - Page Not Found" />
              <h1>404 - Page Not Found</h1>
              <p className="page-not-found">
                The page you&apos;re looking for doesn&apos;t exist.
              </p>
            </>
          ) : (
            <>
              <PageTitle title={`Error: ${message}`} />
              <h1>Error: {message}</h1>
              <ul className="error-info">
                <li>{statusText}</li>
                <li>Status: {status}</li>
              </ul>
            </>
          )}
          <Link
            to="/"
            className="back-link arrow"
          >
            <FaCircleArrowLeft />
            <span>Back to the Home page</span>
          </Link>
        </div>
      </main>
    </>
  )
}
