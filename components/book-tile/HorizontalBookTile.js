import * as React from "react";
import {
  Typography,
  Grid,
  Stack,
  Rating,
  Paper,
  Divider,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  useMediaQuery,
} from "@mui/material";
import DisplayTags from "../DisplayTags";
import ExpandableTypography from "../ExpandableTypography";

export default function HorizontalBookTile({ book }) {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <>
      <Box>
        <CardActionArea
          href={`/novel?novel_id=${encodeURIComponent(book._id)}`}
        >
          <Grid container direction="row">
            <Grid item xs={4} md={3}>
              <Paper>
                <Typography align="center">{book.status}</Typography>
              </Paper>
              <CardMedia
                component="img"
                image={book.img}
                alt={book.title}
                height={mobileView ? "220" : "200"}
                sx={{ objectFit: "fill" }}
              />
            </Grid>
            <Grid item xs={8} md={9}>
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ height: { xs: 220, md: 200 } }}>
                  <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      align="left"
                      sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                    >
                      {book.title}
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                      <Rating
                        name={book.title}
                        size="small"
                        value={parseFloat(book.rating)}
                        precision={0.1}
                        readOnly
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        align="left"
                      >
                        {book.rating} stars
                      </Typography>
                    </Stack>
                    <ExpandableTypography
                      desc={book.desc}
                      expandable={false}
                      align="left"
                    />
                    <DisplayTags tags={book.genre} />
                  </Stack>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>
      </Box>
      <Divider />
    </>
  );
}
