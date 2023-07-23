export default function sortedPush<T>(
  arr: T[],
  item: T,
  compareFunction: (a: T, b: T) => number,
  low = 0
) {
  const length = arr.length

  let high = length - 1
  let mid = 0

  if (length === 0) {
    arr.push(item)
    return 0
  }
  let lastMidDoc = arr[mid]

  while (low <= high) {
    // https://github.com/darkskyapp/binary-search
    // http://googleresearch.blogspot.com/2006/06/extra-extra-read-all-about-it-nearly.html
    mid = low + ((high - low) >> 1)
    lastMidDoc = arr[mid]
    if (compareFunction(lastMidDoc, item) <= 0.0) {
      // searching too low
      low = mid + 1
    } else {
      // searching too high
      high = mid - 1
    }
  }

  if (compareFunction(lastMidDoc, item) <= 0.0) {
    mid++
  }

  /**
   * Insert at correct position
   */
  arr.splice(mid, 0, item)

  return mid
}
