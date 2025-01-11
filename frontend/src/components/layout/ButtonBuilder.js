import React from "react";
import Button from "@mui/material/Button";
import { forwardRef } from "react";

const ButtonBuilder = forwardRef((props, ref) => {
  const {
    variant = "contained",
    fontSize = 12,
    width = "auto",
    height = "auto",
    buttonColor = "black",
    buttonColorHover = "gray",
    label = "",
    labelColor = "white",
    icon = null,
    radius = 12,
    bold = false,
    onClick = () => {},
    hidden = false,
    ...rest
  } = props;
  const sx = {
    width: width,
    height: height,
    variant: variant,
    fontSize: fontSize,
    borderRadius: radius,
    borderColor: variant === "outlined" ? buttonColor : null,
    backgroundColor: variant === "contained" ? buttonColor : null,
    fontWeight: bold ? 700 : 400,
    color: labelColor,
    "&:hover": {
      borderColor: variant === "outlined" ? buttonColorHover : null,
      backgroundColor: variant === "contained" ? buttonColorHover : null,
      // color: labelColor,
    },
    textTransform: "none",
    display: hidden ? "none" : null,
  };
  return (
    <div>
      <Button
        onClick={onClick}
        variant={variant}
        startIcon={icon}
        sx={sx}
        {...rest}
        ref={ref}
      >
        {label}
      </Button>
    </div>
  );
});
ButtonBuilder.displayName = 'ButtonBuilder';
export default ButtonBuilder;
