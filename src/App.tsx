import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart'; 
import ControlPanel from './components/ControlPanel';
import './App.css'

function App() {
  return (
    <Grid container spacing={5}>
      <Grid xs={12} sm={4} md={3} lg={4}><Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /></Grid>
      <Grid xs={6} sm={4} md={3} lg={4}><Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /></Grid>
      <Grid xs={6} sm={4} md={3} lg={4}><Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /></Grid>
      <Grid xs={12} sm={4} md={3} lg={4}> {/* De este grid, coloco los demás dentro porque */ }
        <Grid xs={6} sm={4} md={3} lg={12} sx={{paddingBottom:"5"}}>
          <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
        </Grid>
        <Grid xs={6} sm={4} md={3} lg={12} sx={{paddingBottom:"5"}}>
          <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
        </Grid>
      </Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>
      </Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>6</Grid>
      <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
      <Summary></Summary>
      <BasicTable></BasicTable>
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
