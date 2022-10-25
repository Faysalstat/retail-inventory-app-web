// const BASE_URL = 'https://btbbricks.xyz/api';
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
    FETCH_CLIENT_BY_CONTACT_NO : BASE_URL + "/client/getclientbycontact"
}

export const InventoryUrls = {
  ISSUE_SALES_ORDER : BASE_URL + "/sales/issueorder",
  ISSUE_SUPPLY_ORDER : BASE_URL + "/supply/issuesupplyorder",
  FETCH_SUPPLY_ORDER_LIST : BASE_URL + "/supply/getallinvoice",
}