import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
  Paper,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";

export default function BookBigTile({ book }) {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <>
      <Card component={Paper} elevation={3}>
        <CardMedia
          component="img"
          image={book.img}
          alt={book.title}
          height={mobileView ? "500" : "400"}
          sx={{ objectFit: "fill" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {book.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
          >
            {book.desc}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button size="small">More</Button>
        </CardActions>
      </Card>
    </>
  );
}
