import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import sunrise from '../assets/Amanecer.jpg'
import sunset from '../assets/sunset.jpg'

interface ConfigSunData {
    title?: string;
    hora?: string;
    fecha?: string;
}

export default function Summary(data: ConfigSunData) {
    return (
        <Card sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="165"
                    image={data.title === "Amanecer" ? sunrise : sunset}
                />
                <CardContent>
                    <Typography gutterBottom component="h2" variant="h6" color="primary">
                        {data.title}
                    </Typography>
                    <Typography component="p" variant="h4">
                        {data.hora}
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                        {data.fecha}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}