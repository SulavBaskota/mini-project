import {
  Container,
  Box,
  TextField,
  Typography,
  Divider,
  Button,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Grid,
  Stack,
} from "@mui/material";
import { useState } from "react";
import ImageUpload from "../components/ImageUpload";

const genres = {
  Action: false,
  Fantasy: false,
  "Sci Fi": false,
  Mystery: false,
  Thriller: false,
  Romance: false,
  Dystopian: false,
  Horror: false,
};

export default function EditNovel() {
  const [genresValue, setGenresValue] = useState(genres);
  const handleChange = (event) => {
    setGenresValue({
      ...genresValue,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClear = () => {
    setGenresValue(genres);
  };

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Typography variant="h5" mt={2}>
        Create New Novel
      </Typography>
      <Divider sx={{ border: 1, mt: 2 }} />
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ display: "flex", justifyContent: "center" }}
        mt={2}
      >
        <Stack spacing={2}>
          <FormLabel>
            <Typography variant="h6">Novel Details</Typography>
          </FormLabel>
          <TextField required id="name" label="Novel Name" />
          <TextField
            required
            id="synopsis"
            label="Novel Description"
            multiline
            rows={5}
          />
          <FormLabel>
            <Typography variant="h6">Genres</Typography>
          </FormLabel>
          <FormGroup>
            <Grid container direction="row" columns={{ xs: 1, sm: 2 }}>
              {Object.keys(genresValue).map((item, index) => (
                <Grid item xs={1} sm={1} key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={genresValue[item]}
                        onChange={handleChange}
                        name={item}
                      />
                    }
                    label={item}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
          <Divider />
          <FormLabel>
            <Typography variant="h6">Upload Book Cover Art</Typography>
          </FormLabel>
          <ImageUpload />
          <Divider />
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="contained">Create Novel</Button>
            <Button onClick={handleClear}>Clear All</Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
