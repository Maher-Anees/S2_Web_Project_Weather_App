import React, { useState } from 'react';
import DisplayWeather from './DisplayWeather';
import $ from 'jquery';

function Weather() {

  //api variable
  const APIKEY = "ac8513722d885e3436d3cb8b583d7553";

  //handle input
  const [form, setForm] = useState({
    City: "",
    Country: "",
    bgImage: ""
  });

  //with empty array
  const [Weather, setWeather] = useState([])

  //location
  function updatelocation(e) {
    e.preventDefault();
    $.ajax({
      url: "https://geolocation-db.com/jsonp",
      jsonpCallback: "callback",
      dataType: "jsonp",
      success: function (location) {
        form.City = location.city;
        document.getElementById("city1").value = form.City;
        weatherData(e);
        //console.log(form.City);
      }
    });
  };

  //fetch weather api data
  async function weatherData(e) {
    e.preventDefault();
    if (form.City == "") {
      alert("Add values");

    } else {
      //city name url
      const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form.City},${form.Country}&appid=${APIKEY}`
      ).then((res) => res.json())
        .then((data) => data);

      setWeather({
        data: data
      });
      
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "City") {
      setForm({ ...form, City: value });
    }

    if (name == "Country") {
      setForm({ ...form, Country: value });
    }

  }

  const enterfunc = (e) => {
    if (e.key === 'Enter') {
      weatherData(e);
    }
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row text-white" style={{'height':'250px'}}>
          <div className="col-lg-4"></div>
          <div className="col-lg-4"><br/><br/><br/><br/><h1 style={{'font-size':'55px'}}>Weather App</h1></div>
          <div className="col-lg-4"></div>
        </div>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div class="input-group mb-3 bg-dark" for="inputdefault" style={{'opacity':'0.5','border-radius':'100px', 'padding':'10px'}}>
              <input type="text" id="city1" style={{'opacity':'1','border-radius':'100px'}} className="form-control text-dark text-center bg-light" name="City" placeholder="Enter City Name" onChange={event => { form.City = event.target.value }} onKeyPress={e => enterfunc(e)} />
              &ensp;
              <div class="input-group-append">
                <button className="btn btn-primary rounded-circle loc-hover" onClick={(e) => updatelocation(e)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cursor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
        {
          Weather.data != undefined ? (
            <div>
              <DisplayWeather data={Weather.data} />
            </div>
          ) : null
        }
        
      </div>

    </div>
  );
}

export default Weather;
