import { Divider } from "@mui/material";
import React from "react";
import { CompanyOfProduct, ImageContainer, ListItems, OrderList, Price, ProductDeatils,TitleOfProduct } from "./Style";

function ProductList({product,quantity}) {
  return (
    <>
      <OrderList>
        <ListItems>
          <ImageContainer>
          <img
            src={product.photos[0]}
            alt="Product"
          />

          </ImageContainer>
          <ProductDeatils>
            <TitleOfProduct>
              {product.name}
            </TitleOfProduct>
            <CompanyOfProduct>{product.brand}</CompanyOfProduct>
            <p>
             {` Varient : 4,64 | Quantity ${quantity}  |  `}
            </p>
          </ProductDeatils>

          <Price color="green">
            Price <br/><br/>
            <span>{`Rs. ${product.price} × ${quantity}`}</span>
          </Price>
          {/* <Delivered>
        
            Expected Delivery Date <br /> <span>24 June 2022</span>{" "}
          </Delivered> */}
        </ListItems>
      </OrderList>
      <Divider variant="middle" />
    </>
  );
}

export default ProductList;
