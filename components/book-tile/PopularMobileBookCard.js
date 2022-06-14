import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Stack,
  Box,
} from "@mui/material";

export default function PopularMobileBookCard({ book, index }) {
  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardActionArea>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ p: 1 }}
        >
          <Grid item xs={4}>
            <CardMedia
              component="img"
              image={book.img}
              alt={book.title}
              height="180"
              sx={{ objectFit: "fill" }}
            />
          </Grid>
          <Grid item xs={8}>
            <CardContent sx={{ pt: 0 }}>
              <Stack
                direction="column"
                justifyContent="space-around"
                alignItems="flex-start"
                spacing={2}
              >
                <Typography variant="h4">Rank: #{index + 1}</Typography>
                <Box>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                  >
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="secondary.light">
                    {book.author}
                  </Typography>
                  <Stack direction="row" spacing={0.5}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Views This Month:
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color={(theme) => theme.palette.success.main}
                      fontWeight="bold"
                    >
                      {book.viewCount}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}
