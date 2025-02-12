import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import { sortCoversByTitle } from "../utils/sort-covers-by-title"
import { sortCoversByAuthor } from "../utils/sort-covers-by-author"
import Loading from "../components/Loading"
import PageTitle from "../components/PageTitle"

function About() {
  const covers = useLoaderData() // Expecting the array of covers directly

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

    const coverElements = sortedCovers.map((cover) => {
      return (
        <li key={cover.id}>
          <h3>{cover.slug}</h3>
          <a
            href={cover.imgSrc}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cover.imgSrcCopy}
          </a>
        </li>
      )
    })
    return <ul className="sources-list flow">{coverElements}</ul>
  }
  return (
    <>
      <PageTitle title="About | Alt-Penguin Classics" />
      <main
        id="main-content"
        className="main-content"
      >
        <div className="about container flow">
          <h1>About</h1>
          <p>
            Who wouldn&apos;t love a job where finding evocative cover images
            for classic books was part of the work? Unfortunately, I have no
            such job, but here are my unpaid efforts. I&apos;ll be adding more
            covers as and when inspiration strikes.
          </p>

          <p>
            Note: These covers were made using the{" "}
            <a
              href="https://penguin.jos.ht/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-external"
            >
              Penguin Classics Cover Generator
            </a>
            .
          </p>

          <h2>Image sources</h2>
          <p>
            Every image on these book covers has been adapted from screenshots
            or cropped versions of original images. Follow the links below to
            see the unedited originals.
          </p>
          <p>All links open in a new tab/window.</p>
          <div className="filters">
            <h3>Sort by: </h3>
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
            <Loading title="Cover image sources" />
          )}
          <h2>Disclaimer</h2>
          <p>
            This site is not affiliated with Penguin Books Limited. All
            trademarks<sup>*</sup>, copyrights and images are the property of
            their respective owners.
          </p>
        </div>
      </main>
    </>
  )
}

export default About
