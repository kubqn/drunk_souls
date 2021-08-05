import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import VolumeUp from "@material-ui/icons/VolumeUp";
const useStyles = makeStyles({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 250,
    marginBottom: "50px",
    color: "white",
  },
  input: {
    width: 0,
  },
});

export default function InputSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(50);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Typography id="input-slider" gutterBottom>
          Głośność alarmu
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <VolumeUp />
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof value === "number" ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
              id="volumeComponent"
              className={classes.input}
              value={value}
              margin="dense"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 10,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
