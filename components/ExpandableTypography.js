import { Typography, Box, Button } from "@mui/material";
import { Fragment, useState } from "react";

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
  lineClamp = "3",
}) {
  const [showDesc, setShowDesc] = useState(false);
  const paragraphs = desc.split("\n");
  const toogleNovelDesc = (event) => {
    setShowDesc(!showDesc);
  };

  return (
    <>
      {/* <Typography
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
      > */}
      {/* {mobileView ? (
          desc
        ) : (
          <Box component="div">
            {paragraphs.map((paragraph, index) => (
              <Typography paragraph key={index}>{paragraph}</Typography>
            ))}
          </Box>
        )} */}
      {/* <Box component="div">
          {paragraphs.map((paragraph, index) => (
            <Typography paragraph key={index} sx={{ display: "inline-block" }}>
              {paragraph}
            </Typography>
          ))}
        </Box>
      </Typography> */}
      <Box
        component="div"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: showDesc ? "block" : "-webkit-box",
          WebkitLineClamp: lineClamp,
          WebkitBoxOrient: "vertical",
        }}
        align={align}
      >
        {paragraphs.map((paragraph, index) => (
          <Fragment key={index}>
            <Typography
              paragraph
              variant="body2"
              sx={{ display: "inline" }}
              color="text.secondary"
            >
              {paragraph}
            </Typography>
            <br />
          </Fragment>
        ))}
      </Box>
      {expandable && (
        <ToogleButton handleToogle={toogleNovelDesc} showDesc={showDesc} />
      )}
    </>
  );
}
