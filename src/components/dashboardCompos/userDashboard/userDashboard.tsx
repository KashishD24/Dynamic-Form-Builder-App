import {
  Box,
  Button,
  Card,
  TextField,
  Container,
  Grid,
  Paper,
  Typography,
  CardContent,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  InputField,
  AutoInputField,
  CheckBoxField,
  RadionBtnField,
  DropdownField,
  DatcpickerField,
} from "../../commonCompos/commonFields";
import { useDispatch, useSelector } from "react-redux";
import { adminDetail, rowData } from "../../../utils/commonInterfaces";
import { fetchAdmins } from "../../../store/authSlice";
import formBgimage from "../../../assets/images/formBg.jpg";
import {
  inputFieldType,
  randomeIdGenerater,
  validateEmptyFields,
} from "../../../utils/commonMethods";
import commonColors from "../../../assets/commonColors";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import { addUserForms, fetchUsers } from "../../../store/usersSlice";
import { postData } from "../../../utils/apis";
import TemplateOne from "./templatesCompos/templateOne";
import TemplateTwo from "./templatesCompos/templateTwo";
import TemplateThree from "./templatesCompos/templateThree";
import { userDashboardData } from "../../../utils/commonInterfaces";

export default function UserDashboard({ selectedTemplate }: userDashboardData) {
  const [fieldsData, setFieldsData] = useState<any>([]);
  const [isError, setIsError] = useState(false);
  const adminDataFields = useSelector(
    (state: adminDetail) => state.authData.allAdmins[0]?.allFields
  );
  const [showPassword, setShowPassword] = useState(false);
  const userForms = useSelector((state: any) => state.usersData);
  const dispatch = useDispatch<any>();
  const [fieldData, setFieldData] = useState<any>({});
  const [selectedLabel, setSelectedLabel] = useState({});
  const imageRef = useRef<any>();
  const [isMultiple, setIsMultiple] = useState(false);

  const handleChangeFieldData = (e: any, keyName: string, type?: string) => {
    if (type === "select") {
      if (isMultiple) {
        setFieldData({
          ...fieldData,
          [keyName]: e,
        });
        if (e === null) {
          setSelectedLabel({});
        } else {
          setSelectedLabel(e);
        }
      } else {
        setFieldData({
          ...fieldData,
          [keyName]: [e],
        });
        if (e === null) {
          setSelectedLabel({});
        } else {
          setSelectedLabel(e);
        }
      }
    } else if (type === "date") {
      setFieldData({ ...fieldData, [keyName]: e });
    } else {
      setFieldData({ ...fieldData, [keyName]: e.target.value });
    }
  };

  const handleCheckBox = (e: any, value: any, keyName: string) => {
    if (e.target.checked) {
      setFieldData({ ...fieldData, [keyName]: [...fieldData[keyName], value] });
    } else {
      const filterd = fieldData[keyName].filter((item: any) => item !== value);
      setFieldData({ ...fieldData, [keyName]: filterd });
    }
  };

  const handleChangeImageFieldData = (event: any, keyName: string) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setFieldData({ ...fieldData, [keyName]: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRegexValidations = (array: any, object: any) => {
    for (const key in object) {
      if (key !== "id") {
        if (
          array[array.findIndex((item: any) => item.key === key)]?.validation
        ) {
          if (
            !array[array.findIndex((item: any) => item.key === key)]?.regularExp
          ) {
            if (object[key]?.length < 1) {
              return false;
            }
          } else {
            const regex = new RegExp(
              array[
                array.findIndex((item: any) => item.key === key)
              ]?.regularExp
            );
            if (!regex.test(object[key])) {
              return false;
            }
          }
        }
      }
    }
    return true;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsError(true);
    if (handleRegexValidations(adminDataFields, fieldData)) {
      postData(fieldData, "userForms")
        .then((res) => {
          dispatch(addUserForms(res));
        })
        .then(() => {
          setIsError(false);
          setFieldData(handleDynemicFields(adminDataFields));
          setFieldsData(adminDataFields);
        });
    }
  };

  const handleDynemicFields = (data: any) => {
    let object = {
      id: randomeIdGenerater(),
    } as any;

    data?.map((item: any) => {
      if (item.type === "checkbox" || item.type === "select") {
        object[item.key] = [];
      } else if (item.type === "image") {
        object[item.key] = null;
      } else {
        object[item.key] = "";
      }
    });
    return object;
  };

  const handleMultiple = (e: any) => {
    setIsMultiple(e.target.checked);
  };
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowError = (
    validation: any,
    regularExp: any,
    value: any,
    regularExpMessage: any
  ) => {
    if (isError && validation) {
      if (regularExp.length > 0) {
        if (!new RegExp(regularExp).test(fieldData[value])) {
          return regularExpMessage;
        }
      } else if (value.length < 1) {
        return "This field is required";
      }
    } else {
      return "";
    }
  };

  useEffect(() => {
    dispatch(fetchAdmins());
    setFieldData(handleDynemicFields(adminDataFields));
    dispatch(fetchUsers());
    setFieldsData(adminDataFields);
  }, []);

  return (
    <Box className=" flex bg-gray_100 items-center justify-between w-full  gap-[15px] p-[15px_8vw_15px_8vw] h-full">
      <div className="mt-[70px] w-full flex items-center justify-center flex-col">
        <Typography className=" text-[24px] font-bold text-gray_700">
          User Form
        </Typography>
        <Card
          className={`!bg-gray_300 w-full h-[80vh]`}
          style={{ maxWidth: selectedTemplate === 1 ? "700px" : "500px" }}
        >
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col items-center justify-center w-full h-[80vh]"
          >
            {selectedTemplate === 0 ? (
              <TemplateOne
                fieldsData={fieldsData}
                showPassword={showPassword}
                handleChangeFieldData={handleChangeFieldData}
                fieldData={fieldData}
                isError={isError}
                handleShowError={handleShowError}
                handlePassword={handlePassword}
                handleCheckBox={handleCheckBox}
                isMultiple={isMultiple}
                handleMultiple={handleMultiple}
                selectedLabel={selectedLabel}
                imageRef={imageRef}
                handleChangeImageFieldData={handleChangeImageFieldData}
              />
            ) : selectedTemplate === 1 ? (
              <TemplateTwo
                fieldsData={fieldsData}
                showPassword={showPassword}
                handleChangeFieldData={handleChangeFieldData}
                fieldData={fieldData}
                isError={isError}
                handleShowError={handleShowError}
                handlePassword={handlePassword}
                handleCheckBox={handleCheckBox}
                isMultiple={isMultiple}
                handleMultiple={handleMultiple}
                selectedLabel={selectedLabel}
                imageRef={imageRef}
                handleChangeImageFieldData={handleChangeImageFieldData}
              />
            ) : (
              <TemplateThree
                fieldsData={fieldsData}
                showPassword={showPassword}
                handleChangeFieldData={handleChangeFieldData}
                fieldData={fieldData}
                isError={isError}
                handleShowError={handleShowError}
                handlePassword={handlePassword}
                handleCheckBox={handleCheckBox}
                isMultiple={isMultiple}
                handleMultiple={handleMultiple}
                selectedLabel={selectedLabel}
                imageRef={imageRef}
                handleChangeImageFieldData={handleChangeImageFieldData}
              />
            )}
          </form>
        </Card>
      </div>
    </Box>
  );
}
