import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useRef, useEffect } from 'react';


 export default function ControlPanel() {
     {/* Variable de estado y función de actualización */}

     let [selected, setSelected] = useState(-1)
     const descriptionRef = useRef<HTMLDivElement>(null);
     const [dias, setDias] = useState([]);

     {/* Datos de los elementos del Select */}
    
     let items = [
         {"name":"Precipitación", "description":"Cantidad de agua, en forma de lluvia, nieve o granizo, que cae sobre una superficie en un período específico."}, 
         {"name": "Humedad", "description":"Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje."}, 
         {"name":"Nubosidad", "description":"Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida."}
     ]

     useEffect( () => { 
        const fetchdata = async() => {
        try{
            let API_KEY = "99c0885b0db68333a6d8ca4b5ef6a7ae"

            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
            const text = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");
            
            // Aquí puedes procesar el XML como desees. Por ejemplo, obtener un valor específico:
            //setData(yourValue);
            var dias = [];
            const forecastNodes = xmlDoc.getElementsByTagName('time');
            //Quiero sacar todas las fechas de time tags y ponerla en un arreglo pero que esta fecha sea unica

            for (let i=0; i<forecastNodes.length; i++){
                const timeNode = forecastNodes[i]
                const from = timeNode.getAttribute('from');
                const date = from.split("T")[0]; //Obtengo la fecha

                if (!dias.includes(date)) {
                    dias.push(date);
                }   
            }
            setDias(dias);
        }
        catch{
            console.error("Error fetchng xml:", Error);
        }
     }
     fetchdata()
    }, []
    )
    //let options = items.map( (item, key) => <MenuItem key={key} value={key}>{item["name"]}</MenuItem> )
    let optiones2 = dias.map((item, key) => <MenuItem key={key} value={key}>{item}</MenuItem> )
     {/* Manejador de eventos */}
		
     const handleChange = (event: SelectChangeEvent) => {

        let idx = parseInt(event.target.value)
        setSelected( idx );

        {/* Modificación de la referencia */}

        if (descriptionRef.current !== null) {
            descriptionRef.current.innerHTML = (idx >= 0) ? items[idx]["description"] : ""
        }

    };

     {/* JSX */}

     return (
         <Paper
             sx={{
                 p: 2,
                 display: 'flex',
                 flexDirection: 'column'
             }}
         >

             <Typography mb={2} component="h3" variant="h6" color="primary">
                Pronostico
             </Typography>

             <Box sx={{ minWidth: 120 }}>
					
                 <FormControl fullWidth>
                     <InputLabel id="simple-select-label">Elige dia</InputLabel>
                     <Select
                         labelId="simple-select-label"
                         id="simple-select"
                         label="Variables"
                         defaultValue='-1'
                         onChange={handleChange}
                     >
                         <MenuItem key="-1" value="-1" disabled>Seleccione un dia</MenuItem>

                         {optiones2}

                     </Select>
                 </FormControl>

             </Box>
             
             {/* Muestra la descripción de la variable seleccionada */}
             <Typography ref={descriptionRef} mt={2} component="p" color="text.secondary">
             {
                 (selected >= 0)?items[selected]["description"]:""
             }
             </Typography>



         </Paper>


     )
 }