import { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Grid>
      <Grid>1</Grid>
      <Grid>2</Grid>
      <Grid>3</Grid>
      <Grid>4</Grid>
      <Grid>5</Grid>
      <Grid>6</Grid>
	  </Grid>
  )
}

export default App
