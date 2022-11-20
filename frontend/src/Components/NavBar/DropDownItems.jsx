import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DropdownItems } from "./style";

function DropDownItems({data}) {
    const navigate=useNavigate()
  return (
    <li>
      <DropdownItems onClick={()=>navigate(`/product/${data._id}`)}>
        <Box className="left">
          <img
            src={data?.photos[0]}
            alt="hello"
          />
        </Box>
        <Box className="right">
          <h5>{`${data.name} - ${data.category} in ${data.brand}`}</h5>
          <p>{data.description}</p>
        </Box>
      </DropdownItems>
    </li>
  );
}

export default DropDownItems;
