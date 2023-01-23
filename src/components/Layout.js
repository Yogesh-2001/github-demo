import { alpha, makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import React, { useEffect } from "react";
import clsx from "clsx";
import DescriptionIcon from "@material-ui/icons/Description";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MailIcon from "@material-ui/icons/Mail";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth, db } from ".././firebase/firebase.config";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { message } from "antd";
import { collection, getDocs, where } from "firebase/firestore";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    alignItems: "center",
    color: "white",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
      color: "white",
    },
  },
  sectionMobile: {
    display: "flex",
    alignItems: "center",
    color: "white",
    [theme.breakpoints.up("md")]: {
      display: "none",
      color: "white",
    },
  },
}));

export default function Layout() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [state, setState] = React.useState({
    left: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // useEffect(() => {
  //   const getUser = async () => {
  //     const querySnapshot = await getDocs(
  //       collection(db, "students"),
  //       where("userId", "==", user && user.uid)
  //     );
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, " => ", doc.data());
  //     });
  //   };
  //   getUser();
  // }, []);
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          height: "70px",
          alignItems: "center",
        }}
      >
        <IconButton style={{ cursor: "pointer", marginRight: "20px" }}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {[
          {
            text: "Dashboard",
            path: "/dashboard",
            icon: <DashboardIcon />,
          },
          {
            text: "Create Profile",
            path: "/create-profile",
            icon: <AccountCircleIcon />,
          },
          {
            text: "Add Student",
            path: "/admin/add-student",
            icon: <GroupAddIcon />,
          },
          {
            text: "Add Notice",
            path: "/admin/add-notice",
            icon: <DescriptionIcon />,
          },
          {
            text: "Add Placement Drive",
            path: "/admin/add-drive",
            icon: <NoteAddIcon />,
          },
        ].map((doc, index) => (
          <ListItem button key={doc.text}>
            <ListItemIcon>{doc.icon}</ListItemIcon>
            <ListItemText primary={<Link to={doc.path}>{doc.text}</Link>} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className="d-flex justify-content-center">
        <Toolbar>
          <Button onClick={toggleDrawer("left", true)}>
            <MenuIcon />
          </Button>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to={"/"}>Material UI</Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {user && (
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                onClick={async () => {
                  await signOut(auth);
                  message.success("Logged out");
                  navigate("/", { replace: true });
                }}
              >
                Logout
              </Link>
            )}

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
