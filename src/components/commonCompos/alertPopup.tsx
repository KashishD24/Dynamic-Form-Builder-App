import React from "react";
import { Alert, Box, Button, Dialog, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { alertData } from "../../utils/commonInterfaces";

export default function AlertPopup({
  heading,
  open,
  closeModal,
  onConfirm,
  showAlert,
  alert,
}: alertData) {
  return (
    <Dialog open={open} onClose={closeModal}>
      <div className="p-[10px] !w-full">
        <Button
          onClick={closeModal}
          disableRipple
          className=" !bg-transparent !ml-[90%] !text-fadedRed !max-w-[25px] !min-w-[25px]"
          endIcon={<CloseIcon />}
        />
        <Box className=" w-full p-[25px]">
          <Typography>{heading}</Typography>
          <div className=" w-full flex items-center justify-center gap-[10px] mt-[10px]">
            <Button
              className=" transform-none !text-white !bg-fadedRed"
              onClick={onConfirm}
            >
              Yes
            </Button>
            <Button
              onClick={closeModal}
              className=" transform-none !text-white !bg-secondary"
            >
              No
            </Button>
          </div>
        </Box>
        {showAlert && <Alert severity="success">{alert}</Alert>}
      </div>
    </Dialog>
  );
}
