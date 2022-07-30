import { Box, Stack, Paper, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function TitleInfo({ status, title }) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Paper
          sx={{
            background: (theme) => theme.palette.secondary.main,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            component="span"
            fontWeight="medium"
            color="black"
            sx={{ p: 2 }}
          >
            {status}
          </Typography>
        </Paper>
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          href="/author/edit-novel"
        >
          Edit
        </Button>
      </Stack>
      <Typography variant="h4">{title}</Typography>
    </Box>
  );
}
