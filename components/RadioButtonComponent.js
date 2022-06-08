import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Typography,
} from "@mui/material";

export default function RadioGroupComponent({
  id,
  label,
  itemList,
  value,
  setValue,
}) {
  const handleChange = (event, setValue) => {
    setValue(event.target.value);
  };

  return (
    <>
      <FormLabel id={id + "-radio-button-group"}>
        <Typography variant="h6">{label}</Typography>
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="status-radio-button-group"
        name="status-value"
        value={value}
        onChange={(e) => handleChange(e, setValue)}
      >
        {itemList.map((item, index) => (
          <FormControlLabel
            value={item}
            control={<Radio />}
            label={item}
            key={index}
          />
        ))}
      </RadioGroup>
    </>
  );
}
