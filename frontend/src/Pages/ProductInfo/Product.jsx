import React, { useEffect,useState  } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Body, BuyBtnContainer, Colors, DetailsContainer, Heading, ImageContainer, Offers, Price, Ratting, ServicesList} from "./Style";
import GradeIcon from "@mui/icons-material/Grade";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import {addToCart} from '../../Redux/Slices/cartSlice'
import { addProduct } from "../../Redux/Slices/OrderSlice";

function Product() {
  const navigate=useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    brand: "",
    category: "",
    description: "",
    name: "",
    photos: [],
    price: 0,
    ratting: 0,
    services: [],
    stock: 0,
    __v: 0,
    _id: "",
  });

  const fetchData = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });
    const response=await res.json();
    if (response.success) {
      setProduct(response.product[0]);
    }else{
      toast.error("Something went wrong");
    }

  }

  // const fetchData = async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_BACKEND_URL}/product/${id}`)
  //     .then((response) => {
  //       if (response) {
  //         setProduct(response.data.product[0]);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Something went wrong");
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchData();
  }, [fetchData]);

  const handelBuy=()=>{
    dispatch(addProduct([product]));
    navigate('/checkout')
  }

  const offers = [
    {
      type: "Special Price",
      description: "Get extra 20% off (price inclusive of cashback/coupon)",
    },
    {
      type: "Bank Offer",
      description: "5% Cashback on Flipkart Axis Bank Card",
    },
    {
      type: "Partner Offer",
      description:
        "Sign up for Flipkart Pay Later and get Flipkart Gift Card worth upto ₹500*",
    },
  ];

  return (
    <>
      <Body>
        <ImageContainer>
          <img src={product?.photos[0]} alt="Product Image" />

          <BuyBtnContainer>
            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              size="large"
              onClick={()=>{dispatch(addToCart(product))}}
            >
              add to cart
            </Button>
            <Button
              variant="contained"
              startIcon={<BoltIcon />}
              size="large"
              onClick={handelBuy}
            >
              Buy Now
            </Button>
          </BuyBtnContainer>
        </ImageContainer>
        <DetailsContainer>
          <h3 style={{ fontSize: 21, marginBottom: "10px" }}>
            {product.description}
          </h3>
          <Ratting>
            <GradeIcon sx={{ width: "16px" }} />
            <span style={{ fontWeight: "bold", marginTop: "3px" }}>4.0</span>
          </Ratting>
          <Price>₹ {product.price}</Price>

          <Heading>Available offers</Heading>
          {offers.map((data) => {
            return (
              <>
                <Offers>
                  <LocalOfferIcon sx={{ color: "green" }} /> &nbsp;{" "}
                  <p style={{ fontWeight: "bold" }}>{data.type}&nbsp; </p>
                  <p>{data.description}</p>
                </Offers>
              </>
            );
          })}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Heading>Available Color</Heading>
              <Box
                sx={{
                  display: "flex",
                  width: "150px",
                  justifyContent: "space-evenly",
                }}
              >
                <Colors color="black" />
                <Colors color="red" />
                <Colors color="yellow" />
                <Colors color="pink" />
              </Box>

              <Heading>Available Size</Heading>
              <Box>
                <Button variant="outlined">S</Button>
                <Button variant="outlined">M</Button>
                <Button variant="outlined">L</Button>
                <Button variant="outlined">XL</Button>
                <Button variant="outlined">XXL</Button>
              </Box>
            </Box>
            <Box>
              <ul style={{ color: "green" }}>
                <Heading sx={{ color: "gray" }}>Services</Heading>
                {product.services.map((data) => (
                  <li>
                    <ServicesList>{data}</ServicesList>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        </DetailsContainer>
      </Body>
    </>
  );
}

export default Product;
