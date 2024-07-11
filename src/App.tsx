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
    let [indicators, setIndicators] = useState([]);
    let [rowsTable, setRowsTable] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        (async () => {
            let savedTextXML = localStorage.getItem("openWeatherMap");
            let expiringTime = localStorage.getItem("expiringTime");

            let nowTime = (new Date()).getTime();

            if (expiringTime === null || nowTime > parseInt(expiringTime)) {
                let API_KEY = "99c0885b0db68333a6d8ca4b5ef6a7ae";
                let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
                savedTextXML = await response.text();

                let hours = 1;
                let delay = hours * 3600000;

                localStorage.setItem("openWeatherMap", savedTextXML);
                localStorage.setItem("expiringTime", (nowTime + delay).toString());
            }

            const parser = new DOMParser();
            const xml = parser.parseFromString(savedTextXML, "application/xml");

            let dataToIndicators = [];

            let location = xml.getElementsByTagName("location")[1];

            let city = xml.getElementsByTagName("name")[0].innerHTML;
            dataToIndicators.push(["City", "name", city]);

            let geobaseid = location.getAttribute("geobaseid");
            dataToIndicators.push(["Location", "geobaseid", geobaseid]);

            let latitude = location.getAttribute("latitude");
            dataToIndicators.push(["Location", "Latitude", latitude]);

            let longitude = location.getAttribute("longitude");
            dataToIndicators.push(["Location", "Longitude", longitude]);

            console.log(dataToIndicators);
            let indicatorsElements = Array.from(dataToIndicators).map(
                (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
            );
            setIndicators(indicatorsElements);

            let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {
                let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1];

                let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code");

                return { "rangeHours": rangeHours, "windDirection": windDirection };
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

            <Grid xs={12} sm={4} md={3} lg={4}>
                <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
            </Grid>

            <Grid xs={6} sm={4} md={3} lg={4}>
                <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
            </Grid>

            <Grid xs={6} sm={4} md={3} lg={4}>
                <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
            </Grid>

            <Grid xs={12} sm={4} md={3} lg={4}>
                <Grid xs={6} sm={4} md={3} lg={12} sx={{ paddingBottom: "5" }}>
                    <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
                </Grid>
                <Grid xs={6} sm={4} md={3} lg={12} sx={{ paddingBottom: "5" }}>
                    <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
                </Grid>
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

            <Grid xs={6} sm={4} md={3} lg={2}>
                6
            </Grid>

            <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />

            <Summary />

            <BasicTable rows={rowsTable} />

            <Grid xs={12} lg={2}>
                <ControlPanel selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </Grid>

            <Grid xs={12} lg={10}>
                <WeatherChart selectedDate={selectedDate} />
            </Grid>

        </Grid>
    );
}

export default App;
