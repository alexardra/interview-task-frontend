import prepand from "./prepand"

const convertToDate = function (date: string) {
  return new Date("1970-01-01T" + date + "Z")
}

export default function dateComparer(a: string, b: string) {
  const dateA = convertToDate(prepand(a, 5))
  const dateB = convertToDate(prepand(b, 5))

  return dateA.getTime() - dateB.getTime()
}
