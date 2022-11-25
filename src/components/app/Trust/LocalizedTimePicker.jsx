import * as React from "react";
import dayjs from "dayjs";
import relativeTIme from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";
import "dayjs/locale/ar-sa";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from '@mui/material/FormHelperText';

dayjs.extend(relativeTIme);


const locales = ["en", "ru", "ar-sa"];

// prettier-ignore

const ampmOptions = {"am": true, "pm": false}

export default function LocalizedTimePicker({onDated}) {
  const [locale, setLocale] = React.useState("en");
  const [dateTimeValue, setDateTimeValue] = React.useState(dayjs("2022-04-07"));

  const [ampm, setAmpm] = React.useState("am");


  // console.log(dateTimeValue.format('YYYY-MM-DD h:mm:ss A'))
  // console.log("hello: ", dateTimeValue.unix() )
  // console.log(dayjs('2023-01-01').fromNow() )
  // console.log(dayjs.unix(dateTimeValue.unix()))

  const selectAmpm = (_ampm) => {
    setAmpm(_ampm);
  };


  const handleLocaleChange = (event) => {
    setLocale(event.target.value)
  };

  const handleDateTimeChange = (newDateTimeValue) =>{
    onDated({
      dateTimeFromNowMessage: newDateTimeValue.fromNow(),
      dateTimeUnix: newDateTimeValue.unix(),
      dateTimeFullObject: newDateTimeValue,
      dateTimeFormated: newDateTimeValue.format('YYYY-MM-DD h:mm:ss A'),
    })
    setDateTimeValue(newDateTimeValue);
  }



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>

          <ToggleButtonGroup
            value={ampm}
            exclusive
            size="lg"
            sx={{ display: "block" }}
            aria-describedby="my-helper-amount"
          >
            {Object.keys(ampmOptions).map((ampmItem) => (
              <ToggleButton
                key={ampmItem}
                value={ampmItem}
                onClick={() => selectAmpm(ampmItem)}
                size="large"
              >
                {ampmItem}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <FormControl sx={{ m: 1, minWidth: 120, }}>
            <InputLabel id="demo-simple-select-helper-label">Locale</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={locale}
              label="Locale"
              onChange={handleLocaleChange}
              sx={{textTransform: "uppercase" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {locales.map(locale => (<MenuItem key={locale} value={locale} sx={{textTransform: "uppercase"}}>{locale}</MenuItem>))}
            </Select>
            <FormHelperText>With label + helper text</FormHelperText>
          </FormControl>

          
        </Stack>

        <DateTimePicker
          value={dateTimeValue}
          onChange={handleDateTimeChange}
          renderInput={(params) => <TextField {...params} />}
          ampm={ampmOptions[ampm]}
        />
      </Stack>
    </LocalizationProvider>
  );
}
