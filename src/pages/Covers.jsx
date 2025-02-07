import { useState } from "react"
import { useLoaderData, Link } from "react-router-dom"
import { sortCoversByTitle } from "../utils/sort-covers-by-title"
import { sortCoversByAuthor } from "../utils/sort-covers-by-author"
import Loading from "../components/Loading"
import PageTitle from "../components/PageTitle"
import PenguinClassics from "../img/penguin-classics.gif"

const Covers = () => {
  const covers = useLoaderData()

  // Create a state variable to track the current sort option.
  // "author" is default.
  const [sortOption, setSortOption] = useState("author")

  const sortTitleBtn = () => {
    setSortOption("title")
  }

  const sortAuthorBtn = () => {
    setSortOption("author")
  }

  const renderCoverElements = (covers = []) => {
    // Copy the covers array so we don't mutate the original
    const coversCopy = [...covers]

    const sortedCovers =
      sortOption === "title"
        ? sortCoversByTitle(coversCopy)
        : sortCoversByAuthor(coversCopy)

    const coverElements = sortedCovers.map((cover) => (
      <Link
        to={cover.title.replace(/\s+/g, "-").toLowerCase()}
        key={cover.id}
        className="cover-tile"
        state={{ sortOption }}
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
              alt={`${cover.title} by ${cover.authorFirstName} ${cover.authorLastName}`}
              width="100%"
            />
          </figcaption>
        </figure>
      </Link>
    ))
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
        <div className="filters">
          <h2>Sort by: </h2>
          <button
            type="button"
            onClick={sortAuthorBtn}
            disabled={sortOption === "author"}
          >
            Author A-Z
          </button>
          <button
            type="button"
            onClick={sortTitleBtn}
            disabled={sortOption === "title"}
          >
            Title A-Z
          </button>
        </div>
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
