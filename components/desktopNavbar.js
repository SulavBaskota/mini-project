import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { MENU_ITEMS } from "../constants/MENU_ITEMS";
import PageTitle from "./PageTitle";

export default function DesktopNavbar() {
  return (
    <>
      <PageTitle variant={"h6"} mr={4} flexGrow={18} />
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {MENU_ITEMS.map((page) => (
          <Button
            key={page.title}
            sx={{ my: 2, color: "white", display: "block" }}
            href={page.href}
          >
            {page.title}
          </Button>
        ))}
      </Box>
    </>
  );
}
