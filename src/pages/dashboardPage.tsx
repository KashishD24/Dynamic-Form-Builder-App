import { Box, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import HeaderCompo from "../components/commonCompos/headerCompo";
import { useDispatch, useSelector } from "react-redux";
import { handleDashboard, updateAdminFields } from "../store/authSlice";
import AdminDashboard from "../components/dashboardCompos/adminDasboard/adminDashboard";
import UserDashboard from "../components/dashboardCompos/userDashboard/userDashboard";
import SideBarCompo from "../components/commonCompos/sideBar";
import commonColors from "../assets/commonColors";
import { selectTemplate } from "../store/usersSlice";
import ThemeDrawer from "../components/commonCompos/themesDrawer";

export default function DashboardPage() {
  const [dashboardType, setDashboardType] = useState("User");
  const [isSideBar, setIsSideBar] = useState(false);
  const dispatch = useDispatch<any>();
  const dashboard = useSelector((state: any) => state.authData.dashboardType);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isDrawer, setIsDrawer] = useState(true);
  const [selectedTemp, setSelectedTep] = useState(0);
  const template = useSelector(
    (state: any) => state.usersData.selectedTemplate
  );
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenDrawer = () => {

    setIsDrawer(!isDrawer);
    closeMenu();
  };

  const closeDrawer = () => {
    setIsDrawer(false);
  };
  const handleCloseSideBar = () => {
    setIsSideBar(false);
  };
  const handleSelectedTemplate = (value: number) => {

    setSelectedTep(value);
    dispatch(selectTemplate(value));
  };

  const handleDashboardType = (type: string) => {
    setDashboardType(type);
    dispatch(handleDashboard(type));
    handleCloseSideBar();
  };

  const handleSideBar = () => {
    setIsSideBar(!isSideBar);
  };

  useEffect(() => {
    handleDashboardType(dashboard);
    handleSelectedTemplate(template);
  }, []);

  return (
    <Box className="!h-[100vh] !bg-white">
      <SideBarCompo
        open={isSideBar}
        onCancel={handleCloseSideBar}
        handleDashboardType={handleDashboardType}
        dashboardType={dashboardType}
      />
      <HeaderCompo
        handleSideBar={handleSideBar}
        openMenu={openMenu}
        open={open}
        anchorEl={anchorEl}
        closeMenu={closeMenu}
        handleOpenDrawer={handleOpenDrawer}
      />
      {dashboardType === "Admin" ? (
        <AdminDashboard />
      ) : (
        <UserDashboard selectedTemplate={selectedTemp} />
      )}
      <ThemeDrawer
        isDrawer={isDrawer}
        closeDrawer={closeDrawer}
        handleSelectedTemplate={handleSelectedTemplate}
        selectedTemplate={selectedTemp}
      />
    </Box>
  );
}
