import {
  Box,
  Typography,
  Stack,
  Rating,
  Paper,
  Avatar,
  Button,
} from "@mui/material";
import ExpandableTypography from "./ExpandableTypography";
import { useSession } from "next-auth/react";

export default function ReviewComponent({
  reviewList,
  handleEdit,
  editing,
  handleDelete,
}) {
  const { data: session } = useSession();

  const convertToLocalString = (date) => {
    return new Date(date).toLocaleString();
  };
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
                  {review.user.imgUrl ? (
                    <Avatar
                      src={review.user.imgUrl}
                      alt={review.user.username}
                    />
                  ) : (
                    <Avatar>
                      {review.user.username.slice(0, 2).toUpperCase()}
                    </Avatar>
                  )}
                  <Typography variant="h6">{review.user.username}</Typography>
                </Stack>
                <Typography variant="subtitle2" color="secondary.light">
                  {convertToLocalString(review.date)}
                </Typography>
              </Stack>
            </Box>
            <ExpandableTypography
              desc={review.review}
              expandable={true}
              lineClamp="5"
            />
            <Box>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Rating
                    name={review.user.username}
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
                {!editing && session?.user.id === review.user._id && (
                  <Stack direction="row" justifyContent="flex-end">
                    <Button
                      color="error"
                      onClick={() => handleDelete(review._id, review.user._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleEdit(review.review, review.rating)}
                    >
                      Edit
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Stack>
        </Paper>
      ))}
    </>
  );
}
