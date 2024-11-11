export const isJSON = (value: any) => {
  return (
    (typeof value === 'object' && value !== null && !Array.isArray(value)) || Array.isArray(value)
  )
}
