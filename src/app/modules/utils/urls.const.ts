// const BASE_URL = 'https://demo.vatasolution.me/api';
const BASE_URL = 'https://shopongroup.com/api';
// const BASE_URL = "http://localhost:3000/api";

export const ProductUrls = {
  ADD_PRODUCT: BASE_URL + '/product/addproduct',
  DELETE_PRODUCT: BASE_URL + '/product/delete-product',
  FETCH_ALL_PRODUCT: BASE_URL + '/product/getallproduct',
  FETCH_ALL_PACKAGING_CATEGORY: BASE_URL + '/product/getallpackagingcategory',
  FETCH_ALL_PRODUCT_CATEGORY: BASE_URL + '/product/getallproductcategory',
  FETCH_ALL_UNIT_TYPE: BASE_URL + '/product/getallunittype',
  
  FETCH_ALL_PRODUCT_FOR_DROPDOWN: BASE_URL + '/product/getallproductfordropdown',
  FETCH_PRODUCT_BY_ID: BASE_URL + '/product/getproductbyid',
  FETCH_PRODUCT_BY_NAME: BASE_URL + '/product/getproductbyname',
  FETCH_PRODUCT_BY_CODE: BASE_URL + '/product/getproductbycode',
  ADD_PRODUCT_CATEGORY: BASE_URL + '/product/addproductcategory',
  ADD_PACKAGING_CATEGORY: BASE_URL + '/product/addpackagingcategory',
  ADD_UNIT_TYPE: BASE_URL + '/product/addunittype',
  // Delete 
  DELETE_UNIT_TYPE: BASE_URL + '/product/delete-unit-type',
  DELETE_PRODUCT_CATEGORY: BASE_URL + '/product/delete-product-category',
  DELETE_PACKAGING_CATEGORY: BASE_URL + '/product/delete-packaging-category',

};

export const ClientUrls = {
    ADD_CLIENT : BASE_URL + "/client/addclient",
    UPDATE_CLIENT : BASE_URL + "/client/updateclient",
    FETCH_CLIENT_BY_CONTACT_NO : BASE_URL + "/client/getclientbycontact",
    FETCH_CLIENT_BY_CLIENT_TYPE: BASE_URL + "/client/getclientbytype",
    FETCH_SUPPLYER_BY_CODE : BASE_URL + "/client/getsupplyerbycode",
    FETCH_CUSTOMER_BY_ID : BASE_URL + "/client/getcustomerbyid",
    FETCH_PERSON_BY_ID : BASE_URL + "/client/getpersonbyid",
    FETCH_CLIENT_LIST_BY_TYPE : BASE_URL + "/client/getallclient"
    
}

export const InventoryUrls = {
  ISSUE_SALES_ORDER : BASE_URL + "/sales/issueorder",
  ISSUE_SUPPLY_ORDER : BASE_URL + "/supply/issuesupplyorder",
  DO_SUPPLY_ORDER_DELIVERY : BASE_URL + "/supply/dodelievery",
  UPDATE_INVOICE : BASE_URL + "/supply/updateinvoice",
  UPDATE_SALE_INVOICE : BASE_URL + "/sale/updateinvoice",
  FETCH_SUPPLY_ORDER_LIST : BASE_URL + "/supply/getallinvoice",
  FETCH_SALE_ORDER_LIST : BASE_URL + "/sales/getallinvoice",
  FETCH_SUPPLY_ORDER_BY_ID : BASE_URL + "/supply/getinvoicebyid",
  FETCH_SALE_ORDER_BY_ID : BASE_URL + "/sales/getinvoicebyid",
  ISSUE_DO_PAYMENT : BASE_URL + "/sales/dopayment",

}

export const ReportUrls = {
  TRANSACTION_REPORT : BASE_URL + "/transaction/gettransactionreport",
  ACCOUNT_HISTORY_REPORT : BASE_URL + "/report/getaccounthistoryrecord",
  SALE_ORDER_REPORT : BASE_URL + "/report/get-sale-order-report",  
  SUPPLY_ORDER_REPORT : BASE_URL + "/report/get-supply-order-report",  
  
}
export const ConfigUrls = {
  ADD_CONFIG : BASE_URL + "/config/addconfig",
  GET_CONFIG : BASE_URL + "/config/getconfig",
  GET_ROLE_WISE_MENU : BASE_URL + "/config/getmodules"
}

export const ApprovalUrls = {
  SEND_TO_APPROVAL : BASE_URL + "/approval/add",
  GET_TASK_LIST : BASE_URL + "/approval/getall",
  GET_TASK_BY_ID : BASE_URL + "/approval/getbyid",
  APPROVE_TASK: BASE_URL + "/approval/approve",
  DECLINE_APPROVE_TASK: BASE_URL + "/approval/decline",
}
export const TransactionUrls = {
  DO_PAYMENT_TRANSACTION : BASE_URL + "/transaction/dotransaction",
  ADD_TNX_REASON : BASE_URL + "/transaction/addreason",
  DELETE_TNX_REASON : BASE_URL + "/transaction/deletereason",
  FETCH_TRANSACTION_REASONS : BASE_URL + "/transaction/fetchtransactionreason",
}

export const AuthenticationUrls = {
  LOGIN : BASE_URL + "/auth/login",
  SIGN_OUT : BASE_URL + "/auth/signout",
  ADD_USER: BASE_URL + "/auth/adduser",
  CHECK_EXISTING_USER: BASE_URL + "/auth/checkexistinguser",
  CHECK_IS_LOGGEDIN: BASE_URL + "/auth/islogedin"
}