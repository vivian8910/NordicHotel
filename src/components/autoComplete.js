import React, { useState } from "react";
import Select from "react-select";
import { fade, makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  search: {
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

const AutoComplete = props => {
  const classes = useStyles();
  const { hotelsData, history } = props;

  const [value, setValue] = useState("");

  const handleChange = selectedOption => {
    setValue(selectedOption);
    history.push({
      pathname: '/hotels',
      search: `?hotel=${selectedOption.value.split(' ').join('-')}`
    })
    setValue("");
  };

  // const hotelsToBeSelected = hotels.hotels;
  // let emptyObject = {};
  // const emptyArray = [];
  // hotelsToBeSelected.map(hotel => {
  //   if (!emptyObject.hasOwnProperty(hotel.name)) {
  //     emptyObject.value = hotel.name;
  //     emptyObject.label = hotel.name;
  //     emptyArray.push(emptyObject);
  //     emptyObject = {};
  //   }
  //   return emptyArray;
  // });

  // remember to deal with duplicates
  const searchList = hotelsData.map(({ name }) => {
    return {
      value: name,
      label: name
    };
  });
  // console.log(searchList);
  // const searchListWithoutDuplicates = [...new Set(searchList)];
  // console.log("hi", searchListWithoutDuplicates);
  const options = searchList;

  const styles = {
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

  return (
    <div className={classes.search}>
      <Select
        label="Single select"
        options={options}
        className="react-select"
        classNamePrefix="react-select"
        styles={styles}
        placeholder="Search..."
        openMenuOnClick={false}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default withRouter(AutoComplete);
