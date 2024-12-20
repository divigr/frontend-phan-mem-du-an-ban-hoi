const getCurrentMonth = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Add leading zero if needed
  return `${year}-${month}`
}

export default getCurrentMonth
