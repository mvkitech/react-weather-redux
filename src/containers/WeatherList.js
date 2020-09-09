import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from '../components/GoogleMap';
import Chart from '../components/Chart';

const KELVIN_TO_CELCIUS = 273.15;

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temperatures = cityData.list.map((weather) =>
      (weather.main.temp - KELVIN_TO_CELCIUS).toFixed(1)
    );
    const pressures = cityData.list.map((weather) => weather.main.pressure);
    const humidity = cityData.list.map((weather) => weather.main.humidity);
    const wind = cityData.list.map((weather) => weather.wind.speed);
    const { lat, lon } = cityData.city.coord;

    return (
      <tr key={name}>
        <td>
          <GoogleMap lat={lat} lon={lon} />
        </td>
        <td>
          <Chart data={temperatures} color="orange" uom="C" />
        </td>
        <td>
          <Chart data={pressures} color="red" uom="hPa" />
        </td>
        <td>
          <Chart data={humidity} color="blue" uom="%" />
        </td>
        <td>
          <Chart data={wind} color="green" uom="m/s" />
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (C)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
            <th>Wind (m/s)</th>
          </tr>
        </thead>
        <tbody>{this.props.weather.map(this.renderWeather)}</tbody>
      </table>
    );
  }
}

// Weather data returned here shows up as a prop in WeatherList container
function mapStateToProps({ weather }) {
  return { weather };
}

// Promote WeatherList from a component to a container
export default connect(mapStateToProps)(WeatherList);
