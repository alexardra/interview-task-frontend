const prepandZero = function (date: string) {
  return date.length === 4 ? `0${date}` : date
}

const convertToDate = function (date: string) {
  return new Date("1970-01-01T" + date + "Z")
}

export default function dateComparer(a: string, b: string) {
  const dateA = convertToDate(prepandZero(a))
  const dateB = convertToDate(prepandZero(b))

  return dateA.getTime() - dateB.getTime()
}
