/* eslint-disable @next/next/no-img-element */
import React, { useState } from  'react';
import VizSensor from 'react-visibility-sensor';
import { Button, Grid, Typography, Card, Fade, Slide, Zoom } from '@mui/material'
import { useRouter } from 'next/router'



const ProductCard = ({image}) => {
    
    const [isVisible, setIsVisible] = useState(false)

    const action = (isVisible) => {
        setIsVisible(isVisible)
    }

    return (
        <VizSensor onChange={action}>
          <Grid item md={6}>
            <Zoom in={true} style={{ transitionDelay: isVisible ? '500ms' : '500ms' }}>
              <Card>
                <img src={image} width="100%" alt={image}/>                
              </Card>
            </Zoom>
          </Grid>
      </VizSensor>
    )
}


export default ProductCard
