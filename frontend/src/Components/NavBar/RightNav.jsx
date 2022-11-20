import {
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomButton, NavProfilePic, RightNavContainer } from "./style";
import { logout } from "../../Redux/Slices/authanticationSlice";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { resetWishlist } from "../../Redux/Slices/wishlistSlice";
import { resetCart } from "../../Redux/Slices/cartSlice";

const RightNav = () => {
  const menuId = "primary-search-account-menu";
  const settings = ["Profile", "Account", "Logout"];
  const [userpopup, setUserpopup] = useState(false);
  const navigate = useNavigate();

  //redux for cart
  const cartData = useSelector((globalstate) => {
    return globalstate.cart;
  });

  const wishlistData = useSelector((globalstate) => {
    return globalstate.wishlist;
  });

  //redux for user name
  const user = useSelector((globalstate) => {
    const user = globalstate.user;
    return { name: user.name.split(" ")[0], profilePicture: user.photo };
  });
  const dispatch = useDispatch();
  const UserMenuClick = (event) => {
    switch (event.target.innerText) {
      case "Profile":
        navigate("/profile");
        break;

      case "Account":
        navigate("/account");
        break;

      case "Logout":
        dispatch(logout());
        dispatch(resetWishlist());
        dispatch(resetCart());
        navigate("/");
        break;
      default:
    }
  };

  return (
    <>
      <RightNavContainer>
        <CustomButton
          variant="contained"
          onClick={() => {
            navigate("/orders");
          }}
        >
          My Orders
        </CustomButton>

        <Tooltip title="Wishlist">
          <IconButton size="large" color="inherit">
            <Badge
              badgeContent={wishlistData.length}
              color="error"
              onClick={() => navigate("/wishlist")}
            >
              <FavoriteIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Cart">
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge
              badgeContent={cartData.length}
              color="error"
              onClick={() => {
                navigate("/Cart");
              }}
            >
              <LocalMallIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Button
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          endIcon={
            <NavProfilePic
              src={user.profilePicture}
              alt="profile pic"
              draggable="false"
            />
          }
          onClick={() => {
            setUserpopup(true);
          }}
          color="inherit"
        >
          {user.name}
        </Button>

        {/* drop down menu items */}
        <Menu
          sx={{ mt: "45px", left: "-36px" }}
          id="menu-appbar"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={userpopup}
          onClose={() => {
            setUserpopup(false);
          }}
        >
          {settings.map((setting) => (
            <MenuItem
              key={setting}
              onClick={() => {
                setUserpopup(false);
              }}
            >
              <Typography textAlign="center" onClick={UserMenuClick}>
                {setting}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </RightNavContainer>
    </>
  );
};

export default RightNav;
