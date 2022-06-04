import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Typography } from "@mui/material";

export default function PageTitle({ variant, mr, flexGrow }) {
  return (
    <>
      <MenuBookIcon sx={{ display: "flex", mr: 1 }} />
      <Typography
        variant={variant}
        noWrap
        component="a"
        href="/"
        sx={{
          mr: {mr},
          display: "flex",
          flexGrow: {flexGrow},
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        ReadHub
      </Typography>
    </>
  );
}
