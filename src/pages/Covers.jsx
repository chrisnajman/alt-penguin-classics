import { useLoaderData, Link } from "react-router-dom"
import { sortCoversByTitle } from "../utils/sort-covers-by-title"
import Loading from "../components/Loading"
import PageTitle from "../components/PageTitle"

const Covers = () => {
  const covers = useLoaderData()

  const renderCoverElements = (covers = []) => {
    const sortedCovers = sortCoversByTitle(covers)
    const coverElements = sortedCovers.map((cover) => {
      return (
        <Link
          to={cover.title.replace(/\s+/g, "-").toLowerCase()}
          key={cover.id}
          title={`${cover.title} by ${cover.author}`}
          className="cover-tile"
        >
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
        </Link>
      )
    })
    return <div className="cover-list">{coverElements}</div>
  }

  return (
    <>
      <PageTitle title="Home | Alt-Penguin Classics" />
      <main
        id="main-content"
        className="main-content"
      >
        <h1 className="visually-hidden">Home</h1>
        {covers && covers.length > 0 ? (
          renderCoverElements(covers)
        ) : (
          <Loading title="Covers" />
        )}
      </main>
    </>
  )
}

export default Covers
