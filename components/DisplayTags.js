import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function DisplayTags({ tags }) {
  return (
    <>
      <Grid item container spacing={1} columns={{ xs: 2, md: 4 }}>
        {tags.map((tag, index) => (
          <Grid item xs={1} key={index}>
            <Paper>
              <Typography sx={{ p: 1 }} align="center">
                {tag}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
