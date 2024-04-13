const urlBase = 'https://api.openweathermap.org/data/2.5/weather?q='
const urlEnd = '&appid=f79575b96b915436a3d621165e418635&units=metric'

const archivDb = 'https://sdaapi.glabazna.eu/weather'

// funkce, která bere město jako argument a vrací objekt s počasím

export const getWeather = async (city) => {
  const data = await fetch(`${urlBase}${city}${urlEnd}`)
  const json = await data.json()
  return json
}


// funkce, která vytahne všechny uložené záznamy

export const getAllData = async () => {
  const data = await fetch(archivDb)
  const json = await data.json()
  return json
}


// funkce, která přidá nový záznam do databáze