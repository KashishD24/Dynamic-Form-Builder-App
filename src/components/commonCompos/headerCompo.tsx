import {
  Avatar,
  Box,
  Button,
  Drawer,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import texts from "../../assets/commonTexts.json";
import { adminDetail } from "../../utils/commonInterfaces";
import SideBarCompo from "./sideBar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import commonColors from "../../assets/commonColors";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import paths from "../../utils/paths";
import { clearAuth } from "../../store/authSlice";
import ThemeDrawer from "./themesDrawer";
import { headerInfo } from "../../utils/commonInterfaces";

export default function HeaderCompo({
  handleSideBar,
  openMenu,
  open,
  anchorEl,
  closeMenu,
  handleOpenDrawer,
}: headerInfo) {
  const adimnDetails = useSelector(
    (state: adminDetail) => state?.authData?.adminData
  );
  const cookies = new Cookies({ path: "/" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelLogOut = () => {
    cookies.remove("auther");
    dispatch(clearAuth());
    navigate(paths.authPage);
  };

  return (
    <Box className="fixed flex items-center justify-center !bg-blackFaded h-[70px] top-0 w-full p-2 z-50 shadow-custom-shadow-2">
      <Box className=" w-full flex items-center justify-start mr-auto">
        <Button
          onClick={handleSideBar}
          disableRipple
          startIcon={<MenuIcon className=" !text-[35px] " />}
          className=" !text-white !p-0 "
        />
        <Typography className="!text-[24px] text-white flex items-center gap-1">
          <MenuBookIcon />
          {texts.commonTexts.logoFormBuilder}
        </Typography>
      </Box>
      <Box className="w-full max-w-max flex items-center justify-end gap-2">
        <Avatar src={adimnDetails?.img} alt="avtr" />
        <Button
          disableRipple
          className=" text-gray_700 max-w-[30px] min-w-[30px] !bg-transparent"
          onClick={openMenu}
          startIcon={<KeyboardArrowDownIcon />}
        />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        sx={{
          "& .MuiPaper-root": {
            padding: "10px",
            maxHeight: "300px",
            msOverflowY: "scroll",
            backgroundColor: commonColors.gray_300,
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none" /* IE and Edge */,
            "scrollbar-width": "none" /* Firefox */,
          },
        }}
      >
        <MenuItem
          className=" border-2 border-dashed rounded-[5px]"
          onClick={handleOpenDrawer}
        >
          Themes
        </MenuItem>
        <MenuItem
          onClick={handelLogOut}
          className=" border-2 border-dashed rounded-[5px] mt-2"
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
