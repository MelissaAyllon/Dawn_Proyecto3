import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import sunrise from '../assets/sunrise.jpeg'

interface ConfigSunData {
    title?: string;
    hora?: string;
    fecha?: string;
}

export default function Summary(data: ConfigSunData) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={sunrise}
                    alt="Amanecer"
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