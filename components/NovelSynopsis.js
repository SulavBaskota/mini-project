import { Typography, Box, Button, ToggleButton } from "@mui/material";
import { useState } from "react";

const ToogleButton = ({ handleToogle }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "flex-end",
    }}
  >
    <Button
      variant="text"
      size="small"
      sx={{
        textTransform: "capitalize",
        textDecoration: "underline",
        color: "text.secondary",
      }}
      onClick={handleToogle}
    >
      {showDesc ? "Less" : "More"}
    </Button>
  </Box>
);

export default function NovelSynopsis({
  desc,
  expandable = false,
  align = "left",
}) {
  const [showDesc, setShowDesc] = useState(false);
  const toogleNovelDesc = (event) => {
    setShowDesc(!showDesc);
  };

  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align={align}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: showDesc ? "block" : "-webkit-box",
          WebkitLineClamp: "3",
          WebkitBoxOrient: "vertical",
        }}
      >
        {desc}
      </Typography>
      {expandable && <ToogleButton handleToogle={toogleNovelDesc} />}
    </>
  );
}
