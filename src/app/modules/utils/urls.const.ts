// const BASE_URL = 'https://demo.vatasolution.me/api';
const BASE_URL = "http://localhost:3000/api";

export const ProductUrls = {
  ADD_PRODUCT: BASE_URL + '/product/addproduct',
  DELETE_PRODUCT: BASE_URL + '/product/delete-product',
  FETCH_ALL_PRODUCT: BASE_URL + '/product/getallproduct',
  FETCH_ALL_PACKAGING_CATEGORY: BASE_URL + '/product/getallpackagingcategory',
  FETCH_ALL_PRODUCT_FOR_DROPDOWN: BASE_URL + '/product/getallproductfordropdown',
  FETCH_PRODUCT_BY_ID: BASE_URL + '/product/getproductbyid',
  FETCH_PRODUCT_BY_NAME: BASE_URL + '/product/getproductbyname'
};

export const ClientUrls = {
    ADD_CLIENT : BASE_URL + "/client/addclient",
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
  TRANSACTION_REPORT : BASE_URL + "/transaction/gettransactionreport"
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
}
export const TransactionUrls = {
  DO_PAYMENT_TRANSACTION : BASE_URL + "/transaction/dotransaction"
}