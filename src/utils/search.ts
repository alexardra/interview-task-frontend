const clean = (value?: string) => {
  if (!value) return value
  return value.toString().toLowerCase().trim()
}

export default function search<T>(
  items: T[],
  query: string,
  drill: (item: T) => string
) {
  const cleanQuery = clean(query)
  if (!cleanQuery) return items

  return items.filter((item) => clean(drill(item))?.includes(cleanQuery))
}
