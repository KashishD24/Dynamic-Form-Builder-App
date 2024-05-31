import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  makeStyles,
  Button,
  Pagination,
  Menu,
  Box,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { tableData } from "../../utils/commonInterfaces";
import commonColors from "../../assets/commonColors";
import TableRowsIcon from "@mui/icons-material/TableRows";
import StorageIcon from "@mui/icons-material/Storage";

export default function FieldDataTable({
  rows,
  handleDelete,
  handleEdit,
  page,
  handlePageChange,
  totalPages,
  onClickOptions,
  changeStatus,
  closeOptionsChange,
  anchorEl,
  toggleStatus,
  selectedRow,
}: tableData) {
  return (
    <>
      <Typography className="mr-auto text-[28px] font-bold">
        Field data <StorageIcon />
      </Typography>
      <Box className=" bg-gray_400 w-full p-[20px] rounded-[4px]">
        <TableContainer component={Paper} className=" shadow-custom-shadow-2">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">TYPE</TableCell>
                <TableCell align="right">KEY</TableCell>
                <TableCell align="right">LABEL</TableCell>
                <TableCell align="right">OPTIONS</TableCell>
                <TableCell align="right">VALIDATION</TableCell>
                <TableCell align="right">STATUS</TableCell>
                <TableCell align="right">REGULAREXP.</TableCell>
                <TableCell align="right">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            {rows.length > 0 && (
              <TableBody>
                {rows?.map((row, index) => (
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">{row.id}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        className=" overflow-hidden whitespace-nowrap text-ellipsis"
                      >
                        {row.type}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        className=" overflow-hidden whitespace-nowrap text-ellipsis"
                      >
                        {row.key}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        className=" overflow-hidden whitespace-nowrap text-ellipsis"
                      >
                        {row.label}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        id="basic-button"
                        aria-controls={changeStatus ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={changeStatus ? "true" : undefined}
                        className=" overflow-hidden whitespace-nowrap text-ellipsis"
                      >
                        {row.fieldOptions.length > 0 ? (
                          <Typography
                            onMouseEnter={(e: any) => {
                              onClickOptions(e, row.id);
                            }}
                            className=" cursor-pointer text-center border-2 border-solid rounded-md"
                          >
                            options
                          </Typography>
                        ) : (
                          "No options"
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        className=" overflow-hidden whitespace-nowrap text-ellipsis"
                      >
                        {row.validation ? "required" : "not required"}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Switch
                        checked={row.active}
                        onChange={() => toggleStatus(row.id)}
                        name="status"
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: commonColors.gray_800,
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: commonColors.gray_800,
                            },
                          "& .MuiSwitch-switchBase": {
                            color: commonColors.gray_300,
                          },
                          "& .MuiSwitch-track": {
                            backgroundColor: commonColors.gray_300,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        className=" overflow-hidden whitespace-nowrap text-ellipsis"
                      >
                        {row.regularExp}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        <Button
                          disabled={!row.active}
                          onClick={() => handleDelete(row.id)}
                          disableRipple
                          className="!bg-transparent !text-fadedRed !p-0 !max-w-[25px] !min-w-[25px]"
                          endIcon={<DeleteIcon />}
                        />
                        <Button
                          disabled={!row.active}
                          onClick={() => handleEdit(row.id)}
                          disableRipple
                          className=" !bg-transparent !text-gray_700 !p-0 !max-w-[25px] !min-w-[25px] ml-[10px]"
                          endIcon={<BorderColorIcon />}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          {rows.length < 1 && (
            <div className="!w-full !h-[15vh] flex items-center justify-center">
              <Typography className=" text-fadedGray">
                NO fields availabel
              </Typography>
            </div>
          )}
        </TableContainer>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={changeStatus}
        onClose={closeOptionsChange}
        MenuListProps={{
          onMouseLeave: closeOptionsChange,
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            padding: "10px",
            maxHeight: "300px",
            msOverflowY: "scroll",
            backgroundColor: commonColors.gray_400,
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none" /* IE and Edge */,
            "scrollbar-width": "none" /* Firefox */,
          },
        }}
      >
        <Typography className=" sticky top-0 inset-0 bg-gray_800 text-gray_200 font-bold z-30 rounded-[4px] p-[4px] text-center">
          Field options
        </Typography>
        <div className="mt-2">
          {rows?.map((row: any) => {
            if (row.id === selectedRow) {
              return row.fieldOptions.map((item: any) => (
                <MenuItem
                  disableRipple
                  className="p-1 text-gray_700 !bg-white border-b-2 border-solid "
                >
                  {item?.label}
                </MenuItem>
              ));
            } else {
              return null;
            }
          })}
        </div>
      </Menu>
      <Pagination
        className="!ml-auto"
        page={page}
        onChange={(e, value) => handlePageChange(value)}
        count={totalPages}
      />
    </>
  );
}
