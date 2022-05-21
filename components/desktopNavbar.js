import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Button from "@mui/material/Button";

const pages = ["Series", "Bookmarks", "My Novels"];

export default function DesktopNavbar() {
  const handleClick = () => {};

  return (
    <>
      <MenuBookIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 4,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        ReadHub
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page}
            sx={{ my: 2, color: "white", display: "block" }}
            onClick={handleClick}
          >
            {page}
          </Button>
        ))}
      </Box>
    </>
  );
}
