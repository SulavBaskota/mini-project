import {
  Box,
  Typography,
  Stack,
  Rating,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";

export default function UserReviewField({
  reviewValue,
  ratingValue,
  handleReviewChange,
  handleRatingChange,
  handleSubmit,
  error,
  handleCloseAlert,
}) {
  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
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
            required
            multiline
            fullWidth
            id="user-review"
            rows={3}
            value={reviewValue}
            onChange={handleReviewChange}
            sx={{ background: (theme) => theme.palette.background.paper }}
            error={error}
          />
          {error && (
            <Alert onClose={handleCloseAlert} severity="error">
              You cannot post more than one review for a novel. Consider editing
              your previous review.
            </Alert>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
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
