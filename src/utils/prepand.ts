export default function prepand(
  value: string,
  expectedLength: number,
  char = "0"
) {
  if (value.length >= expectedLength) return value

  const prefix = char.repeat(expectedLength - value.length)
  return prefix + value
}
