import { Box, Typography, Stack, Rating, Paper, Button } from "@mui/material";
import ExpandableTypography from "./ExpandableTypography";
import { useSession } from "next-auth/react";
import UserPostAccountInfo from "./UserPostAccountInfo";

export default function ReviewComponent({
  reviewList,
  handleEdit,
  editing,
  handleDelete,
}) {
  const { data: session } = useSession();
  return (
    <>
      {reviewList.map((review, index) => (
        <Paper elevation={2} sx={{ mt: 2, p: 1 }} key={index}>
          <Stack spacing={2}>
            <UserPostAccountInfo info={review} />
            <ExpandableTypography
              desc={review.review}
              expandable={true}
              lineClamp="4"
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
                      sx={{
                        textDecoration: "underline",
                        textTransform: "lowercase",
                        "&:hover": { background: "inherit" },
                      }}
                      color="error"
                      onClick={() => handleDelete(review._id, review.user._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      sx={{
                        textDecoration: "underline",
                        textTransform: "lowercase",
                        "&:hover": { background: "inherit" },
                      }}
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
