import WEATHERSTACK_API from "../weatherstack-api";
const wheatherApp = (function() {
  const resultBox = document.querySelector('.result-box')
  let query = 'placentia bay, canada'
  let unit = 'm' //Celsius by default
  let request = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API}&query=${query}&units=${unit}`
  let example = `{"request":{"type":"City","query":"Ponta Pora, Brazil","language":"en","unit":"m"},"location":{"name":"Ponta Pora","country":"Brazil","region":"Mato Grosso do Sul","lat":"-22.533","lon":"-55.717","timezone_id":"America\/Campo_Grande","localtime":"2022-01-14 10:38","localtime_epoch":1642156680,"utc_offset":"-4.0"},"current":{"observation_time":"02:38 PM","temperature":26,"weather_code":122,"weather_icons":["https:\/\/assets.weatherstack.com\/images\/wsymbols01_png_64\/wsymbol_0004_black_low_cloud.png"],"weather_descriptions":["Overcast"],"wind_speed":22,"wind_degree":360,"wind_dir":"N","pressure":1019,"precip":0,"humidity":74,"cloudcover":100,"feelslike":27,"uv_index":7,"visibility":10,"is_day":"yes"}}`
  async function getData(){
    example = await JSON.parse(example)
    console.log(example)
    console.log(example.current.weather_icons)
    // resultBox.innerHTML = example.current.weather_icons
  }
  return { getData }
})();

wheatherApp.getData()


