import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import BookTile from "./BookTile";
import Paper from "@mui/material/Paper";
import { NEW_BOOKS } from "../constants/NEW_BOOKS";
import Image from "next/image";

export default function NewOngoingReleases() {
  const book = NEW_BOOKS[0];
  return (
    <Container maxWidth="xl">
      <Typography variant="h5" mt={3} mb={3}>
        New Ongoing Releases
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Paper sx={{ padding: "10px" }} elevation={0}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 12 }}
          >
            <Grid item xs={1} sm={4}>
              <Card component={Paper} elevation={3}>
                <Image
                  src={book.img}
                  alt={book.title}
                  layout="intrinsic"
                  width={350}
                  height={400}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
                  >
                    {book.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    noWrap="true"
                  >
                    {book.desc}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              xs={1}
              sm={8}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <BookTile />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}
