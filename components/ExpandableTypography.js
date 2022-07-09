import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";

const ToogleButton = ({ handleToogle, showDesc }) => (
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

export default function ExpandableTypography({
  desc,
  expandable = false,
  align = "left",
  lineClamp = "4",
}) {
  const [showDesc, setShowDesc] = useState(false);
  const paragraphs = desc.split("\n");
  const toogleNovelDesc = (event) => {
    setShowDesc(!showDesc);
  };

  return (
    <>
      <Typography
        variant="body2"
        component="div"
        color="text.secondary"
        align={align}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: showDesc ? "block" : "-webkit-box",
          WebkitLineClamp: lineClamp,
          WebkitBoxOrient: "vertical",
        }}
      >
        <Box component="div">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </Box>
      </Typography>
      {expandable && (
        <ToogleButton handleToogle={toogleNovelDesc} showDesc={showDesc} />
      )}
    </>
  );
}
