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
  editing,
  handleCancel,
  handleUpdate,
}) {
  return (
    <Box component="form" autoComplete="off">
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
            rows={3}
            value={reviewValue}
            onChange={handleReviewChange}
            sx={{ background: (theme) => theme.palette.background.paper }}
            error={error}
            focused={editing}
          />
          {error && (
            <Alert onClose={() => handleCloseAlert(editing)} severity="error">
              {editing
                ? "Please change your review before updating."
                : "You cannot post more than one review for a novel. Consider editing your previous review."}
            </Alert>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {editing ? (
              <>
                <Stack direction="row" spacing={1}>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdate}
                    variant="contained"
                    disabled={
                      reviewValue == "" || ratingValue == 0 ? true : false
                    }
                  >
                    Update review
                  </Button>
                </Stack>
              </>
            ) : (
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={reviewValue == "" || ratingValue == 0 ? true : false}
              >
                Submit review
              </Button>
            )}
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
