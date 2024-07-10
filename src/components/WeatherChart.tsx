import { Chart } from "react-google-charts";
import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from 'react';


export default function WeatherChart() {

    // Función para convertir de Kelvin a Celsius
    const kelvinToCelsius = (kelvin) => kelvin - 273.15;
    const [chartData, setChartData] = useState([]);


    const fetchData = async () => {
        try {
            let API_KEY = "99c0885b0db68333a6d8ca4b5ef6a7ae"

            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
            const text = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");
            
            // Aquí puedes procesar el XML como desees. Por ejemplo, obtener un valor específico:
            //setData(yourValue);

            const forecastNodes = xmlDoc.getElementsByTagName('time');
        
            var data = [['Time', 'Temperature (°C)', 'Humidity (%)']];

            for (let i = 0; i < forecastNodes.length; i++) {
                const timeNode = forecastNodes[i];
                const from = timeNode.getAttribute('from');
                const temperatureNode = timeNode.getElementsByTagName('temperature')[0];
                const humidityNode = timeNode.getElementsByTagName('humidity')[0];

                const temperature = kelvinToCelsius(parseFloat(temperatureNode.getAttribute('value')));
                const humidity = parseFloat(humidityNode.getAttribute('value'));
                const formattedDate = new Date(from).toLocaleString();
                
                data.push([formattedDate, temperature, humidity]);

            } 

            data = data.slice(0, 10);
            return data;
        }   
        catch (error) {
          console.error("Error fetching XML:", error);
        }
      };
      
    const options = {
        title: "Weather Data",
        curveType: "function",
        legend: { position: "bottom" },
    };
      
    // Efecto para cargar los datos del gráfico una vez que el componente se ha montado
    useEffect(() => {
        fetchData().then(data => {
            setChartData(data);
        });
    }, []); // El segundo argumento vacío [] indica que este efecto se ejecuta solo una vez después del montaje inicial


    return(
        <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={chartData}
      options={options}
    />
    )
}	