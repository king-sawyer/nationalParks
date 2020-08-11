"use strict"

const searchUrl = "https://developer.nps.gov/api/v1/parks?"
const key = "Uv8LQEZgoiYEDcaiDOsGHTUxPa98tKNPoifxPZHX"

//this function waits for the user to click submit
function waitForClick(){

  $('#searchValButt').on('click', e=>{

      $('#hiddenClass').removeClass("hidden");

    const max = $('#searchVal').val();
    const code = $('#stateCode').val();
    event.preventDefault();
    searchForParks(max, code)  })
}

function formatQueryParams(params){

const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');

}


//this funciton uses fetch to find parks in the state
function searchForParks(max, code){

  const params = {
  api_key: key,
  stateCode: code,
  limit: max

}

const resultQuery = formatQueryParams(params);
const url = searchUrl + resultQuery;

fetch(url)
.then(response => response.json())
.then(data => updateDOM(data, max))
.catch(err => {
      $('body').text(`Something went wrong: ${err.message}. Please refresh browser`);
    })

}

function updateDOM(data, max){
  console.log(data);

  $('.list').html(" ")
for(let i=0;i<data.total & i<max;i++){
  $('.list').append(`
  <li class="park">
   <h4> Park Name: ${data.data[i].fullName}</h4>
    <strong>Description:</strong> ${data.data[i].description}<br>
    <strong> Website: </strong> <a href="${data.data[i].url}">${data.data[i].url}</a>
    
  </li>
  <br>
  `)
}

}



$(waitForClick())
