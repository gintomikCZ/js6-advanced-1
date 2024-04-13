import { getWeather } from './getWeather.js'

let inputFromUser

let globalData

const get2Decimals = (num) => {
  return num < 10 ? '0' + num : '' + num
}

document.getElementById('city').addEventListener('focus', () => {
  const errorMsg = document.querySelector('.error-msg')
  errorMsg.classList.remove('visible')
})

const renderError = (msg) => {
  const errorMsg = document.querySelector('.error-msg')
  errorMsg.textContent = msg
  errorMsg.classList.add('visible')
}


const renderData = async (city) => {
  // const ul = document.querySelector('ul')
  const data = await getWeather(city)
  // console.log(data)
  globalData = data
  if (data.cod === '404') {
    return renderError('this city has not been found')
  }
  // pokud město existuje a máme data OK
  const temp = `${Math.round(data.main.temp)} °C`
  const values = [data.name, temp, data.weather[0].description]

  const secondDivs = Array.from(document.querySelectorAll('li div:nth-child(2)'))
  secondDivs.forEach((div, index) => {
    div.textContent = values[index]
  })
  document.querySelector('section:nth-child(2)').style.display = 'flex'
}

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  inputFromUser = document.getElementById('city').value
  if (!inputFromUser) {
    return renderError('the city name is required')
  }
  renderData(inputFromUser)
})

const btn = document.querySelector('div > button')
btn.addEventListener('click', async () => {
  const dt = new Date()
  const date = dt.getFullYear() + '-' + get2Decimals(dt.getMonth() + 1) + '-' + get2Decimals(dt.getDate())
  const time = get2Decimals(dt.getHours()) + ':' + get2Decimals(dt.getMinutes()) + ':' + get2Decimals(dt.getSeconds())
  const body = {
    date,
    time,
    city: globalData.name,
    temperature: Math.round(globalData.main.temp),
    description: globalData.weather[0].description
  }
  const response = await fetch('https://sdaapi.glabazna.eu/weather', {
    method: 'POST',
    body: JSON.stringify(body)
  })
  const json = await response.json()
  console.log(json)
})
