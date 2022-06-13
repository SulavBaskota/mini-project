import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function DisplayTags({ tags }) {
  return (
    <Stack direction="row" spacing={1}>
      {tags.map((item, index) => (
        <Paper key={index}>
          <Typography sx={{ p: 1 }}>{item}</Typography>
        </Paper>
      ))}
    </Stack>
  );
}
