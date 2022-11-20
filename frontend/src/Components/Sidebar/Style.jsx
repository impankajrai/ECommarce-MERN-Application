import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

export const Navbar = styled(Box)({
  backgroundColor: "#1565c0",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
});

export const MenuBars = styled(Link)({
  marginLeft: "2rem",
  fontSize: "2rem",
  background: "none",
});
export const NavMenuItems = styled("ul")({
  width: "100%",
});

export const Nav = styled("nav")(({ active }) => ({
  backgroundColor: "#1565c0",
  width: "250px",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  position: "relative",
  left: active ? 0 : "-100%",
  transition: active ? "350ms" : "850ms",
}));

export const NavBarToggle = styled("li")({
  backgroundColor: "#060b26",
  width: "100%",
  height: "80px",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
});
export const NavText = styled("li")({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  padding: "8px 0px 8px 16px",
  listStyle: "none",
  height: "60px",
  a: {
    textDecoration: "none",
    color: "#f5f5f5",
    fontSize: "18px",
    width: "95%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    borderRadius: "4px",
  },
  "&:a:hover": {
    backgroundColor: "#1a83ff",
  },
});

export const CloseIconButton = styled(CloseIcon)({
  color: "white",
});
export const OpenSideBar = styled(MenuIcon)({
  color: "white",
});
