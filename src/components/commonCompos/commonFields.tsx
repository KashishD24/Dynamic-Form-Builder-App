import React from "react";
import {
  InputAdornment,
  TextField,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Autocomplete,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import commonColors from "../../assets/commonColors";
import { fieldData } from "../../utils/commonInterfaces";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  autoInpuData,
  cheboxData,
  radioData,
  dropdownFieldData,
  datepickerFieldData,
} from "../../utils/commonInterfaces";

export function InputField({
  value,
  onChangeHandler,
  type,
  adornment,
  name,
  label,
  placeHolder,
  isError,
  error,
  handlePassword,
  showPassword,
  addField,
}: fieldData) {
  return (
    <Box className=" !w-full flex flex-col items-start justify-start gap-[1vh]">
      <Typography
        className={addField ? " text-gray_700 font-bold" : "font-bold"}
      >
        {label}
      </Typography>
      <TextField
        type={type}
        value={value}
        onChange={onChangeHandler}
        InputProps={{
          endAdornment: adornment && (
            <InputAdornment className=" cursor-pointer" position="end">
              {showPassword ? (
                <RemoveRedEyeIcon onClick={handlePassword} />
              ) : (
                <VisibilityOffIcon onClick={handlePassword} />
              )}
            </InputAdornment>
          ),
          inputProps: { min: 0 },
          sx: {
            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
              {
                "-webkit-appearance": "none",
                margin: 0,
              },
            "& input[type=number]": {
              "-moz-appearance": "textfield",
            },
          },
        }}
        name={name}
        placeholder={placeHolder}
        size="small"
        sx={{ backgroundColor: commonColors.white, borderRadius: "5px" }}
        className=" !w-full"
      />
      <Typography className="text-fadedRed">{error}</Typography>
    </Box>
  );
}

export function AutoInputField({ props, selectedData }: autoInpuData) {
  props.inputProps.value = selectedData?.label ? selectedData?.label : "";
  return (
    <TextField
      {...props}
      sx={{
        backgroundColor: commonColors.white,
        borderRadius: "4px",
      }}
      placeholder="Search here"
    />
  );
}

export function CheckBoxField({
  field,
  fieldData,
  handleCheckBox,
  handleShowError,
}: cheboxData) {
  return (
    <>
      <Typography className=" text-gray_700 font-bold">
        {field.label}
      </Typography>
      {field.fieldOptions.map((item: any) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={
                fieldData[field.key]?.length > 0
                  ? fieldData[field.key]?.some((lab: any) => lab === item.value)
                  : false
              }
              onChange={(e: any) => handleCheckBox(e, item.value, field.key)}
              color="primary"
              className="text-blue-500"
              sx={{
                color: commonColors.gray_700,
                "&.Mui-checked": {
                  color: commonColors.gray_600,
                },
              }}
            />
          }
          label={item.label}
          className=" text-gray_700"
        />
      ))}
      <Typography className="text-fadedRed">
        {handleShowError(
          field.validation,
          field.regularExp,
          fieldData[field.key],
          `Select valid ${field.label}`
        )}
      </Typography>
    </>
  );
}

export function RadionBtnField({
  field,
  fieldData,
  handleChangeFieldData,
  handleShowError,
}: radioData) {
  return (
    <FormControl component="fieldset">
      <FormLabel
        component="legend"
        className="!text-gray_700 normal-case !text-[16px] font-bold"
      >
        {field.label}
      </FormLabel>
      <RadioGroup
        aria-label="options"
        name="controlled-radio-buttons-group"
        value={fieldData[field.key]}
        onChange={(e: any) => handleChangeFieldData(e, field.key)}
      >
        {field.fieldOptions.map((item: any) => (
          <FormControlLabel
            value={item.value}
            control={
              <Radio
                sx={{
                  color: commonColors.gray_800,
                  "&.Mui-checked": {
                    color: commonColors.gray_800,
                  },
                }}
              />
            }
            label={item.label}
            className="text-gray_700"
          />
        ))}
      </RadioGroup>
      <Typography className="text-fadedRed">
        {handleShowError(
          field.validation,
          field.regularExp,
          fieldData[field.key],
          `Select valid ${field.label}`
        )}
      </Typography>
    </FormControl>
  );
}

export function DropdownField({
  field,
  fieldData,
  handleChangeFieldData,
  handleShowError,
  isMultiple,
  handleMultiple,
  selectedLabel,
}: dropdownFieldData) {
  return (
    <div className="flex flex-col gap-2">
      <Typography className=" text-gray_700 font-bold">
        {field.label}
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={isMultiple}
            onChange={(e: any) => handleMultiple(e)}
            color="primary"
            className="text-blue-500"
            sx={{
              color: commonColors.gray_700,
              "&.Mui-checked": {
                color: commonColors.gray_600,
              },
            }}
          />
        }
        label={"Select multiple options "}
        className=" text-gray_700"
      />
      <Autocomplete
        multiple={isMultiple}
        className="mb-2"
        value={fieldData[field.key]}
        onChange={(event: any, newValue: any) => {
          handleChangeFieldData(newValue, field.key, "select");
        }}
        options={field.fieldOptions}
        renderInput={(params) => (
          <AutoInputField props={params} selectedData={selectedLabel} />
        )}
        sx={{
          "& .MuiAutocomplete-inputRoot": {
            height: isMultiple ? undefined : "40px",
          },
        }}
      />
      <Typography className="text-fadedRed">
        {handleShowError(
          field.validation,
          field.regularExp,
          fieldData[field.key],
          `Select valid ${field.label}`
        )}
      </Typography>
    </div>
  );
}

export function DatcpickerField({
  field,
  fieldData,
  handleChangeFieldData,
  handleShowError,
}: datepickerFieldData) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="flex flex-col gap-2">
        <Typography className=" text-gray_700 font-bold">
          {field.label}
        </Typography>
        <DatePicker
          value={fieldData[field.key]}
          onChange={(e: any) => handleChangeFieldData(e, field.key, "date")}
          slots={{
            textField: (textFieldProps) => (
              <TextField
                {...textFieldProps}
                sx={{
                  height: "40px",
                  "& .MuiInputBase-root": {
                    backgroundColor: commonColors.white,
                    height: "40px",
                    minWidth: "200px",
                  },
                }}
              />
            ),
          }}
        />
        <Typography className="text-fadedRed">
          {handleShowError(
            field.validation,
            field.regularExp,
            fieldData[field.key],
            `Select valid ${field.label}`
          )}
        </Typography>
      </Box>
    </LocalizationProvider>
  );
}
