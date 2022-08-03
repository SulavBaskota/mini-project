import { useState } from "react";
import { Box, SpeedDial, SpeedDialAction } from "@mui/material";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import TextFieldsIcon from "@mui/icons-material/TextFields";

const actions = [
  { icon: <TextDecreaseIcon />, name: "Decrease" },
  { icon: <TextIncreaseIcon />, name: "Increase" },
];

export default function FontSizeSpeedDial({ fontSize, setFontSize }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const storeFontSize = (fontSize) => {
    localStorage.setItem("fontSize", JSON.stringify(fontSize));
  };

  const handleIncrease = () => {
    setFontSize(fontSize + 1);
    storeFontSize(fontSize + 1);
  };

  const handleDecrease = () => {
    setFontSize(fontSize - 1);
    storeFontSize(fontSize - 1);
  };

  return (
    <Box>
      <SpeedDial
        ariaLabel="Fontsize control speed dial"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<TextFieldsIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={
              action.name === "Decrease" ? handleDecrease : handleIncrease
            }
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
