//Импортируем первый блин на React Yo!
import React, { Component } from 'react';
import './App.css';
import "bootswatch/dist/sketchy/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

//Массив с обращениями по формату на сайте хостинга API
const PLACES = [
  { name: "Berlin", zip: "10585" },
  { name: "Moskow", zip: "119002" },
  { name: "Piter", zip: "190000" },
  { name: "Pribrezhnoye", zip: "236960" }
];

//Компонент Преобразование функции в класс
class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
//Погода JSON
//Метод вызываемый по готовности примера компонента в дом
componentDidMount() {
    const zip = this.props.zip;
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${zip}&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial`;

//Протокольный интерфейс 
 // Интерфейс запросов http - babel - function - json 
    fetch(URL).then(res => res.json()).then(json => {
      //Facebookology
      this.setState({ weatherData: json });
    });
  }

//UI
render() {
    const weatherData = this.state.weatherData;
//Условие инициализации состояния
    if (!weatherData) return <div>Loading</div>;
    // Массив элементов списков
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  }
}

//Состояние Главного компонента
class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    //BootstrapElements
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Weather Man
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
              <Nav
                marginBottom="0"
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;