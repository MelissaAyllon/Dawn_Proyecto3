import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from '@mui/material/Typography';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [indicators, setIndicators] = useState([]);
    const [rowsTable, setRowsTable] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        (async () => {
            let savedTextXML: (string)= localStorage.getItem("openWeatherMap");
            const expiringTime = localStorage.getItem("expiringTime");

            const nowTime = (new Date()).getTime();

            if (expiringTime === null || nowTime > parseInt(expiringTime)) {
                const API_KEY = "99c0885b0db68333a6d8ca4b5ef6a7ae";
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
                savedTextXML = await response.text();

                const hours = 1;
                const delay = hours * 3600000;

                localStorage.setItem("openWeatherMap", savedTextXML);
                localStorage.setItem("expiringTime", (nowTime + delay).toString());
            }

            const parser = new DOMParser();
            const xml = parser.parseFromString(savedTextXML, "application/xml");

            const dataToIndicators = [];

            const location = xml.getElementsByTagName("location")[1];

            const city = xml.getElementsByTagName("name")[0].innerHTML;
            dataToIndicators.push(["City", "name", city]);

            const geobaseid = location.getAttribute("geobaseid");
            dataToIndicators.push(["Location", "geobaseid", geobaseid]);

            const latitude = location.getAttribute("latitude");
            dataToIndicators.push(["Location", "Latitude", latitude]);

            const longitude = location.getAttribute("longitude");
            dataToIndicators.push(["Location", "Longitude", longitude]);

            console.log(dataToIndicators);
            const indicatorsElements = Array.from(dataToIndicators).map(
                (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
            );

            setIndicators(indicatorsElements);

            //Obtener la fecha actual
            const forecastNodes = xml.getElementsByTagName('time');
            const date_hoy = forecastNodes[0].getAttribute('from').split("T")[0];
            setSelectedDate(date_hoy);


            let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {
                let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1];

                let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code");
                
                const kelvinToCelsius = (kelvin) => kelvin - 273.15;
                let feelsLike = kelvinToCelsius(timeElement.getElementsByTagName("feels_like")[0].getAttribute("value")).toFixed(2) + "°C";

                let humedad = timeElement.getElementsByTagName("humidity")[0].getAttribute("value") + "%";
                
                let precipitation = (parseFloat(timeElement.getElementsByTagName("precipitation")[0].getAttribute("probability")) * 100).toFixed(2) + "%";
                
                return { "rangeHours": rangeHours, "windDirection": windDirection, "feelsLike": feelsLike, "humidity": humedad, "precipitation": precipitation};
            });

            arrayObjects = arrayObjects.slice(0, 8);

            setRowsTable(arrayObjects);
        })();
    }, []);

    return (
        <Grid container spacing={5}>
            <Grid xs={12} sm={12} lg={12} xl={12}>
                <Typography component="h6" variant="h3" color="white">
                    Weather App
                </Typography>
            </Grid>

            <Grid xs={6} sm={4} md={3} lg={2}>
                {indicators[0]}
            </Grid>

            <Grid xs={6} sm={4} md={3} lg={2}>
                {indicators[1]}
            </Grid>

            <Grid xs={6} sm={4} md={3} lg={2}>
                {indicators[2]}
            </Grid>

            <Grid xs={6} sm={4} md={3} lg={2}>
                {indicators[3]}
            </Grid>

            <Summary />

            <BasicTable rows={rowsTable} />

            <Grid xs={12} lg={2}>
                <ControlPanel setSelectedDate={setSelectedDate} />
            </Grid>

            <Grid xs={12} lg={10}>
                <WeatherChart selectedDate={selectedDate} />
            </Grid>

        </Grid>
    );
}

export default App;
