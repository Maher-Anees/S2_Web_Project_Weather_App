import React from 'react';

function DisplayWeather(props) {

    //console.log("props", props);
    const { data } = props;
    console.log(data);
    const iconurl = "http://openweathermap.org/img/wn/" + `${data.cod != 404 ? data.weather[0].icon : null}` + ".png";

    return (
        <div>
        {
            data.cod != 404 ? (
        <React.Fragment>
            <div className="row text-white" style={{'height':'250px', 'padding-left':'5%'}}>
                <strong>
                    <br />
                    <h1 style={{'font-size':'60px'}}>
                        {data.name}, {data.sys.country}
                    </h1>
                    <h4>
                        {new Date().toDateString()}
                    </h4>
                </strong>
            </div>
            <div className="row text-white" style={{'height':'250px'}}>
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-3">
                            <img src={iconurl} className="weather-icon" style={{'background-color':'rgb(255, 255, 255, 0.6)', 'border-radius':'100px'}} alt="" width="130" />
                        </div>
                        <div className="col-lg-3">
                            <strong>
                                <h1 style={{'font-size':'100px'}}>{Math.floor(data.main.temp - 273.15)}
                                    <sup>o</sup>
                                </h1>
                                <span className="weather-main" style={{'font-size':'20px'}}>{data.weather[0].main}{", "}{data.weather[0].description}</span>
                            </strong>
                        </div>
                        <div className="col-lg-3"></div>
                    </div>
                </div>
                <div className="col-lg-6 text-light">
                    <div className="container" style={{'background-color':'rgb(255, 255, 255, 0.4)', 'border-radius':'20px'}}>
                        <br/>
                        <div className="row">
                            <div className="col-lg-3">
                                {Math.floor(data.main.temp_max - 273.15)} / {" "}
                                {Math.floor(data.main.temp_min - 273.15)} <sup>o</sup> C
                                <br />
                                <strong>High / Low</strong>
                            </div>

                            <div className="col-lg-3">
                                {data.main.humidity} %
                                <br />
                                <strong>Humidity</strong>
                            </div>
                            <div className="col-lg-3">
                                {data.main.pressure} hPa
                                <br />
                                <strong>Pressure</strong>
                            </div>
                            <div className="col-lg-3">
                                {data.visibility / 1000} Km
                                <br />
                                <strong>Visibility</strong>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-lg-3">
                            {Math.floor((data.wind.speed * 18) / 5)} Km/hr
                                <br />
                                <strong>Wind</strong>
                            </div>
                            <div className="col-lg-3">
                                {data.wind.deg} <sup>o</sup>deg
                                <br />
                                <strong>Wind Direction</strong>
                            </div>
                            <div className="col-lg-3">
                                {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
                                <br />
                                <strong>Sunrise</strong>
                            </div>
                            <div className="col-lg-3">
                                {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
                                <br />
                                <strong>Sunset</strong>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        </React.Fragment>
        ) : <div className="maincard">
                <h2>{data.message}</h2>
            </div>
        }
        </div>

    );

}
export default DisplayWeather;