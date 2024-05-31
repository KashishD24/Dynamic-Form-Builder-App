import { Box, Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin, fetchAdmins, handleDashboard } from "../store/authSlice";
import { useFormik } from "formik";
import { InputField } from "../components/commonCompos/commonFields";
import { authValidation } from "../utils/validations";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import texts from "../assets/commonTexts.json";
import { adminDetail, adminprofile } from "../utils/commonInterfaces";
import paths from "../utils/paths";
import CryptoJS from "crypto-js";
import bgImage from "../assets/images/loginBg.jpg";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function AuthPage() {
  const [showErrors, setShowErrors] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [allAdminsData, setAllAdminsData] = useState<any>([]);
  const adminDetails = useSelector(
    (state: adminDetail) => state?.authData?.allAdmins
  );
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const cookie = new Cookies({ path: "/" });
  const handleToUserBoard = () => {
    dispatch(handleDashboard("User"));
    navigate(paths.dashboardPage);
  };
  const generateEncryptedToken = (data: any) => {
    const secretKey = process.env.REACT_APP_AUTH0_CLIENT_ID
      ? process.env.REACT_APP_AUTH0_CLIENT_ID
      : "";
    const token = JSON.stringify(data);
    const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
    return encryptedToken;
  };
  const handleSubmitForm = () => {
    if (allAdminsData?.length > 0) {
      const findAdmin = allAdminsData?.find(
        (admin: adminprofile) => admin?.emailId === values.emailId
      );
      if (findAdmin !== undefined) {
        if (findAdmin?.password === values.password) {
          dispatch(addAdmin(findAdmin));
          const email = values.emailId;
          const token = generateEncryptedToken({ email });
          cookie.set("auther", token);
          navigate(paths.dashboardPage);
        } else {
          alert(texts.commonTexts.passwordNotMatched);
        }
      } else {
        alert(texts.commonTexts.noUserFound);
      }
    }
  };

  const handleShowErrors = () => {
    setShowErrors(true);
  };

  const { values, handleSubmit, handleChange, errors } = useFormik({
    validationSchema: authValidation,
    initialValues: {
      emailId: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSubmitForm();
    },
  });

  const handlePassword = () => {
    setIsPassword(!isPassword);
  };

  useEffect(() => {
    dispatch(fetchAdmins());
    if (adminDetails.length > 0) {
      setAllAdminsData(adminDetails);
    }
    if (cookie.get("auther") !== undefined) {
      navigate(paths.dashboardPage);
    }
  }, [adminDetails.length]);

  return (
    <Box className=" relative flex items-center justify-center !min-h-[100vh]">
      <Box
        className=" relative flex flex-col items-center justify-center inset-0 bg-cover bg-center !w-[50vw] !h-[100vh]"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Typography className=" !text-white text-4xl font-bold animation-slide-in  z-20">
          Online Form Builder
        </Typography>
        <Typography className=" !text-white text-[24px] font-bold animation-slide-right z-20">
          Create Forms, Collect Data, Effortlessly
        </Typography>
      </Box>
      <Box className="flex flex-col gap-[10px] items-center justify-center !w-[50vw] !h-[100vh]">
        <Typography className="!text-[28px] font-bold text-black flex items-center gap-1">
          <MenuBookIcon />
          {texts.commonTexts.logoFormBuilder}
        </Typography>
        <Card className=" !bg-blackFaded text-white p-[5vh_5vw_10vh_5vw] !max-w-[500px] w-full animation-fade-up shadow-custom-shadow-5">
          <Typography className="!mb-[5vh] text-center text-[24px] text-white font-bold">
            Login as Admin
          </Typography>
          <form onSubmit={handleSubmit} className=" !w-full">
            <Box className=" flex flex-col items-center justify-center gap-3 w-full">
              <InputField
                value={values.emailId}
                name={"emailId"}
                onChangeHandler={handleChange}
                type={"email"}
                label={texts.commonTexts.emailid}
                placeHolder={texts.commonTexts.enterEmailId}
                isError={showErrors}
                error={errors.emailId}
              />
              <InputField
                value={values.password}
                name={"password"}
                onChangeHandler={handleChange}
                type={isPassword ? "text" : "password"}
                adornment={true}
                label={texts.commonTexts.password}
                placeHolder={texts.commonTexts.enterPassword}
                isError={showErrors}
                error={errors.password}
                showPassword={isPassword}
                handlePassword={handlePassword}
              />
            </Box>
            <Box className=" flex items-center justify-between mt-3">
              <Button
                disableRipple
                className=" normal-case !text-white text-bold"
                onClick={handleToUserBoard}
              >
                Continue as a user
              </Button>
              <Button
                type="submit"
                onClick={handleShowErrors}
                className="!bg-fadedGray !text-white !w-full max-w-[150px]"
              >
                {texts.commonTexts.login}
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </Box>
  );
}
