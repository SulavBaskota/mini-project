import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";

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
      <Box
        sx={{
          display: expandable ? "flex" : "none",
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
          onClick={toogleNovelDesc}
        >
          {showDesc ? "Less" : "More"}
        </Button>
      </Box>
    </>
  );
}
