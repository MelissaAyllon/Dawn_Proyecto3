import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from '@mui/material/Typography';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import './App.css';

function App() {
    const [indicators, setIndicators] = useState([]);
    const [rowsTable, setRowsTable] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [sunData, setSunData] = useState([]);

    useEffect(() => {
        (async () => {
            let savedTextXML: (string)= localStorage.getItem("openWeatherMap") ?? "";
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
                const rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1];

                const windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code");
                
                const kelvinToCelsius = (kelvin) => kelvin - 273.15;
                const feelsLike = kelvinToCelsius(timeElement.getElementsByTagName("feels_like")[0].getAttribute("value")).toFixed(2) + "°C";

                const humedad = timeElement.getElementsByTagName("humidity")[0].getAttribute("value") + "%";
                
                const precipitation = (parseFloat(timeElement.getElementsByTagName("precipitation")[0].getAttribute("probability")) * 100).toFixed(2) + "%";
                
                return { "rangeHours": rangeHours, "windDirection": windDirection, "feelsLike": feelsLike, "humidity": humedad, "precipitation": precipitation};
            });

            arrayObjects = arrayObjects.slice(0, 8);

            setRowsTable(arrayObjects);

            const objectoSun = [];
            const convertToLocalTime = (isoString: string): string => {
                const date = new Date(isoString);
                
                // Ajusta la hora según la zona horaria de Guayaquil (GMT-5)
                const offset = -5 * 60 * 60 * 1000; // Calcula el offset en milisegundos
                const localTime = new Date(date.getTime() + offset); // Aplica el offset para convertir a la hora local de Guayaquil

                // Formatea la hora local según el formato deseado
                const options: Intl.DateTimeFormatOptions = {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false // Formato de 24 horas
                };

                return localTime.toLocaleString('en-US', options);
            };

            //DATA AMANECER
            const sunrise = xml.getElementsByTagName("sun")[0].getAttribute("rise");
            const sunriseDate = sunrise.split("T")[0];
            let sunriseTime = sunrise.split("T")[1];
            sunriseTime = convertToLocalTime(sunrise);
            objectoSun.push(["Amanecer", sunriseTime, sunriseDate ]);

            //DATA ATARDECER
            const sunset = xml.getElementsByTagName("sun")[0].getAttribute("set");
            const sunsetDate = sunset.split("T")[0];
            let sunsetTime = sunset.split("T")[1];
            sunsetTime = convertToLocalTime(sunset);
            objectoSun.push(["Atardecer", sunsetTime, sunsetDate ]);
            
            const sunDataIndicators = Array.from(objectoSun).map(
                (element) => <Summary title={element[0]} hora={element[1]} fecha={element[2]} />
            );
            setSunData(sunDataIndicators);
        })();
    }, []);

    return (
        <Grid container spacing={5}>

            <Grid xs={12} lg={12}>
                    <Typography component="h6" variant="h3" color="primary">
                        WEATHER FORECAST
                    </Typography>
            </Grid>

            <Grid lg={12}>
                <Divider sx={{ bgcolor: "black" }} />
            </Grid>

            <Grid container lg={12}>
                <Grid lg={6}>
                    <Typography component="h6" variant="h4" color="black">
                        GUAYAQUIL
                    </Typography>
                </Grid>
                <Grid lg={6}>
                    <ControlPanel setSelectedDate={setSelectedDate} />
                </Grid>
            </Grid>

            <Grid xs={12} lg={12}>
                <WeatherChart selectedDate={selectedDate} />
            </Grid>

            <Grid container lg={12}>
                <Grid container lg={6}>
                    <Grid lg={12}>
                        {indicators[0]}
                    </Grid>
                    <Grid lg={12}>
                        {indicators[1]}
                    </Grid>
                    <Grid lg={12}>
                        {indicators[2]}
                    </Grid>
                    <Grid lg={12}>
                        {indicators[3]}
                    </Grid>
                </Grid>
                <Grid lg={6} spacing={9}>
                    <Grid lg={12}>
                        {sunData[0]}
                    </Grid>
                    <Grid lg={12}>
                        {sunData[1]}
                    </Grid>
                </Grid>
            </Grid>

            <BasicTable rows={rowsTable} />


        </Grid>
    );
}

export default App;
