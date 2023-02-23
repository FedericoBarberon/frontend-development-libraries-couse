export const getRandomNumber = (extend = 1) => {
  const number = Math.ceil(Math.random() * extend)
  return number
}
