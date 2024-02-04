import { useEffect, useState } from 'react'

import { Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'

import { Icon } from '@iconify/react'

import api from '../../services/api'

import { purple } from '@mui/material/colors'

import IconProvider from '../../components/IconProvider'

//---------------------------------------------

export default function Lobby(){
    const [imagePath, setImagePath] = useState('') //Imagem de fundo

    const [location, setLocation] = useState('Itu')

    const [data, setData] = useState([])

    useEffect(()=> {
        getWeather()
        getImagePath('rain')
    }, [location])

    function getWeather(){
        api.get(`v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}&aqi=yes`)
        .then(
            response => {
                const current_data = {
                    'location': response.data.location.name,
                    'condition': response.data.current.condition.text,
                    'temp': response.data.current.temp_c,
                    'data': new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                }
                setData(current_data)
            }
        )
    }

    function getImagePath(props){
        if(props.includes('rain')){
            setImagePath('https://images.unsplash.com/photo-1433863448220-78aaa064ff47?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
        }else{
            setImagePath('https://images.unsplash.com/flagged/photo-1552425083-0117136f7d67?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
        }
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
                background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${imagePath})`,
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
                    md={7}
                    padding={3}
                    sx={{
                        background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${imagePath})`,
                        borderRadius: '3px',
                        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                        height: '60vh'
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
                            <h3>Weather App </h3>
                        </Grid>
                        <Grid item>
                            <TextField
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
                            <p>{data.data}</p>
                        </Grid>
                        <Grid 
                            item
                            marginLeft={3}
                            sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                        >
                            <IconProvider icon='mingcute:heavy-rain-line' width={72}/>
                            <p>{data.condition}</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Stack>
    )
}