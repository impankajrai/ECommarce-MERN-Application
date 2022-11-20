import { Box} from "@mui/material";
import {
  Container,
  Delivered,
  Details,
  HeaderOfOrder,
  OrderDate,
  OrderId,
  Slider,
  SliderBreakPoints,
  Status,
  TrackingDetails,
} from "./Style";

import React, { useState } from "react";

function TrackOrder() {
  return (
    <>
      <Box >
        <Container>
            <Details>
              <TrackingDetails>
                <OrderId>
                #125e455r453
                </OrderId>
                <OrderDate>Order Placed 17 Nov 2022</OrderDate>
              </TrackingDetails>

              <Status color="green">
                Status <br />
                <span>Deliverd</span>
              </Status>
              <Delivered>
                Expected Delivery Date <br /> <span>24 June 2022</span>{" "}
              </Delivered>
            </Details>
          <HeaderOfOrder>
            <h3>Track Order</h3>
          </HeaderOfOrder>
          <SliderBar status={"delivered"} />
        </Container>
      </Box>
    </>
  );
}

const SliderBar = ({ status }) => {
  const SliderLength = {
    placed: 17,
    packed: 38.5,
    dispatch: 59,
    delivered: 81,
  };
  const [orderstatus, SetOrderstatus] = useState(SliderLength[status]);

  return (
    <>
      <Box sx={{ display: "flex", height: "140px", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 70px",
            flexDirection: "column",
          }}
        >
          <Slider>
            <span
              style={{
                height: "100%",
                width: orderstatus + "%",
                background: "green",
                position: "absolute",
              }}
            >
              &nbsp;
            </span>
            <SliderBreakPoints
              position={SliderLength.placed}
              done={orderstatus >= SliderLength.placed}
            >
              &nbsp;{" "}
            </SliderBreakPoints>
            <SliderBreakPoints
              position={SliderLength.packed}
              done={orderstatus >= SliderLength.packed}
            >
              &nbsp;{" "}
            </SliderBreakPoints>
            <SliderBreakPoints
              position={SliderLength.dispatch}
              done={orderstatus >= SliderLength.dispatch}
            >
              &nbsp;{" "}
            </SliderBreakPoints>
            <SliderBreakPoints
              position={SliderLength.delivered}
              done={orderstatus >= SliderLength.delivered}
            >
              &nbsp;{" "}
            </SliderBreakPoints>
          </Slider>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
              marginTop: "20px",
            }}
          >
            {orderstatus >= SliderLength.placed ? (
              <img width="50px" src="/images/order-green.svg" alt="order" />
            ) : (
              <img width="50px" src="/images/order.svg" alt="order" />
            )}
            {orderstatus >= SliderLength.packed ? (
              <img width="50px" src="/images/packed-green.svg" alt="packed" />
            ) : (
              <img width="50px" src="/images/packed.svg" alt="packed" />
            )}
            {orderstatus >= SliderLength.dispatch ? (
              <img
                width="50px"
                src="/images/transmit-green.svg"
                alt="transmit"
              />
            ) : (
              <img width="50px" src="/images/transmit.svg" alt="transmit" />
            )}
            {orderstatus >= SliderLength.delivered ? (
              <img
                width="50px"
                src="/images/delivered-green.svg"
                alt="delivered"
              />
            ) : (
              <img width="50px" src="/images/delivered.svg" alt="delivered" />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TrackOrder;
