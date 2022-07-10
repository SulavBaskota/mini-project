import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandableTypography from "./ExpandableTypography";
import { Paper, Stack, Typography, Box } from "@mui/material";

export default function CommentComponent({ commentList }) {
  return (
    <>
      {commentList.map((comment, index) => (
        <Paper elevation={2} sx={{ mt: 2, p: 1 }} key={index}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <AccountCircleIcon
              sx={{ width: { xs: 50, sm: 100 }, height: { xs: 50, sm: 100 } }}
            />
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle1">{comment.username}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {comment.date}
                </Typography>
              </Box>
              <ExpandableTypography desc={comment.comment} expandable={true} />
            </Stack>
          </Stack>
        </Paper>
      ))}
    </>
  );
}
