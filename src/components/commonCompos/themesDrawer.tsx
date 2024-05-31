import { Box, Button, Drawer, Typography } from "@mui/material";
import React from "react";
import commonColors from "../../assets/commonColors";
import formBgimage from "../../assets/images/formBg.jpg";
import { themesData } from "../../utils/commonInterfaces";

export default function ThemeDrawer({
  closeDrawer,
  isDrawer,
  handleSelectedTemplate,
  selectedTemplate,
}: themesData) {
  return (
    <Drawer
      PaperProps={{
        sx: { backgroundColor: commonColors.gray_700 },
      }}
      anchor="right"
      open={isDrawer}
      onClose={closeDrawer}
    >
      <Box className="flex flex-col min-w-[300px] p-[10px] pt-[15px] pb-[15px] !h-full gap-3">
        <div
          onClick={() => handleSelectedTemplate(0)}
          style={{
            backgroundColor:
              selectedTemplate === 0 ? commonColors.gray_200 : undefined,
          }}
          className=" flex flex-col p-[5px] items-center justify-center cursor-pointer hover:border-2 hover:border-gray_300 hover:border-dashed rounded-[5px]"
        >
          <Typography
            className=" font-bold"
            style={{
              color:
                selectedTemplate === 0
                  ? commonColors.gray_700
                  : commonColors.gray_200,
            }}
          >
            Template 1
          </Typography>
          <Box className="!bg-gray_300 w-full flex flex-col items-center justify-center rounded-[4px]">
            <div
              className="top-0 bg-cover bg-center w-full !h-[30px] rounded-t-[4px]"
              style={{
                backgroundImage: `url(${formBgimage})`,
              }}
            />
            <div className=" w-full p-[10px_20px] gap-3 h-[80px] overflow-y-scroll hide-scrollbar">
              <div className=" border1 border-solid">
                <Typography>-------------------------</Typography>
                <Typography>-------------------------</Typography>
                <Typography>-------------------------</Typography>
                <Typography>-------------------------</Typography>
                <Typography>-------------------------</Typography>
              </div>
            </div>
            <div className="w-full h-[60px] flex items-center justify-center p-[10px_20px] bg-gray_600 rounded-b-[4px]">
              <Button
                disableRipple
                className=" !bg-gray_800 normal-case !text-white w-full rounded-[4px]"
              >
                Submit
              </Button>
            </div>
          </Box>
        </div>
        <div
          style={{
            backgroundColor:
              selectedTemplate === 1 ? commonColors.gray_200 : undefined,
          }}
          onClick={() => handleSelectedTemplate(1)}
          className="flex flex-col p-[5px] items-center justify-center cursor-pointer hover:border-2 hover:border-gray_300 hover:border-dashed rounded-[5px]"
        >
          <Typography
            className=" font-bold"
            style={{
              color:
                selectedTemplate === 1
                  ? commonColors.gray_700
                  : commonColors.gray_200,
            }}
          >
            Template 2
          </Typography>
          <Box className="!bg-gray_300 h-[25vh] w-full flex items-center justify-center rounded-[4px]">
            <div
              className="top-0 bg-cover bg-center w-full h-[25vh] rounded-t-[4px]"
              style={{
                backgroundImage: `url(${formBgimage})`,
              }}
            />
            <div className=" w-full p-[10px_20px] gap-3 h-[25vh] overflow-y-scroll hide-scrollbar">
              <div className=" border1 border-solid">
                <Typography>-------------------------</Typography>
                <Typography>-------------------------</Typography>
              </div>
              <Button
                disableRipple
                className=" mt-auto !bg-gray_800 normal-case !text-white w-full rounded-[4px]"
              >
                Submit
              </Button>
            </div>
          </Box>
        </div>
        <div
          style={{
            backgroundColor:
              selectedTemplate === 2 ? commonColors.gray_200 : undefined,
          }}
          onClick={() => handleSelectedTemplate(2)}
          className="flex flex-col p-[5px] items-center justify-center cursor-pointer hover:border-2 hover:border-gray_300 hover:border-dashed rounded-[5px]"
        >
          <Typography
            className=" font-bold"
            style={{
              color:
                selectedTemplate === 2
                  ? commonColors.gray_700
                  : commonColors.gray_200,
            }}
          >
            Template 3
          </Typography>
          <Box className="!bg-gray_300 w-full flex flex-col items-center justify-center rounded-[4px]">
            <div className=" w-full p-[10px_20px] gap-3 overflow-y-scroll hide-scrollbar">
              <div className=" border1 border-solid">
                <Typography>-------------------------</Typography>
                <Typography>-------------------------</Typography>
                <Typography>-------------------------</Typography>
                <Typography>-------------------------</Typography>
                <Typography>-------------------------</Typography>
              </div>
            </div>
            <div className="w-full h-[60px] flex items-center justify-center p-[10px_20px] bg-gray_600 rounded-b-[4px]">
              <Button
                disableRipple
                className=" !bg-gray_800 normal-case !text-white w-full rounded-[4px]"
              >
                Submit
              </Button>
            </div>
          </Box>
        </div>
      </Box>
    </Drawer>
  );
}
