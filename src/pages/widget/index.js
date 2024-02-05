import { useEffect, useState } from 'react'

import { Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'

import { Icon } from '@iconify/react'

import api from '../../services/api'

import IconProvider from '../../components/IconProvider'

//---------------------------------------------

export default function Widget(){
    const [icon, setIcon] = useState('') //Icone

    const [imagePath, setImagePath] = useState('') //Imagem de fundo

    const [location, setLocation] = useState('Campinas') //Icone

    const [data, setData] = useState([]) // Informações

    useEffect(()=> {
        getWeather()
    }, [location])

    function getWeather(){
        api.get(`v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}&aqi=yes`)
        .then(
            response => {
                const current_data = {
                    'location': response.data.location.name,
                    'condition': response.data.current.condition.text,
                    'temp': response.data.current.temp_c,
                    'date': `${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${new Date().toLocaleString('en', { weekday: 'long', month: 'short', day: '2-digit' })}`
                }
                const imgPath = getImagesPath(current_data.condition.toLowerCase(), response.data.current.is_day)
                setImagePath(imgPath)
                const icon = getIcon(current_data.condition.toLowerCase(), response.data.current.is_day)
                setIcon(icon)
                setData(current_data)
            }
        )
    }

    function getImagesPath(props, is_day){
        if(props.includes('cloudy')){
            return 'https://images.unsplash.com/photo-1505533321630-975218a5f66f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        if(props.includes('rain')){
            return 'https://images.unsplash.com/photo-1603321544554-f416a9a11fcf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        if(props.includes('overcast')){
            return 'https://images.unsplash.com/photo-1499956827185-0d63ee78a910?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        if(props.includes('fog')){
            return 'https://images.unsplash.com/photo-1486184885347-1464b5f10296?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        if(props.includes('clear')){
            if(is_day){
                return 'https://images.unsplash.com/12/sun-trees.jpg?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            return 'https://images.unsplash.com/photo-1534862559316-6579e3b7872a?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        return 'https://images.unsplash.com/photo-1470700734224-041a091bdf74?q=80&w=1997&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }

    function getIcon(props, is_day){
        if(props.includes('cloudy') || props.includes('overcast')){
            return 'mingcute:cloud-line'
        }
        if(props.includes('rain')){
            if(props.includes('heavy') || props.includes('patchy')){
                return 'mingcute:cloud-lightning-line'
            }
            return 'mingcute:showers-line'
        }
        if(props.includes('fog')){
            return 'mingcute:floating-dust-line'
        }
        if(props.includes('clear')){
            if(is_day){
                return 'mingcute:sun-line'
            }
            return 'mingcute:moon-stars-fill'
        }
        return 'mingcute:sun-line'
    }

    const handleInputLocation = (event) => {
        if (event.key === 'Enter') {
          setLocation(event.target.value);
        }
    };

    return (
        <Stack
            sx={{
                height: '100vh',
                width: '100vw',
                background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${imagePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: "#fff"
            }}
        >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    width: '100%',
                    height: '100%',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Grid 
                    item
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    xs={12}
                    md={8}
                    padding={3}
                    sx={{
                        background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${imagePath})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '3px',
                        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                        height: '70vh'
                    }}
                >
                    <Grid 
                        item 
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <h3><Icon icon='devicon:react' width="24"/> Weather App </h3>
                        </Grid>
                        <Grid item>
                            <TextField
                                variant="filled"
                                placeholder='Pesquisar localização...'
                                onKeyUp={handleInputLocation}
                                InputProps={{
                                    startAdornment: 
                                    <InputAdornment position="start">
                                        <Icon icon="mingcute:search-2-fill" />
                                    </InputAdornment>
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid 
                        item 
                        container
                        alignItems="flex-end"
                        spacing={2}
                        padding={5}
                    >
                        <Grid item>
                            <h1>{data.temp}°</h1>
                        </Grid>
                        <Grid item>
                            <h2>{data.location}</h2>
                            <p>{data.date}</p>
                        </Grid>
                        <Grid 
                            item
                            marginLeft={3}
                            sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                        >
                            <IconProvider icon={icon} width={72}/>
                            <p>{data.condition}</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Stack>
    )
}