import { useLoaderData } from "react-router-dom"
import { sortCoversByTitle } from "../utils/sort-covers-by-title"
import Loading from "../components/Loading"
import PageTitle from "../components/PageTitle"

function About() {
  const covers = useLoaderData() // Expecting the array of covers directly

  const renderCoverElements = (covers = []) => {
    const sortedCovers = sortCoversByTitle(covers)
    const coverElements = sortedCovers.map((cover) => {
      return (
        <li key={cover.id}>
          <h3>{`${cover.title} by ${cover.author}`}</h3>
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
            for classic texts is part of the work? Unfortunately, I have no such
            job, but here are my unpaid efforts. I&apos;ll be adding more covers
            as and when inspiration strikes.
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
          <p>
            <sup>*</sup>Observant site visitors may notice that the Penguin logo
            in the banner has been intentionally reversed.
          </p>
        </div>
      </main>
    </>
  )
}

export default About
