import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button} from "@mui/material";
import {
  CardeWrapper,
  CardImage,
  Discount,
  ProductTitle,
} from "./Style";



export default function ListItem({ data,title}) {
  console.log(data);
  //responsive design

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Box>
      <Box>
        <Typography
          style={{
            fontSize: 22,
            fontWeight: 600,
            lineHeight: "32px",
            marginLeft: 25,
          }}
        >
          {title}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginTop: "-35px", float: "right" }}
        >
          View All
        </Button>
      </Box>
      <Divider />
      <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                centerMode={true}
                infinite={false}
                autoPlay={true}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                showDots={false}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {
                    data.map(temp => (
                        <Link to={`product/${temp._id}`} style={{textDecoration: 'none'}}>
                            <CardeWrapper textAlign="center">
                                <CardImage src={temp.photos[0]} alt="" />
                                <ProductTitle  style={{ fontWeight: 600, color: '#212121' }}>{temp.name}</ProductTitle>
                                <Discount >{temp.price}</Discount>
                                <Typography style={{ color: '#212121', opacity: '.6' }}>{temp.brand}</Typography>
                            </CardeWrapper>
                        </Link>
                    ))
                }
            </Carousel>
    </Box>
  );
}
