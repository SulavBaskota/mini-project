import { Box, Stack, Paper, TextField, Button, Alert } from "@mui/material";

export default function UserCommentField({
  commentValue,
  handleCommentChange,
  handleSubmit,
  error,
  handleCloseAlert,
  editing,
  handleCancel,
  handleUpdate,
}) {
  return (
    <Box component="form" autoComplete="off">
      <Paper sx={{ p: 2 }}>
        <Stack spacing={2}>
          <TextField
            multiline
            fullWidth
            id="user-comment"

            rows={2}
            placeholder="Add a comment"
            value={commentValue}
            onChange={handleCommentChange}
            sx={{ background: (theme) => theme.palette.background.paper }}
            error={error}
            focused={editing}
          />
          {error && (
            <Alert onClose={() => handleCloseAlert(editing)} severity="error">
              Please change your comment before updating.
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
                    disabled={commentValue == "" ? true : false}
                  >
                    Update comment
                  </Button>
                </Stack>
              </>
            ) : (
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={commentValue == "" ? true : false}
              >
                Submit
              </Button>
            )}
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
