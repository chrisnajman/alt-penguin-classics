import { useLoaderData, Link } from "react-router-dom"
import { sortCoversByTitle } from "../utils/sort-covers-by-title"
import Loading from "../components/Loading"
import PageTitle from "../components/PageTitle"
import PenguinClassics from "../img/penguin-classics.gif"

const Covers = () => {
  const covers = useLoaderData()

  const renderCoverElements = (covers = []) => {
    const sortedCovers = sortCoversByTitle(covers)
    const coverElements = sortedCovers.map((cover) => {
      return (
        <Link
          to={cover.title.replace(/\s+/g, "-").toLowerCase()}
          key={cover.id}
          className="cover-tile"
        >
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
                alt={`${cover.title} by ${cover.author}`}
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
