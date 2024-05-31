import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Drawer,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { sidebarData } from "../../utils/commonInterfaces";
import commonColors from "../../assets/commonColors";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import paths from "../../utils/paths";
import texts from "../../assets/commonTexts.json";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { clearAuth } from "../../store/authSlice";

export default function SideBarCompo({
  open,
  onCancel,
  handleDashboardType,
  dashboardType,
}: sidebarData) {
  type AccordionPanel = "Admin" | "User" | false;
  const [expanded, setExpanded] = useState<AccordionPanel>("User");

  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const handelLogOut = () => {
    cookies.remove("auther");
    dispatch(clearAuth());
    navigate(paths.authPage);
  };

  const navigationData = [
    {
      label: "Admin",
      icon: <ContactEmergencyIcon />,
      childData: [
        {
          label: "Dashboard",
          icon: <DashboardIcon />,
          path: paths.dashboardPage,
        },
      ],
    },
    {
      label: "User",
      icon: <PersonIcon />,
      childData: [
        {
          label: "Dashboard",
          icon: <DashboardIcon />,
          path: paths.dashboardPage,
        },
      ],
    },
  ];
  useEffect(() => {
    handleChange(dashboardType);
  }, []);

  return (
    <Drawer
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: { backgroundColor: commonColors.gray_500 },
      }}
    >
      <Box className="flex flex-col min-w-[300px] p-[10px] pt-[15px] pb-[15px] !h-full">
        <Box className=" !bg-white flex items-center justify-center mb-5">
          <Typography className="!text-[24px] text-black flex items-center gap-1">
            <MenuBookIcon />
            {texts.commonTexts.logoFormBuilder}
          </Typography>
        </Box>
        {navigationData.map((item) => (
          <Accordion
            expanded={expanded === item.label}
            onChange={handleChange(item.label)}
            className="!w-full rounded-[5px] mt-5"
          >
            <AccordionSummary
              className=" rounded-[5px]"
              style={{
                backgroundColor:
                  dashboardType === item.label
                    ? commonColors.gray_700
                    : commonColors.white,
                color:
                  dashboardType === item.label
                    ? commonColors.white
                    : commonColors.black,
              }}
              expandIcon={<KeyboardArrowDownIcon />}
            >
              {item.icon}
              <Typography className="ml-3">{item.label}</Typography>
            </AccordionSummary>
            <Divider />
            {item.childData.map((child) => (
              <AccordionDetails
                className="cursor-pointer w-full flex rounded-[5px]"
                style={{
                  backgroundColor:
                    dashboardType === item.label
                      ? commonColors.gray_300
                      : commonColors.white,
                  color:
                    dashboardType === item.label
                      ? commonColors.gray_700
                      : commonColors.black,
                }}
                onClick={() => handleDashboardType(item.label)}
              >
                {child.icon}
                <Typography className="ml-3">{child.label}</Typography>
              </AccordionDetails>
            ))}
          </Accordion>
        ))}
        <Button
          className="flex gap-2 transform-none normal-case !text-black !bg-white !w-full mt-auto"
          onClick={handelLogOut}
        >
          <LogoutIcon />
          <Typography> {texts.commonTexts.logout} </Typography>
        </Button>
      </Box>
    </Drawer>
  );
}
