export const sortCoversByAuthor = (covers) => {
  return covers.sort((a, b) =>
    a.authorLastName.toLowerCase().localeCompare(b.authorLastName.toLowerCase())
  )
}
