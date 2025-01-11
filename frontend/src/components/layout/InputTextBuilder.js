import React from "react";

const localStringToNumber = (s) => {
    return Number(String(s).replace(/[^0-9.-]+/g, ""));
  };

function InputTextBuilder(props) {
  function currencyOnFocus(e) {

    const value = e.target.value;
    e.target.value = value ? localStringToNumber(value) : "";
  }

  function currencyOnBlur(e) {
    const value = e.target.value;

    const options = {
      maximumFractionDigits: 2,
      currency: "SGD",
      style: "currency",
      currencyDisplay: "symbol",
    };
    e.target.value =
      value || value === 0
        ? localStringToNumber(value).toLocaleString(undefined, options)
        : "$0.00";
    props.onChange(e);
  }

  return (
    <div className="inputText-container">
      <label className="inputText-label">{props.label}</label>
      <input
        className="inputText"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        value={props.value}
        onChange={
          props.onChange
            ? (e) => {
                props.onChange(e);
              }
            : null
        }
        onFocus={props.type === "currency" ? currencyOnFocus : null}
        onBlur={props.type === "currency" ? currencyOnBlur : null}
        disabled={props.disabled ? true : false}
      />
    </div>
  );
}

export default InputTextBuilder;
