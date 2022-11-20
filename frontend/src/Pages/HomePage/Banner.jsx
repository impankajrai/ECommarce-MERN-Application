import Carousel from 'react-material-ui-carousel';
import React from 'react'


const bannerData = [
    'https://rukminim1.flixcart.com/flap/3376/560/image/d117a62eb5fbb8e1.jpg?q=50',
    'https://rukminim1.flixcart.com/flap/3376/560/image/57267a180af306fe.jpg?q=50',
    'https://rukminim1.flixcart.com/flap/3376/560/image/ae9966569097a8b7.jpg?q=50',
    'https://rukminim1.flixcart.com/flap/3376/560/image/f6202f13b6f89b03.jpg?q=50'
]

const Banner = () => {
    return (<>

       
        <Carousel 
            autoPlay={true} 
            animation="slide" 
            indicators={false}
            navButtonsAlwaysVisible={true}
            cycleNavigation={true}
            StylesProvider
            navButtonsProps={{ 
                style: {
                    color: '#494949',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 0,
                    margin: 0,
                    width: 50,
                }
            }}
        >
            {
                bannerData.map(image => (
                    <img style={{height:300}} src={image} xs={{width:'100%'}} alt="banner" />
                ))
            }
        </Carousel>
        </> )
}

export default Banner;