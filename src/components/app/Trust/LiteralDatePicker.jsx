import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import relativeTIme from "dayjs/plugin/relativeTime";
import IconButton from "@mui/material/IconButton";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TrustContext } from "../../../context/trust-context";

const LiteralDatePicker = ({ onDated }) => {
  const [values, setValues] = useState({
    year: "",
    month: "",
    day: "",
    hour: "",
    minute: "",
  });
  // const [dateValue, setDateValue] = useState(dayjs("2022-04-07"))

  const trustCtx = useContext(TrustContext);
  const {
    workingTrust: { date },
  } = trustCtx;

  let foundYear;
  let foundMonth;
  let foundDay;
  let foundHour;
  let foundMinute;

  if (date) {
    if (date.dateTimeFullObject)
      foundYear = dayjs(date.dateTimeFullObject).format("YYYY");
    if (date.dateTimeFullObject)
      foundMonth = dayjs(date.dateTimeFullObject).format("MM");
    if (date.dateTimeFullObject)
      foundDay = dayjs(date.dateTimeFullObject).format("DD"); // h:mm A
    
  }

  const handleDateChange = () => {
    if (values.year === "" || values.year < 2022) {
      return;
    }

    let newDateValue = dayjs(`${values.year}-${values.month}-${values.day}`);

    const newDateObject = {
      dateTimeFromNowMessage: newDateValue.fromNow(),
      dateTimeUnix: newDateValue.unix(),
      dateTimeFullObject: newDateValue,
      dateTimeFormated: newDateValue.format("YYYY-MM-DD h:mm:ss A"),
    };

    onDated(newDateObject);
  };

  const handleMinuteChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    handleDateChange();
  };
  const handleHourChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    handleDateChange();
  };

  const handleDayChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    handleDateChange();
  };

  const handleMonthChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    handleDateChange();
  };

  const handleYearChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    handleDateChange();
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <Box>
            <Typography variant="h4" >
                Period
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="outlined-adornment-hour">Hour</InputLabel>
          <OutlinedInput
            id="outlined-adornment-hour"
            aria-describedby="my-helper-text"
            value={foundHour || values.hour}
            type="number"
            onChange={handleHourChange('hour')}
            endAdornment={
            <IconButton
                aria-label="hour"
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                <TodayIcon />
              </IconButton>}
            label="Hour"
          />
        <FormHelperText id="my-helper-text">Hour</FormHelperText>
        </FormControl>
        </Grid>
        <Grid item xs={6} md={4}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="outlined-adornment-min">minute</InputLabel>
          <OutlinedInput
            id="outlined-adornment-minute"
            aria-describedby="my-helper-text"
            value={foundMinute || values.minute}
            type="number"
            onChange={handleMinuteChange('minute')}
            endAdornment={
            <IconButton
                aria-label="minute"
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                <TodayIcon />
              </IconButton>}
            label="Minute"
          />
        <FormHelperText id="my-helper-text">Minute</FormHelperText>
        </FormControl>
        </Grid>
        <Grid item xs={6} md={4}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="outlined-adornment-year">Year</InputLabel>
            <OutlinedInput
              id="outlined-adornment-year"
              aria-describedby="my-helper-text"
              value={foundYear || values.year}
              type="number"
              onChange={handleYearChange("year")}
              endAdornment={
                <IconButton
                  aria-label="year"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <EventRepeatIcon />
                </IconButton>
              }
              label="Year"
            />
            <FormHelperText id="my-helper-text">Year</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={4}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="outlined-adornment-month">Month</InputLabel>
            <OutlinedInput
              id="outlined-adornment-month"
              aria-describedby="my-helper-text"
              value={foundMonth || values.month}
              type="number"
              onChange={handleMonthChange("month")}
              endAdornment={
                <IconButton
                  aria-label="month"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <CalendarMonthIcon />
                </IconButton>
              }
              label="Month"
            />
            <FormHelperText id="my-helper-text">Month</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={4}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="outlined-adornment-day">Day</InputLabel>
            <OutlinedInput
              id="outlined-adornment-day"
              aria-describedby="my-helper-text"
              value={foundDay || values.day}
              type="number"
              onChange={handleDayChange("day")}
              endAdornment={
                <IconButton
                  aria-label="day"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <TodayIcon />
                </IconButton>
              }
              label="Day"
            />
            <FormHelperText id="my-helper-text">Day</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

            
    </Box>
  );
};

export default LiteralDatePicker;
