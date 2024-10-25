const baseUrl = "/alt-penguin-classics"
const dataUrl = `${baseUrl}/data/covers.json`

/**
 * Loader to get the list of all covers
 */
export async function coversLoader() {
  try {
    const response = await fetch(dataUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch covers data: ${response.statusText}`)
    }
    verifyJsonContentType(response)

    const covers = await response.json()
    return covers // Ensure the function returns the covers array directly
  } catch (error) {
    console.error("Error in coversLoader:", error)
    buildErrorObject(error)
  }
}

/**
 * Loader to get details of a specific cover and list of all covers
 */
export async function getCoverDetail({ params }) {
  try {
    const response = await fetch(dataUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch covers data: ${response.statusText}`)
    }
    verifyJsonContentType(response)

    const covers = await response.json()

    const paramsName = params.cover
    const coverName = paramsName
      .replace(/-/g, " ")
      .replace(
        /\w\S*/g,
        (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
      )

    const cover = covers.find((cover) => cover.title === coverName)
    if (!cover) {
      // Throw a 404-like error
      throw {
        message: "Page not found",
        statusText: "Not Found",
        status: 404,
      }
    }

    return { cover, covers }
  } catch (error) {
    console.error("Error in getCoverDetail:", error)
    buildErrorObject(error)
  }
}

/** Helper functions */
// Verify JSON content type
function verifyJsonContentType(response) {
  const contentType = response.headers.get("content-type")
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(`Expected JSON but got: ${contentType}`)
  }
}

// Build and throw an error object
function buildErrorObject(error) {
  throw {
    message: error.message || "An unknown error occurred",
    statusText: error.statusText || "No status text available",
    status: error.status || 500,
  }
}
