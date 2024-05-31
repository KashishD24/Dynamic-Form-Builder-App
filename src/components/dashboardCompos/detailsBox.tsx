import React from "react";
import { Box, Typography } from "@mui/material";
import { details } from "../../utils/commonInterfaces";

export default function DetailsBox({ bgColor, heading, icon, info }: details) {
  return (
    <Box
      className=" flex items-center justify-between w-full rounded-[5px] p-[10px] shadow-custom-shadow-2"
      style={{ backgroundColor: bgColor }}
    >
      <div>
        <Typography className=" !text-[24px] font-bold !text-white">
          {heading}
        </Typography>
        <Typography className=" !text-[18px] font-bold !text-white !text-left">
          {info}
        </Typography>
      </div>
      <div>
        <img
          src={require(`../../assets/icons/${icon}`)}
          alt="img"
          className="w-[50px] h-[50px]"
        />
      </div>
    </Box>
  );
}
