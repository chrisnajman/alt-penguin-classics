import { Suspense } from "react"
import { Link, useLoaderData, Await } from "react-router-dom"
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6"
import Loading from "../components/Loading"
import PageTitle from "../components/PageTitle"
import { sortCoversByTitle } from "../utils/sort-covers-by-title"

export default function Cover() {
  const dataPromise = useLoaderData()

  function renderCoverDetail(cover, covers) {
    const sortedCovers = sortCoversByTitle(covers)
    // Prev Next
    const currentIndex = sortedCovers.findIndex(
      (cov) => cov.title === cover.title
    )
    const prevCover = sortedCovers[currentIndex - 1]
    const nextCover = sortedCovers[currentIndex + 1]

    return (
      <>
        <PageTitle title={`${cover.title} | Alt-Penguin Classics`} />
        <h1 className="visually-hidden">{`${cover.title} by ${cover.author}`}</h1>

        <div>
          <div className="prev-next">
            {prevCover ? (
              <Link
                to={`/${prevCover.title.replace(/\s+/g, "-").toLowerCase()}`}
                className="arrow"
                title={prevCover.title}
              >
                <FaCircleArrowLeft />

                <span className="visually-hidden">
                  Previous: {prevCover.title}
                </span>
              </Link>
            ) : (
              <Link
                className="arrow disabled"
                aria-hidden="true"
              >
                <FaCircleArrowLeft />
              </Link>
            )}
          </div>
          <div>
            <figure>
              <img
                src={cover.imgMain}
                alt={cover.imgMainDesc}
                width="100%"
              />
              <figcaption>
                <img
                  src={cover.imgCaption}
                  alt={`Penguin Classics. ${cover.title} by ${cover.author}`}
                  width="100%"
                />
              </figcaption>
            </figure>
          </div>
          <div className="prev-next">
            {nextCover ? (
              <Link
                to={`/${nextCover.title.replace(/\s+/g, "-").toLowerCase()}`}
                className="arrow"
                title={nextCover.title}
              >
                <span className="visually-hidden">Next: {nextCover.title}</span>
                <FaCircleArrowRight />
              </Link>
            ) : (
              <Link
                className="arrow disabled"
                aria-hidden="true"
              >
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