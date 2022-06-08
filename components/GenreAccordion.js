import {
  FormControlLabel,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  FormGroup,
  Checkbox,
  Button,
  FormLabel,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function GenreAccordion({ value, itemDict, setValue }) {
  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClear = () => {
    setValue(itemDict);
  };

  return (
    <>
      <FormLabel>
        <Typography variant="h6">Genres</Typography>
      </FormLabel>
      <Accordion sx={{ backgroundColor: "#202020" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {value === itemDict ? (
            <Typography sx={{ color: "#777777" }}>Select</Typography>
          ) : (
            <Grid
              container
              spacing={1}
              columns={{ xs: 2, sm: 10, md: 12 }}
              sx={{ marginRight: 2 }}
            >
              {Object.keys(value).map((item, index) =>
                value[item] === true ? (
                  <Grid item xs={1} sm={2} md={2} key={index}>
                    <Paper elevation={2} sx={{ backgroundColor: "#404040" }}>
                      <Typography sx={{ p: 0.4 }} align="center">
                        {item}
                      </Typography>
                    </Paper>
                  </Grid>
                ) : null
              )}
            </Grid>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {Object.keys(value).map((item, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value[item]}
                    onChange={handleChange}
                    name={item}
                  />
                }
                label={item}
                key={index}
              />
            ))}
          </FormGroup>
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Button onClick={handleClear}>Clear All</Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
