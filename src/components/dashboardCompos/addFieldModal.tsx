import {
  Box,
  Dialog,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Alert,
  Menu,
  DialogContent,
} from "@mui/material";
import { fieldModalData } from "../../utils/commonInterfaces";
import { InputField } from "../commonCompos/commonFields";
import jsonData from "./commonData.json";
import formBgImg from "../../assets/images/formBg.jpg";
import commonColors from "../../assets/commonColors";
import { Fragment } from "react/jsx-runtime";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

export default function AddFieldModal({
  onCloseModal,
  open,
  filedData,
  handleChange,
  handleSubmit,
  isError,
  showAlert,
  isExist,
  isEdit,
  showOptions,
  handleAddOptions,
  handleDeleteOptions,
  handleChangeOptions,
}: fieldModalData) {
  return (
    <Dialog
      open={open}
      onClose={onCloseModal}
      className="inset-0 bg-cover bg-center hide-scrollbar"
    >
      <DialogContent
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
      >
        <CloseIcon onClick={onCloseModal} className=" ml-[95%] mb-[15px]" />
        <Box className=" flex flex-col gap-3 p-[25px] min-w-[450px]">
          <Typography className=" text-center !bg-blackTrans !text-[24px] !text-white font-bold">
            {isEdit ? "Edit Field" : "Add Field"}
          </Typography>
          <div className="flex flex-col gap-2">
            <Typography className=" text-gray_700 font-bold">
              Field Type
            </Typography>
            <Autocomplete
              className="mb-2"
              value={filedData.type}
              onChange={(event: any, newValue: string | null) => {
                handleChange(newValue, "type");
              }}
              options={jsonData.options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Enter field type"
                  sx={{ backgroundColor: "white", borderRadius: "4px" }}
                />
              )}
            />
            {isError && filedData.type.length < 1 && (
              <Typography className="text-fadedRed">
                This field is Required
              </Typography>
            )}
            {filedData.fieldOptions.length > 0 && showOptions ? (
              <>
                <Typography className=" text-gray_700 font-bold">
                  Add Options
                </Typography>
                {filedData.fieldOptions.map((option: any, index: number) => (
                  <div className="w-full flex gap-2 items-start border-darkMarron border-dashed border-2 rounded-[4px] p-[10px]">
                    <div className="w-full">
                      <InputField
                        value={option.label}
                        name={"label"}
                        onChangeHandler={(e: any) =>
                          handleChangeOptions(e, option.id, "label")
                        }
                        type={"text"}
                        label={"Option label"}
                        placeHolder={"Enter label"}
                        isError={isError}
                        error={
                          isError && option.label.length < 1
                            ? "This field is required"
                            : ""
                        }
                      />
                      <InputField
                        value={option.value}
                        name={"value"}
                        onChangeHandler={(e: any) =>
                          handleChangeOptions(e, option.id, "value")
                        }
                        type={"text"}
                        label={"Option value"}
                        placeHolder={"Enter value name"}
                        isError={isError}
                        error={
                          isError && option.value.length < 1
                            ? "This field is required"
                            : ""
                        }
                      />
                    </div>
                    {filedData.fieldOptions.length > 1 && (
                      <Button
                        variant="text"
                        disableRipple
                        className="max-w-[25px] min-w-[25px] ml-auto p-0 normal-case text-fadedRed"
                        endIcon={<DeleteIcon />}
                        onClick={() => handleDeleteOptions(option.id)}
                      />
                    )}
                  </div>
                ))}
                <Button
                  disableRipple
                  className="ml-auto normal-case text-gray_700 max-w-max"
                  onClick={handleAddOptions}
                >
                  + Add Options
                </Button>
              </>
            ) : null}
          </div>
          <InputField
            value={filedData.key}
            name={"text"}
            onChangeHandler={(e: any) => handleChange(e, "key")}
            type={"text"}
            label={"Key"}
            placeHolder={"Enter key name"}
            isError={isError}
            error={
              isError && filedData.key.length < 1
                ? "This field is required"
                : ""
            }
            addField={true}
          />
          <InputField
            value={filedData.label}
            name={"text"}
            onChangeHandler={(e: any) => handleChange(e, "label")}
            type={"text"}
            label={"Label"}
            placeHolder={"Enter label"}
            isError={isError}
            error={
              isError && filedData.label.length < 1
                ? "This field is required"
                : ""
            }
            addField={true}
          />
          <FormControlLabel
            label={
              <Typography className=" text-gray_700 font-bold">
                Is validation required ?
              </Typography>
            }
            control={
              <Checkbox
                checked={filedData.validation}
                onChange={(e: any) => handleChange(e, "validation")}
                sx={{
                  color: commonColors.gray_700,
                  "&.Mui-checked": {
                    color: commonColors.gray_600,
                  },
                }}
              />
            }
          />
          {filedData.validation && (
            <InputField
              value={filedData.regularExp}
              name={"regex"}
              onChangeHandler={(e: any) => handleChange(e, "regularExp")}
              type={"text"}
              label={"RegularExpression"}
              placeHolder={"Enter Regularexpression"}
              isError={isError}
              error={""}
              addField={true}
            />
          )}
          <Button
            type="submit"
            className=" !bg-gray_700 !text-white"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {showAlert && (
            <Alert severity={isExist ? "error" : "success"}>
              {isExist
                ? "This field already exist."
                : "Field added succesfully."}
            </Alert>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
