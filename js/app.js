import OPENWEATHER_API from "../openweather-api.js";

const wheatherApp = (function() {
  'use strict'
  const inputQuery = document.getElementById('input-container__query');
  const btnSearch = document.querySelector('.btn-search');
  const initialContainer = document.querySelector('.initial-container');
  const responseContainer = document.querySelector('.response-container');
  const loadingBox = document.querySelector('.loading-box');
  const initialMsg = document.querySelector('.initial-msg');
  const locationCity = document.querySelector('.location__city');
  const temperatureValue = document.querySelector('.temperature__value');
  const descriptionImage = document.querySelector('.description__image');
  const descriptionValue = document.querySelector('.description__value');
  const feelingValue = document.querySelector('.feeling__value');
  const umidityValue = document.querySelector('.umidity__value');
  const windValue = document.querySelector('.wind__value');

  let finishedLoading = false;
  btnSearch.addEventListener('click', handleSearching);

  async function handleSearching(){
    finishedLoading = false;
    handleLoadAnimation();
    let query = inputQuery.value.trim();
    const request = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${OPENWEATHER_API}`;
    const response = await fetch(request);
    if(!response.ok) {
      alert('An error has occured! Check if the location name is right and try again');
      handleLoadAnimation(true);
      return;
    }
    const data = await response.json();
    insertDataInDOM(data)
      .then(() => {
        finishedLoading = true;
        handleLoadAnimation();
      })
      .catch(() => {
        alert(`The data couldn't be displayed!`);
      })
  }
  function insertDataInDOM({ weather, main:{ temp, feels_like:feeling, humidity}, wind:{ speed:wind}, name:city }){
    return new Promise((resolve, reject) => {
      try{
        locationCity.textContent = city;
        temperatureValue.textContent = temp.toFixed(1);
        feelingValue.textContent = feeling.toFixed(1);
        umidityValue.textContent = humidity;
        windValue.textContent = wind;
        descriptionValue.textContent = weather[0]['description'];
        const icon = `http://openweathermap.org/img/wn/${weather[0]['icon']}@2x.png`;
        descriptionImage.setAttribute('src', icon);
        setTimeout(() => { resolve(); }, 750);
      } catch { reject(); }
    })
  }
  function handleLoadAnimation(errorOcurred){
    if(errorOcurred){
      loadingBox.classList.remove('--active');
      return;
    }
    if(finishedLoading) {
      loadingBox.classList.remove('--active');
      initialContainer.classList.add('--disabled');
      initialMsg.classList.add('--disabled');
      if(responseContainer.classList.contains('--enabled')) {
        const animationFunction = () => {
          responseContainer.style.animation = 'changeContent 800ms ease-in-out';
        }
        const removeEvtListener = () => {
          requestAnimationFrame(() => { responseContainer.style.animation = ''; });
          responseContainer.removeEventListener('animationend', removeEvtListener);
        }
        responseContainer.addEventListener('animationend', removeEvtListener);
        requestAnimationFrame(animationFunction);
      } else {
        const transitionFunction = () => {
          responseContainer.classList.add('--enabled');
        }
        const removeEvtListener = () => {
          responseContainer.style.overflow = 'visible'; 
          responseContainer.removeEventListener('transitionend', removeEvtListener);
        }
        responseContainer.addEventListener('transitionend', removeEvtListener);
        requestAnimationFrame(transitionFunction);
      }
    } else {
      requestAnimationFrame(() => { 
        loadingBox.classList.add('--active');
        initialContainer.classList.remove('--disabled');
      });
    }
  }
  return { handleSearching }
})();




