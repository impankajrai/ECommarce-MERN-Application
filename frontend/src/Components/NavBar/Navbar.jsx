import { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomSearch, Dropdown, SearchBarContainer } from "./style";
import Popup from "../Popup";
import Switch from "../../Pages/Authantication/Switch"; //Signup and Signin Switch component
import RightNav from "./RightNav";
import debounce from "../../Utility/debounce";
import DropDownItems from "./DropDownItems";

//redux imports
import { useSelector,useDispatch } from "react-redux";
import {fetchLoggedInUser} from '../../Redux/Slices/authanticationSlice'
import { getCartData } from "../../Redux/Slices/cartSlice";
import { getWishlistData } from "../../Redux/Slices/wishlistSlice";


//material ui imports
import {Container,Typography,Toolbar,Divider,Box,AppBar,IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";



const Navbar = () => {
  const [OpenPopup, SetOpenPopup] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user)
  const searchTextBox=useRef(null)
  
  //get all initial value here
  useEffect(()=>{
    dispatch(fetchLoggedInUser())
    dispatch(getCartData())
    dispatch(getWishlistData())
  },[dispatch])

  useEffect(()=>{
    if(user.id){
      SetOpenPopup(false)
    }
  },[user.id])


  //search data - call by debounce function when user stop typing 
const getSearchData=async()=>{
  if (searchTextBox.current.value.length) {  
    const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/search/?key=${searchTextBox.current.value}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });
    const result= await data.json();
    setSearchData(result.product)
    console.log(result)
  }else{
   setSearchData([])
  }
  
}

  //debounce function return a function , I get that function on handelChange and call when user entered every charater in searchbar  
  const handelChange=debounce(getSearchData,500)
  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          style={{ position: "relative", display: "flex" }}
        >
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Shopping
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          {/* Search bar */}

          <SearchBarContainer>
            <CustomSearch
              type="text"
              ref={searchTextBox}
              placeholder="Search"
              onChange={handelChange}
            />
            <IconButton>
              <SearchIcon sx={{ color: "black" }} />
            </IconButton>
            {/* dropdown */}
          <Dropdown >
            {searchData.length>0 && searchData.map((items)=><DropDownItems key={items._id} data={items}/>)}
          </Dropdown>
          </SearchBarContainer>


          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          {/* SearchBar End */}

          {/* login button */}
          {user.id ? (
            <RightNav />
          ) : (
            <CustomButton
              sx={{ marginLeft: "auto" }}
              variant="contained"
              onClick={() => {
                SetOpenPopup(true);
              }}
            >
              Login
            </CustomButton>
          )}
        </Toolbar>

        <Popup open={OpenPopup} setopen={SetOpenPopup} marginTop="-40px">
          <Switch />
        </Popup>
      </Container>
    </AppBar>
  );
};
export default Navbar;
