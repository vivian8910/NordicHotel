import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import Select from "react-select";
import PropTypes from "prop-types";

const AutoComplete = ({ hotelsData, history }) => {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const handleChange = selectedOption => {
    setValue(selectedOption);
    history.push(`/hotels/${selectedOption.value.split(" ").join("-")}`);
    setValue("");
  };

  const options = hotelsData.map(({ name }) => {
    return {
      value: name,
      label: name
    };
  });

  return (
    <div className={classes.container}>
      <Select
        label="Single select"
        options={options}
        className="react-select"
        classNamePrefix="react-select"
        styles={seletctorStyles}
        placeholder="Search..."
        openMenuOnClick={false}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  }
}));

const seletctorStyles = {
  dropdownIndicator: base => ({
    ...base,
    display: "none"
  }),
  indicatorSeparator: base => ({
    ...base,
    display: "none"
  }),
  input: base => ({
    ...base,
    color: "inherit",
    fontSize: 14
  }),
  control: base => ({
    width: 170
  }),
  placeholder: base => ({
    ...base,
    userSelect: "none",
    pointerEvents: "none"
  }),
  menu: base => ({
    ...base,
    width: 285
  }),
  menuList: base => ({
    ...base,
    backgroundColor: "#3a6a81"
  })
};

AutoComplete.propTypes = {
  hotelsData: PropTypes.array.isRequired
};

export default withRouter(AutoComplete);
