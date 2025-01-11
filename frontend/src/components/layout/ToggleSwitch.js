import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function ToggleSwitch({
  label = "",
  labelTextColor = "black",
  labelFontSize = "20px",
  switchColor = "blue",
  checked = false,
  onChange = () => {},
}) {
  const formControlLabelStyle = {
    "& .MuiFormControlLabel-label": {
      color: labelTextColor,
      fontSize: labelFontSize,
    },
  };
  const switchStyle = {
    "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
      backgroundColor: switchColor,
    },
    "&.MuiSwitch-root .Mui-checked": {
      color: switchColor,
    },
  };

  return (
    <div style={{ paddingTop: 6 }}>
      <FormControlLabel
        control={<Switch sx={switchStyle} checked={checked} onChange={onChange} />}
        label={label}
        sx={formControlLabelStyle}
      />
    </div>
  );
}

export default ToggleSwitch;
