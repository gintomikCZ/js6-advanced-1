import { getAllData } from './getWeather.js'

const renderTd = (textContent) => {
  const td = document.createElement('td')
  td.textContent = textContent
  return td
}

const data = await getAllData()
const tbody = document.querySelector('tbody')


//13.04.2024
const formatDate = (dateString) => dateString.split('-').reverse().join('.')

data.data.forEach(item => {
  const tr = document.createElement('tr')
  const time = item.time.slice(0, 5)
  const ar = [formatDate(item.date), time, item.city, item.temperature, item.description]
  ar.forEach(field => {
    tr.appendChild(renderTd(field))
  })
  tbody.appendChild(tr)
})



