import { getRandomNumber } from './getRandomNumber'

const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857']

let lastIndex = 0
let index

export const changeColor = () => {
  do {
    index = getRandomNumber(colors.length) - 1
  } while (lastIndex === index)
  lastIndex = index
  document.documentElement.style.setProperty('--color', colors[index])
}
