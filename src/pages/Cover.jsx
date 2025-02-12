import { Suspense } from "react"
import { Link, useLoaderData, Await, useLocation } from "react-router-dom"
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6"
import Loading from "../components/Loading"
import PageTitle from "../components/PageTitle"
import { sortCoversByTitle } from "../utils/sort-covers-by-title"
import { sortCoversByAuthor } from "../utils/sort-covers-by-author"
import PenguinClassics from "../img/penguin-classics.gif"

export default function Cover() {
  const dataPromise = useLoaderData()
  // Get the sortOption from the Link state (default to "author" if not set)
  const location = useLocation()
  const sortOption = location.state?.sortOption || "author"

  function renderCoverDetail(cover, covers) {
    // Copy the covers so we don't mutate the original array
    const coversCopy = [...covers]

    // Choose the correct sort function based on sortOption
    const sortedCovers =
      sortOption === "title"
        ? sortCoversByTitle(coversCopy)
        : sortCoversByAuthor(coversCopy)

    // Find the current cover by id for robust matching
    const currentIndex = sortedCovers.findIndex((cov) => cov.id === cover.id)
    const prevCover = sortedCovers[currentIndex - 1]
    const nextCover = sortedCovers[currentIndex + 1]

    return (
      <>
        <PageTitle title={`${cover.slug} | Alt-Penguin Classics`} />
        <h1 className="visually-hidden">
          {`${cover.title} by ${cover.authorFirstName} ${cover.authorLastName}`}
        </h1>

        <div>
          <div className="prev-next">
            {prevCover ? (
              <Link
                // Pass the sortOption along via state so the cover page knows how to sort
                to={`/${prevCover.slug.replace(/\s+/g, "-").toLowerCase()}`}
                state={{ sortOption }}
                className="arrow"
              >
                <FaCircleArrowLeft />
                <span className="visually-hidden">
                  Previous: {prevCover.title}
                </span>
              </Link>
            ) : (
              <Link className="arrow disabled">
                <FaCircleArrowLeft />
              </Link>
            )}
          </div>
          <div>
            <figure>
              <div>
                <img
                  src={cover.imgMain}
                  alt={cover.imgMainDesc}
                  width="100%"
                />
                <img
                  src={PenguinClassics}
                  alt="Penguin Classics"
                  width="100%"
                />
              </div>
              <figcaption>
                <img
                  src={cover.imgCaption}
                  alt={`${cover.title} by ${cover.authorFirstName} ${cover.authorLastName}`}
                  width="100%"
                />
              </figcaption>
            </figure>
          </div>
          <div className="prev-next">
            {nextCover ? (
              <Link
                to={`/${nextCover.slug.replace(/\s+/g, "-").toLowerCase()}`}
                state={{ sortOption }}
                className="arrow"
              >
                <span className="visually-hidden">Next: {nextCover.title}</span>
                <FaCircleArrowRight />
              </Link>
            ) : (
              <Link className="arrow disabled">
                <FaCircleArrowRight />
              </Link>
            )}
          </div>
        </div>
      </>
    )
  }

  return (
    <main
      id="main-content"
      className="main-content main-cover"
    >
      <div className="cover">
        <Suspense fallback={<Loading title="Cover" />}>
          <Await resolve={dataPromise}>
            {({ cover, covers }) => renderCoverDetail(cover, covers)}
          </Await>
        </Suspense>
      </div>
    </main>
  )
}
