import { Box, Button, TextField, Typography } from "@mui/material";
import {
  InputField,
  CheckBoxField,
  RadionBtnField,
  DropdownField,
  DatcpickerField,
} from "../../../commonCompos/commonFields";
import { rowData } from "../../../../utils/commonInterfaces";
import formBgimage from "../../../../assets/images/formBg.jpg";
import { inputFieldType } from "../../../../utils/commonMethods";
import AddIcon from "@mui/icons-material/Add";
import { templateData } from "../../../../utils/commonInterfaces";

export default function TemplateTwo({
  fieldsData,
  showPassword,
  handleChangeFieldData,
  fieldData,
  isError,
  handleShowError,
  handlePassword,
  handleCheckBox,
  isMultiple,
  handleMultiple,
  selectedLabel,
  imageRef,
  handleChangeImageFieldData,
}: templateData) {
  return (
    <Box className="!bg-gray_300 h-[25vh] w-full flex items-center justify-center rounded-[4px]">
      <div
        className="bg-cover bg-center w-[80%] h-[80vh] rounded-t-[4px]"
        style={{
          backgroundImage: `url(${formBgimage})`,
        }}
      />
      <div className=" w-full p-[10px_20px] gap-3 h-[80vh] overflow-y-scroll hide-scrollbar">
        {fieldsData.map(
          (field: rowData) =>
            field.active &&
            (inputFieldType(field.type) ? (
              <InputField
                type={
                  field.type === "password"
                    ? `${showPassword ? "text" : "password"}`
                    : field.type
                }
                value={fieldData[field.key]}
                onChangeHandler={(e: any) =>
                  handleChangeFieldData(e, field.key)
                }
                name={field.type}
                label={field.label}
                placeHolder={"Enter here..."}
                isError={isError}
                error={handleShowError(
                  field.validation,
                  field.regularExp,
                  fieldData[field.key],
                  `Enter valid ${field.label}`
                )}
                showPassword={showPassword}
                handlePassword={handlePassword}
                addField={true}
                adornment={field.type === "password" ? true : false}
              />
            ) : field.type === "checkbox" ? (
              <CheckBoxField
                field={field}
                fieldData={fieldData}
                handleCheckBox={handleCheckBox}
                handleShowError={handleShowError}
              />
            ) : field.type === "radio" ? (
              <RadionBtnField
                field={field}
                fieldData={fieldData}
                handleChangeFieldData={handleChangeFieldData}
                handleShowError={handleShowError}
              />
            ) : field.type === "select" ? (
              <DropdownField
                field={field}
                fieldData={fieldData}
                handleChangeFieldData={handleChangeFieldData}
                handleShowError={handleShowError}
                isMultiple={isMultiple}
                handleMultiple={handleMultiple}
                selectedLabel={selectedLabel}
              />
            ) : field.type === "date" ? (
              <DatcpickerField
                field={field}
                fieldData={fieldData}
                handleChangeFieldData={handleChangeFieldData}
                handleShowError={handleShowError}
              />
            ) : field.type === "image" ? (
              <Box className=" w-full flex flex-col gap2 mb-2">
                <Typography className=" text-gray_700 font-bold">
                  {field.label}
                </Typography>
                <div className=" relative flex flex-col items-center justify-center h-[100px] w-[200px] border-2 border-dashed">
                  {fieldData[field.key] ? (
                    <img
                      src={fieldData[field.key]}
                      alt="image"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <input
                        type="file"
                        ref={imageRef}
                        value={fieldData[field.key]}
                        hidden
                        accept="image/*"
                        onChange={(e: any) =>
                          handleChangeImageFieldData(e, field.key)
                        }
                      />
                      <Typography className=" text-gray_700 font-bold">
                        Select image
                      </Typography>
                      <Button
                        onClick={() => imageRef.current.click()}
                        className=" text-gray_700 font-bold"
                        endIcon={<AddIcon />}
                      />
                    </>
                  )}
                </div>
                <Typography className="text-fadedRed">
                  {handleShowError(
                    field.validation,
                    field.regularExp,
                    fieldData[field.key],
                    `Select valid ${field.label}`
                  )}
                </Typography>
              </Box>
            ) : field.type === "file" ? (
              <div className=" w-full flex flex-col gap2">
                <Typography className=" text-gray_700 font-bold">
                  {field.label}
                </Typography>
                <TextField
                  type="file"
                  onChange={(e: any) =>
                    handleChangeImageFieldData(e, field.key)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
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
            ) : null)
        )}
        <div className=" bottom-0 w-full h-[60px] flex items-center justify-center p-[10px_20px]">
          <Button
            type="submit"
            disableRipple
            className=" !bg-gray_800 normal-case !text-white w-full max-w-[100px]"
          >
            Submit
          </Button>
        </div>
      </div>
    </Box>
  );
}
