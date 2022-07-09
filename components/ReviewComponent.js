import { Box, Typography, Stack, Rating, Paper } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandableTypography from "./ExpandableTypography";

export default function ReviewComponent({ reviewList }) {
  return (
    <>
      {reviewList.map((review, index) => (
        <Paper elevation={2} sx={{ mt: 2, p: 1 }} key={index}>
          <Stack spacing={2}>
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccountCircleIcon fontSize="large" />
                  <Typography variant="h6">{review.username}</Typography>
                </Stack>
                <Typography variant="subtitle2" color="secondary.light">
                  {review.date}
                </Typography>
              </Stack>
            </Box>
            <ExpandableTypography
              desc={review.review}
              expandable={true}
              lineClamp="5"
            />
            <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Rating
                  name={review.username}
                  size="small"
                  value={parseFloat(review.rating)}
                  precision={0.1}
                  readOnly
                />
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ textDecoration: "underline" }}
                >
                  {review.rating} stars
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      ))}
    </>
  );
}
