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
import NovelSynopsis from "../NovelSynopsis";

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
          <NovelSynopsis desc={book.desc} expandable={false} align="center" />
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button size="small">More</Button>
        </CardActions>
      </Card>
    </>
  );
}
