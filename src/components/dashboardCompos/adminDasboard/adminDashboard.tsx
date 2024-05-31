import { Box, Menu } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  checkIsOptionTypeField,
  handleAuthNavigation,
  randomeIdGenerater,
  validateEmptyFields,
  validateUniqueKey,
} from "../../../utils/commonMethods";
import HeadInfoCompo from "../../../components/dashboardCompos/headInfoCompo";
import FieldDataTable from "../../../components/dashboardCompos/fieldDataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDetail,
  adminprofile,
  fieldData,
  optionsData,
  rowData,
} from "../../../utils/commonInterfaces";
import AlertPopup from "../../../components/commonCompos/alertPopup";
import AddFieldModal from "../../../components/dashboardCompos/addFieldModal";
import { updateAdminFields } from "../../../store/authSlice";
import { putData } from "../../../utils/apis";

export default function AdminDashboard() {
  const [isDelete, setIsDelete] = useState(false);
  const [adminData, setAdminData] = useState<adminprofile>({
    id: "",
    img: "",
    emailId: "",
    password: "",
    allFields: [],
  });
  const [openFields, setOpenFields] = useState(false);
  const [filedData, setFieldData] = useState<rowData>({
    id: randomeIdGenerater(),
    type: "text",
    key: "",
    label: "",
    validation: false,
    active: true,
    regularExp: "",
    fieldOptions: [],
  });
  const totalPages = Math.ceil(adminData?.allFields.length / 4);
  const [showErrors, setShowErrors] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [page, setPage] = useState(1);
  const [isExist, setIsExist] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const open = Boolean(anchorEl);
  const [searchType, setSearchType] = useState<any>("");
  const adminDetails = useSelector(
    (state: adminDetail) => state.authData.adminData
  );

  const handleDeleteField = () => {
    const filteredArray = adminData.allFields.filter(
      (items: any) => items?.id !== selectedId
    );
    const data = {
      id: adminData.id,
      img: adminData.img,
      emailId: adminData.emailId,
      password: adminData.password,
      allFields: filteredArray,
    };
    putData(adminData.id, "admins", data).then((response: any) => {
      dispatch(updateAdminFields(response?.allFields));
      setAdminData({ ...adminData, allFields: response?.allFields });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setIsDelete(false);
      }, 1000);
    });
  };

  const onClickDelete = (id: string) => {
    setIsDelete(true);
    setSelectedId(id);
  };

  const onClickOptions = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleEditField = (id: string) => {
    const selectedField: rowData | undefined = adminDetails.allFields.find(
      (field: any) => field?.id === id
    );
    if (selectedField !== undefined) {
      setFieldData(selectedField);
      setSelectedId(id);
      setIsEdit(true);
      setOpenFields(true);
      if (selectedField.fieldOptions.length > 0) {
        setShowOptions(true);
      } else {
        setShowOptions(false);
      }
    }
  };

  const closeDeleteModal = () => {
    setIsDelete(false);
  };
  const closeOptionsChange = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (value: number) => {
    setPage(value);
  };
  const closeFieldsModal = () => {
    setFieldData({
      id: randomeIdGenerater(),
      type: "text",
      key: "",
      label: "",
      validation: false,
      active: true,
      regularExp: "",
      fieldOptions: [],
    });
    setOpenFields(false);
  };
  const handleAddField = () => {
    setOpenFields(true);
  };

  const handleChange = (e: any, keyName: string) => {
    if (keyName === "type") {
      if (e) {
        if (checkIsOptionTypeField(e?.value)) {
          const optionObject: optionsData = {
            id: randomeIdGenerater(),
            label: "",
            value: "",
          };
          if (filedData.fieldOptions.length < 1) {
            setFieldData({
              ...filedData,
              [keyName]: e.value,
              fieldOptions: [...filedData.fieldOptions, optionObject],
            });
            setShowOptions(true);
          } else {
            setFieldData({ ...filedData, [keyName]: e.value });
          }
        } else {
          setShowOptions(false);
          setFieldData({ ...filedData, [keyName]: e?.value, fieldOptions: [] });
        }
      } else {
        setFieldData({ ...filedData, [keyName]: "", fieldOptions: [] });
        setShowOptions(false);
      }
    } else if (keyName === "validation") {
      setFieldData({ ...filedData, [keyName]: e.target.checked });
    } else {
      setFieldData({ ...filedData, [keyName]: e.target.value });
    }
  };
  const validation = () => {
    if (filedData.validation) {
      if (checkIsOptionTypeField(filedData.type)) {
        return (
          filedData.key.length > 0 &&
          filedData.label.length > 0 &&
          filedData.type.length > 0 &&
          filedData.fieldOptions.length > 0 &&
          validateEmptyFields(filedData.fieldOptions)
        );
      } else {
        return (
          filedData.key.length > 0 &&
          filedData.label.length > 0 &&
          filedData.type.length > 0
        );
      }
    } else {
      if (checkIsOptionTypeField(filedData.type)) {
        return (
          filedData.key.length > 0 &&
          filedData.type.length > 0 &&
          filedData.label.length > 0 &&
          filedData.fieldOptions.length > 0 &&
          validateEmptyFields(filedData.fieldOptions)
        );
      } else {
        return (
          filedData.key.length > 0 &&
          filedData.type.length > 0 &&
          filedData.label.length > 0
        );
      }
    }
  };

  const handleApiSubmit = (data: any) => {
    putData(adminData.id, "admins", data)
      .then((response: any) => {
        dispatch(updateAdminFields(response?.allFields));
        setAdminData(response);
      })
      .then(() => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setOpenFields(false);
          setFieldData({
            id: randomeIdGenerater(),
            type: "text",
            key: "",
            label: "",
            validation: false,
            active: true,
            regularExp: "",
            fieldOptions: [],
          });
        }, 1500);
      });
  };
  const existErrorShow = () => {
    setIsExist(true);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setIsExist(false);
    }, 1500);
  };
  const submitData = () => {
    if (validation()) {
      let data = {
        id: adminData.id,
        img: adminData.img,
        emailId: adminData.emailId,
        password: adminData.password,
        allFields: [] as any,
      };
      if (isEdit) {
        const arrayData = adminData.allFields.map((item) => {
          if (item?.id === selectedId) {
            return filedData;
          } else {
            return item;
          }
        });
        data.allFields = arrayData;
      } else {
        data = {
          ...data,
          allFields: [...adminData.allFields, filedData],
        };
      }
      handleApiSubmit(data);
    }
  };

  const handleSubmit = async () => {
    const newLabels = validateUniqueKey(filedData.fieldOptions, "label");
    const newValues = validateUniqueKey(filedData.fieldOptions, "value");
    const fieldExist = adminData.allFields.some(
      (field: any) =>
        field.key === filedData.key || field.label === filedData.label
    );

    setShowErrors(true);

    if (checkIsOptionTypeField(filedData.type)) {
      if ((fieldExist && !isEdit) || !newLabels || !newValues) {
        existErrorShow();
      } else {
        submitData();
      }
    } else {
      if (fieldExist && !isEdit) {
        existErrorShow();
      } else {
        submitData();
      }
    }
  };
  const toggleStatus = (id: any) => {
    let data = {
      id: adminData.id,
      img: adminData.img,
      emailId: adminData.emailId,
      password: adminData.password,
      allFields: [] as any,
    };
    const arrayData = adminData.allFields.map((item) => {
      if (item?.id === id) {
        const row = {
          ...item,
          active: !item.active,
        };
        return row;
      } else {
        return item;
      }
    });
    data.allFields = arrayData;
    handleApiSubmit(data);
  };

  const handleSearchQuery = (e: any) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);
    if (searchType === "") {
      const filteredData = adminDetails.allFields.filter((item: any) => {
        return ["id", "type", "key", "label", "regularExp"].some((key) =>
          item[key].toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setAdminData({ ...adminData, allFields: filteredData });
    } else {
      const filteredData = adminDetails.allFields.filter((item: any) =>
        item[searchType].toLowerCase().includes(searchValue.toLowerCase())
      );
      setAdminData({ ...adminData, allFields: filteredData });
    }
  };

  const handleSearchType = (e: any) => {
    if (e?.value) {
      setSearchType(e.value);
    } else {
      setSearchType("");
    }
  };
  const handleDeleteOptions = (id: string) => {
    const filteredData = filedData.fieldOptions.filter(
      (option: any) => option.id !== id
    );
    setFieldData({
      ...filedData,
      fieldOptions: filteredData,
    });
  };
  const handleAddOptions = () => {
    const optionObject = {
      id: randomeIdGenerater(),
      label: "",
      value: "",
    };
    setFieldData({
      ...filedData,
      fieldOptions: [...filedData.fieldOptions, optionObject],
    });
  };
  const handleChangeOptions = (e: any, id: any, keyname: string) => {
    const updatedItems = filedData.fieldOptions.map((item) => {
      if (item.id === id) {
        return { ...item, [keyname]: e.target.value };
      }
      return item;
    });
    setFieldData({ ...filedData, fieldOptions: updatedItems });
  };

  useEffect(() => {
    handleAuthNavigation();
    setAdminData(adminDetails);
  }, []);

  return (
    <Box className=" bg-primeBg flex items-center justify-center flex-col gap-[15px] pl-[4vw] pr-[4vw]">
      <HeadInfoCompo
        adminDetails={adminData}
        handleAddField={handleAddField}
        serachQuery={searchQuery}
        handleSearchQuery={handleSearchQuery}
        searchType={searchType}
        handleSearchType={handleSearchType}
      />
      <FieldDataTable
        rows={adminData?.allFields?.slice((page - 1) * 4, page * 4)}
        handleDelete={onClickDelete}
        handleEdit={handleEditField}
        page={page}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        onClickOptions={onClickOptions}
        changeStatus={open}
        closeOptionsChange={closeOptionsChange}
        anchorEl={anchorEl}
        toggleStatus={toggleStatus}
        selectedRow={selectedId}
      />
      <AlertPopup
        heading="Are you sure you want to delete this field ?"
        onConfirm={handleDeleteField}
        open={isDelete}
        closeModal={closeDeleteModal}
        showAlert={showAlert}
        alert="Field deleted succesfully"
      />
      <AddFieldModal
        open={openFields}
        onCloseModal={closeFieldsModal}
        filedData={filedData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isError={showErrors}
        showAlert={showAlert}
        isExist={isExist}
        isEdit={isEdit}
        showOptions={showOptions}
        handleAddOptions={handleAddOptions}
        handleDeleteOptions={handleDeleteOptions}
        handleChangeOptions={handleChangeOptions}
      />
    </Box>
  );
}
