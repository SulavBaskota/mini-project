import { Box, Stack, Paper, TextField, Button } from "@mui/material";

export default function UserCommentField({
  commentValue,
  handleCommentChange,
}) {
  return (
    <Box component="form" noValidate autoComplete="off">
      <Paper sx={{ p: 2 }}>
        <Stack spacing={2}>
          <TextField
            multiline
            fullWidth
            id="user-comment"
            rows={2}
            placeholder="Add a comment"
            onChange={handleCommentChange}
            sx={{ background: (theme) => theme.palette.background.paper }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              disabled={commentValue == "" ? true : false}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
