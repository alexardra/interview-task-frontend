export default function unique<T>(items: T[]): T[] {
  return [...new Set(items)]
}
