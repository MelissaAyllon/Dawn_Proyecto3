import { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
      <Grid xs={6} sm={4} md={3} lg={2}>5</Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>6</Grid>
      <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
      <Summary></Summary>
      <BasicTable></BasicTable>
	  </Grid>
  )
}

export default App
