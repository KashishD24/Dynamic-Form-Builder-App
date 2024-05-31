import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { rowData } from "../../utils/commonInterfaces";
import DetailsBox from "./detailsBox";
import commonColors from "../../assets/commonColors";
import AddIcon from "@mui/icons-material/Add";
import { extraDetails } from "../../utils/commonInterfaces";
import SearchIcon from "@mui/icons-material/Search";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import jsonData from "./commonData.json";

export default function HeadInfoCompo({
  adminDetails,
  handleAddField,
  serachQuery,
  handleSearchQuery,
  handleSearchType,
  searchType,
}: extraDetails) {
  const handleActiveFeilds = () => {
    const activeField = adminDetails.allFields?.filter(
      (row: rowData) => row.active !== false
    );
    return activeField.length;
  };
  const handleRequiredFields = () => {
    const activeField = adminDetails.allFields?.filter(
      (row: rowData) => row.validation !== false
    );
    return activeField.length;
  };

  return (
    <Box className="flex flex-col gap-5 w-full mt-[90px]">
      <Box className="flex items-center justify-between p-[15px_20px] !bg-fadedGray rounded-[5px] shadow-custom-shadow-1">
        <Typography className=" !text-[24px] text-white font-bold">
          Dashboard
        </Typography>
        <Box className="flex gap-3 justify-end">
          <Autocomplete
            className="mb-2"
            value={searchType}
            onChange={(e, newValue: any) => handleSearchType(newValue)}
            options={jsonData.searchOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search type"
                sx={{
                  height: "40px",
                  "& .MuiInputBase-root": { height: "40px", minWidth: "200px" },
                  backgroundColor: "white",
                  borderRadius: "4px",
                }}
              />
            )}
          />
          <TextField
            value={serachQuery}
            onChange={handleSearchQuery}
            size="medium"
            sx={{
              height: "40px",
              "& .MuiInputBase-root": {
                height: "40px",
                padding: 0,
                backgroundColor: `${commonColors.white} !important`,
                "& .MuiInputBase-input": {
                  height: "40px",
                  boxSizing: "border-box",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment className="cursor-pointer mr-3" position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search field..."
          />
          <Button
            onClick={handleAddField}
            startIcon={<AddIcon />}
            className=" !bg-gray_700 normal-case !p-[5px] !w-[150px] !text-[18px] !h-[40px] text-white"
          >
            Add field
          </Button>
        </Box>
      </Box>

      <Typography className=" text-[28px] font-bold">
        Analyzed data <AnalyticsIcon />
      </Typography>
      <Box className=" w-full flex items-center justify-center gap-[15px]">
        <DetailsBox
          bgColor={commonColors.gray_500}
          heading={"Total Fields"}
          info={adminDetails.allFields?.length}
          icon={"inputField.png"}
        />
        <DetailsBox
          bgColor={commonColors.darkMarron}
          heading={"Active Fields"}
          info={handleActiveFeilds()}
          icon={"inactiveField.png"}
        />
        <DetailsBox
          bgColor={commonColors.gray_600}
          heading={"Required Fields"}
          info={handleRequiredFields()}
          icon={"required.png"}
        />
      </Box>
    </Box>
  );
}
