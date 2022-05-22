import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  Paper,
} from "@mui/material";
import Image from "next/image";
import { NEW_BOOKS } from "../constants/NEW_BOOKS";

export default function BookBigTile() {
  const book = NEW_BOOKS[0];
  return (
    <>
      <Card component={Paper} elevation={3}>
        <Image
          src={book.img}
          alt={book.title}
          layout="responsive"
          width={300}
          height={320}
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
