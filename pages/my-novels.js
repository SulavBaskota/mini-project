import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MY_NOVELS } from "../constants/MY_NOVELS";

export default function MyNovels() {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="h5">My Novels</Typography>
        <Button variant="contained" startIcon={<AddIcon />} w>
          Create New Novel
        </Button>
      </Stack>
      <Divider sx={{ border: 1, mt: 2 }} />
      <Grid container columns={{ xs: 1, sm: 2, md: 3 }} spacing={3} mt={2}>
        {MY_NOVELS.map((novel, index) => (
          <Grid item xs={1} sm={1} md={1} key={index}>
            <Card>
              <Grid container direction="row">
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    image={novel.img}
                    alt={novel.title}
                    height="200"
                    sx={{ objectFit: "fill" }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {novel.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textTransform: "capitalize" }}
                      >
                        Status: {novel.status}
                      </Typography>
                      <Stack direction="row" spacing={0.5}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          align="left"
                        >
                          Rating:
                        </Typography>
                        <Rating
                          name={novel.title}
                          size="small"
                          value={parseFloat(novel.rating)}
                          precision={0.1}
                          readOnly
                        />
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        Current Chapter: {novel.last_chapter}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Updated On: {novel.updated_on}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Update</Button>
                    </CardActions>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
