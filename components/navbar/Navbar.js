import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";

const LoggedInMenuItems = ({ handleClick }) => (
  <>
    <MenuItem onClick={() => handleClick("profile")}>
      <Typography textAlign="center">Profile</Typography>
    </MenuItem>
    <MenuItem onClick={() => handleClick("logout")}>
      <Typography textAlign="center">Logout</Typography>
    </MenuItem>
  </>
);

const LoggedOutMenuItems = ({ handleClick }) => (
  <>
    <MenuItem onClick={() => handleClick("login")}>
      <Typography textAlign="center">Sign In</Typography>
    </MenuItem>
    <MenuItem onClick={() => handleClick("register")}>
      <Typography textAlign="center">Register</Typography>
    </MenuItem>
  </>
);

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (onClickType) => {
    handleCloseUserMenu();
    if (onClickType === "profile") {
      router.push("/user/profile");
    } else if (onClickType === "logout") {
      signOut({ callbackUrl: "/" });
    } else if (onClickType === "login") {
      signIn();
    } else if (onClickType === "register") {
      router.push("/register");
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {mobileView ? <MobileNavbar /> : <DesktopNavbar />}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                size="large"
                color="inherit"
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                {session ? (
                  session.user.imgUrl ? (
                    <Avatar
                      alt={session.user.username}
                      src={session.user.imgUrl}
                      sx={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 30, height: 30 }}>
                      {session.user.username.slice(0, 2).toUpperCase()}
                    </Avatar>
                  )
                ) : (
                  <AccountCircle size="large" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {session ? (
                <LoggedInMenuItems handleClick={handleClick} />
              ) : (
                <LoggedOutMenuItems handleClick={handleClick} />
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
