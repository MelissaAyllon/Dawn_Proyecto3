import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect } from 'react';

export default function ControlPanel({ setSelectedDate }) {

    const [dias, setDias] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                let API_KEY = "99c0885b0db68333a6d8ca4b5ef6a7ae";
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
                const text = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, "text/xml");
                var dias = [];
                const forecastNodes = xmlDoc.getElementsByTagName('time');
                
                for (let i = 0; i < forecastNodes.length; i++) {
                    const timeNode = forecastNodes[i];
                    const from = timeNode.getAttribute('from');
                    const date = from.split("T")[0];

                    if (!dias.includes(date)) {
                        dias.push(date);
                    }
                }
                setDias(dias);
            } catch (error) {
                console.error("Error fetching xml:", error);
            }
        };
        fetchdata();
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedDate(event.target.value);
    };

    let optiones2 = dias.map((item, key) => <MenuItem key={key} value={item}>{item}</MenuItem>);

    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography mb={2} component="h3" variant="h6" color="primary">
                Pronóstico
            </Typography>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Elige día</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        label="Variables"
                        defaultValue=''
                        onChange={handleChange}
                    >
                        <MenuItem key="-1" value="" disabled>Seleccione un día</MenuItem>
                        {optiones2}
                    </Select>
                </FormControl>
            </Box>
            
        </Paper>
    );
}
