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
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { NOVEL } from "../constants/NOVEL";
import ImageUpload from "../components/ImageUpload";
import RadioGroupComponent from "../components/RadioButtonComponent";

const genres = {
  Action: true,
  Fantasy: false,
  "Sci Fi": false,
  Mystery: false,
  Thriller: true,
  Romance: false,
  Dystopian: false,
  Horror: false,
};

const status = ["Ongoing", "Completed", "Hiatus"];

export default function EditNovel() {
  const novel = NOVEL;
  const [genresValue, setGenresValue] = useState(genres);
  const [statusValue, setStatusValue] = useState(novel.status);

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
        Edit Novel
      </Typography>
      <Divider sx={{ border: 1, mt: 2 }} />
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        mt={2}
      >
        <Stack spacing={2}>
          <FormLabel>
            <Typography variant="h6">Novel Details</Typography>
          </FormLabel>
          <TextField id="name" label="Novel Name" value={novel.title} />
          <TextField
            id="synopsis"
            label="Novel Description"
            value={novel.desc}
            multiline
          />
          <FormControl>
            <RadioGroupComponent
              id="status"
              label="Status"
              value={statusValue}
              itemList={status}
              setValue={setStatusValue}
            />
          </FormControl>
          <Divider />
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
            <Typography variant="h6">Upload New Book Cover Art</Typography>
          </FormLabel>
          <ImageUpload />
          <Divider />
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="contained">Save Changes</Button>
            <Button onClick={handleClear}>Clear All</Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
