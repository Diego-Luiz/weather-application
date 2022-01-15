import WEATHERSTACK_API from "../weatherstack-api.js";

const wheatherApp = (function() {
  const inputQuery = document.getElementById('input-container__query');
  const btnSearch = document.querySelector('.btn-search');
  const resultContainer = document.querySelector('.result-container');
  const locationCity = document.querySelector('.location__city');
  const locationCountry = document.querySelector('.location__country');
  const locationRegion = document.querySelector('.location__region');
  const temperatureValue = document.querySelector('.temperature__value');
  const descriptionImgBox = document.querySelector('.description-img-box');
  const descriptionValue = document.querySelector('.description__value');
  const feelingValue = document.querySelector('.feeling__value');
  const umidityValue = document.querySelector('.umidity__value');
  const windValue = document.querySelector('.wind__value');

  const errorsMap = new Map([
    [404, 'The searched term was not found'],
    [101, `The access key is invalid or wasn't found`], 
    [104, `The app can't make any more requests`], 
    [601, 'The searched term was not found or the input is empty'],
    [615, 'The app request has failed']
  ]);

  btnSearch.addEventListener('click', handleSearching);
  let example = `{"request":{"type":"City","query":"Ponta Pora, Brazil","language":"en","unit":"m"},"location":{"name":"Ponta Pora","country":"Brazil","region":"Mato Grosso do Sul","lat":"-22.533","lon":"-55.717","timezone_id":"America\/Campo_Grande","localtime":"2022-01-14 10:38","localtime_epoch":1642156680,"utc_offset":"-4.0"},"current":{"observation_time":"02:38 PM","temperature":26,"weather_code":122,"weather_icons":["https:\/\/assets.weatherstack.com\/images\/wsymbols01_png_64\/wsymbol_0004_black_low_cloud.png"],"weather_descriptions":["Overcast"],"wind_speed":22,"wind_degree":360,"wind_dir":"N","pressure":1019,"precip":0,"humidity":74,"cloudcover":100,"feelslike":27,"uv_index":7,"visibility":10,"is_day":"yes"}}`;
  
  async function handleSearching(){
    let query = inputQuery.value.trim();
    const request = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API}&query=${query}&units=m`;
    const response = await fetch(request);
    if(!response.ok) {
      alert('Error during the requisition');
      return;
    }
    const data = await response.json();
    if(data.error !== undefined){
      let { error:{ code } } = data;
      let message = errorsMap.get(code) === undefined ? `An error with the app has occured, please try again or contact the owner` : errorsMap.get(code);
      alert(`Error in the API: ${message}`);
      return;
    }
    insertDataInDOM(data);
  }
  function insertDataInDOM({ current:{ temperature,  feelslike, humidity, weather_descriptions:wDescriptions, weather_icons:wIcons, wind_speed}, location:{ name:city, country, region } }){
    locationCity.textContent = `${city},`;
    if(region !== undefined && region !== '') locationRegion.textContent = region;
    else locationRegion.classList.add('--no-region');
    locationCountry.textContent = country;
    temperatureValue.textContent = temperature;
    feelingValue.textContent = feelslike;
    umidityValue.textContent = humidity;
    windValue.textContent = wind_speed;
    let textDescription = '';
    wDescriptions.forEach((element) => {
      textDescription += element;
    })
    descriptionValue.textContent = textDescription;
    const iconsFragment = document.createDocumentFragment();
    let image = undefined;
    wIcons.forEach((element) => {
      image = document.createElement('img');
      image.setAttribute('src', element);
      image.setAttribute('alt', '');
      image.setAttribute('role', 'presentation');
      image.className = 'description__image';
      iconsFragment.appendChild(image);
    })
    descriptionImgBox.appendChild(iconsFragment);
  }
  return { handleSearching }
})();




