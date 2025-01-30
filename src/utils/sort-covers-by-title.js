export const sortCoversByTitle = (covers) => {
  return covers.sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  )
}
