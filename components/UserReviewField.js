import {
  Box,
  Typography,
  Stack,
  Rating,
  Paper,
  TextField,
  Button,
} from "@mui/material";

export default function UserReviewField({
  reviewValue,
  ratingValue,
  handleReviewChange,
  handleRatingChange,
}) {
  return (
    <Box component="form" noValidate autoComplete="off">
      <Paper sx={{ p: 1, mt: 2 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6">Rate this novel</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Tell us what you think.
            </Typography>
          </Box>
          <Rating
            name="rating"
            size="large"
            precision={0.5}
            value={parseFloat(ratingValue)}
            onChange={handleRatingChange}
          />
          <TextField
            multiline
            fullWidth
            id="user-review"
            rows={6}
            value={reviewValue}
            onChange={handleReviewChange}
            sx={{ background: (theme) => theme.palette.background.paper }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              disabled={reviewValue == "" || ratingValue == 0 ? true : false}
            >
              Submit review
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
