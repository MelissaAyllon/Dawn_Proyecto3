import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from '@mui/material/Typography';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart'; 
import ControlPanel from './components/ControlPanel';
import { useEffect, useState } from 'react';
import './App.css'

function App() {	
      let [indicators, setIndicators] = useState([])
      let [rowsTable, setRowsTable] = useState([])

      useEffect(

      ()=>{ (async() => {

        {/* Del LocalStorage, obtiene el valor de las claves openWeatherMap y expiringTime */}

        let savedTextXML = localStorage.getItem("openWeatherMap")
        let expiringTime = localStorage.getItem("expiringTime")

        {/* Estampa de tiempo actual */}

        let nowTime = (new Date()).getTime();

        {/* Realiza la petición asicrónica cuando: 
             (1) La estampa de tiempo de expiración (expiringTime) es nula, o  
             (2) La estampa de tiempo actual es mayor al tiempo de expiración */}

        if(expiringTime === null || nowTime > parseInt(expiringTime)) {

          let API_KEY = "99c0885b0db68333a6d8ca4b5ef6a7ae"
          let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
          savedTextXML = await response.text();



          {/* Diferencia de tiempo */}

          let hours = 1
          let delay = hours * 3600000

          {/* En el LocalStorage, almacena texto en la clave openWeatherMap y la estampa de tiempo de expiración */}

          localStorage.setItem("openWeatherMap", savedTextXML)
          localStorage.setItem("expiringTime", (nowTime + delay ).toString() )
        }

        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");

        let dataToIndicators = new Array()


        let location = xml.getElementsByTagName("location")[1]

        let city = xml.getElementsByTagName("name")[0].innerHTML
        dataToIndicators.push(["City","name",city])

        let geobaseid = location.getAttribute("geobaseid")
        dataToIndicators.push(["Location","geobaseid", geobaseid])

        let latitude = location.getAttribute("latitude")
        dataToIndicators.push(["Location","Latitude", latitude])

        let longitude = location.getAttribute("longitude")
        dataToIndicators.push(["Location","Longitude", longitude])

        console.log( dataToIndicators )
        let indicatorsElements = Array.from(dataToIndicators).map(
          (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
        ) 
        setIndicators(indicatorsElements)


        let arrayObjects = Array.from( xml.getElementsByTagName("time") ).map( (timeElement) =>  {
				
          let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1]

          let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " "+  timeElement.getElementsByTagName("windDirection")[0].getAttribute("code") 
     
          return { "rangeHours": rangeHours,"windDirection": windDirection }
   
        })

        arrayObjects = arrayObjects.slice(0,8)
  
        {/* 3. Actualice de la variable de estado mediante la función de actualización */}

        setRowsTable(arrayObjects)
        
        })()
        }

  ,  
      []
  )

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
        {/* De este grid, coloco los demás dentro porque */ }
        <Grid xs={6} sm={4} md={3} lg={12} sx={{paddingBottom:"5"}}>
          <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
        </Grid>
        <Grid xs={6} sm={4} md={3} lg={12} sx={{paddingBottom:"5"}}>
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

      <Summary>

      </Summary>

      <BasicTable rows={rowsTable}>
        
      </BasicTable>

      <Grid xs={12} lg={2}>
        <ControlPanel />
      </Grid>

            
      <Grid xs={12} lg={10}>
        <WeatherChart></WeatherChart>
      </Grid>
      
	  </Grid>
  )
}

export default App
