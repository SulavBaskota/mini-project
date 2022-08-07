import * as React from "react";
import {
  Typography,
  Box,
  CardMedia,
  CardActionArea,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCardActionArea = styled(CardActionArea)(
  ({ theme }) => `
  color: ${theme.palette.background.paper};

  :hover {
    color: ${theme.palette.background.paper};
  }
`
);

export default function SmallBookTile({ book }) {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box>
      <StyledCardActionArea
        href={`/novel?novel_id=${encodeURIComponent(book._id)}`}
      >
        <CardMedia
          component="img"
          image={book.img}
          alt={book.title}
          height={mobileView ? "180" : "200"}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            align="center"
            sx={{ textTransform: "capitalize" }}
          >
            {book.title}
          </Typography>
        </CardContent>
      </StyledCardActionArea>
    </Box>
  );
}
