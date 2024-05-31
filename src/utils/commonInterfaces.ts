
export interface adminprofile {
    id: string,
    img: string,
    emailId: string,
    password: string,
    allFields: Array<rowData>
}

export interface adminDetail {
    authData:{
        adminData: adminprofile,
        allAdmins: Array<adminprofile>
    }
}

export interface fieldData {
    value: string,
    name: string,
    onChangeHandler : any,
    type: string
    adornment?: boolean,
    label: string,
    placeHolder: string,
    isError: boolean,
    error: string | undefined,
    handlePassword?: any
    showPassword?: boolean
    addField?: boolean
}

export interface sidebarData {
    open: boolean
    onCancel : any
    handleDashboardType: any
    dashboardType: string
}

export interface rowData{
    label: string
    id: string
    type:string
    key: string
    validation: boolean
    active: boolean
    regularExp: string
    fieldOptions: Array<optionsData>
}

export interface tableData{
    rows: Array<rowData>
    handleDelete: any
    handleEdit: any
    page: number
    handlePageChange: any
    totalPages: number
    onClickOptions: any
    changeStatus: boolean
    closeOptionsChange: any
    anchorEl: any
    toggleStatus: any
  selectedRow: string
}

export interface fieldModalData {
    open:boolean
    onCloseModal: any
    handleChange: any
    filedData:any
    handleSubmit: any
    isError: boolean
    showAlert: boolean
    isExist:boolean
    isEdit: boolean
    showOptions: boolean
    handleAddOptions: any
    handleDeleteOptions: any
    handleChangeOptions: any
}

export interface alertData{
    heading: string
    open: boolean
    closeModal: any
    onConfirm: any
    showAlert: boolean
    alert:string
}
export interface optionsData{
    id: string
    value: string
    label: string
}

export interface details {
    bgColor: string
    heading: string
    info: any
    icon:string
}

export interface extraDetails{
    adminDetails: adminprofile
    handleAddField: any
    handleSearchQuery: any
  serachQuery: string
  handleSearchType:any
  searchType:any
}

export interface autoInpuData {
  props: any;
  selectedData: any;
}
export interface cheboxData {
  field: any;
  fieldData: any;
  handleCheckBox: any;
  handleShowError: any;
}

export interface radioData {
  field: any;
  fieldData: any;
  handleChangeFieldData: any;
  handleShowError: any;
}

export interface dropdownFieldData {
  field: any;
  fieldData: any;
  handleChangeFieldData: any;
  handleShowError: any;
  isMultiple: any;
  handleMultiple: any;
  selectedLabel: any;
}
export interface datepickerFieldData {
  field: any;
  fieldData: any;
  handleChangeFieldData: any;
  handleShowError: any;
}
export interface headerInfo {
  handleSideBar: any;
  openMenu?: any;
  anchorEl?: any;
  closeMenu?: any;
  open: boolean;
  handleOpenDrawer: any;
}

export interface themesData {
  isDrawer: boolean;
  closeDrawer: any;
  handleSelectedTemplate: any;
  selectedTemplate: any;
}

export interface userDashboardData {
  selectedTemplate: any;
}

export interface templateData {
  fieldsData: any;
  showPassword: any;
  handleChangeFieldData: any;
  fieldData: any;
  isError: any;
  handleShowError: any;
  handlePassword: any;
  handleCheckBox: any;
  isMultiple: any;
  handleMultiple: any;
  selectedLabel: any;
  imageRef: any;
  handleChangeImageFieldData: any;
}