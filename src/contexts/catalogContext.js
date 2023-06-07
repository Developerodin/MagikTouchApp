/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useState, useEffect } from "react";
import httpService from "../services/httpService";

const CatalogContext = createContext();

const CatalogProvider = (props) => {
  const [productsList, setProductsList] = useState([]); 
  const [orderStatuses, setOrderStatuses] = useState();
  const [topBanners, setTopBanners] = useState([]);
  const [midBanners, setMidBanners] = useState([]);
  const [bottomBanners, setBottomBanners] = useState([]);
  const [gridBanners, setGridBanners] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [appRatingLink, setAppRatingLink] = useState([]);
  const [toastStatus,setToastStatus] = useState({
    'type':'error',
    'heading':'Invalid Data',
    'msg':'Invalid Form Data',
    'status':'hide'
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: fetchedProducts } = await httpService.get(
          httpService.apiEndpoint + "products",
          {
            headers: httpService.headers,
          }
        );
        if (
          fetchedProducts &&
          "success" in fetchedProducts &&
          fetchedProducts.success === 1
        ) {
          setProductsList(fetchedProducts.data);
        }

        const { data: fetchedOrderStatuses } = await httpService.get(
          httpService.apiEndpointLong + "feed/rest_api/order_statuses",
          {
            headers: httpService.headers,
          }
        );
        if (
          fetchedProducts &&
          "success" in fetchedProducts &&
          fetchedProducts.success === 1 &&
          "error" in fetchedProducts
        ) {
          let os = {};
          fetchedOrderStatuses.data.map((orderStatus) => {
            orderStatus.name = orderStatus.name
              .replace(/[^A-Z0-9]/gi, "")
              .toLowerCase();
            os[orderStatus.name] = Number(orderStatus.order_status_id);
            return orderStatus;
          });
          setOrderStatuses(os);
        }

        const {data:fetchedTopBanners} = await httpService.get(httpService.apiEndpoint + "banners&id=13", {
            headers: httpService.headers,
        });
        if (
          fetchedTopBanners &&
          "success" in fetchedTopBanners &&
          fetchedTopBanners.success === 1
        ) {
          setTopBanners(fetchedTopBanners.data);
        }

        const {data:fetchedMidBanners} = await httpService.get(httpService.apiEndpoint + "banners&id=10", {
          headers: httpService.headers,
        });
        if (
          fetchedMidBanners &&
          "success" in fetchedMidBanners &&
          fetchedMidBanners.success === 1
        ) {
          setMidBanners(fetchedMidBanners.data);
        }

        const {data:fetchedBottomBanners} = await httpService.get(httpService.apiEndpoint + "banners&id=12", {
          headers: httpService.headers,
        });
        if (
          fetchedBottomBanners &&
          "success" in fetchedBottomBanners &&
          fetchedBottomBanners.success === 1
        ) {
          setBottomBanners(fetchedBottomBanners.data);
        }

        const {data:fetchedGridBanners} = await httpService.get(httpService.apiEndpoint + "banners&id=11", {
          headers: httpService.headers,
        });
        if (
          fetchedGridBanners &&
          "success" in fetchedGridBanners &&
          fetchedGridBanners.success === 1
        ) {
          setGridBanners(fetchedGridBanners.data);
        }

        const {data:fetchedTrendingProducts} = await httpService.get(
          httpService.apiEndpoint + "products&category=99",
          { headers: httpService.headers }
        );
        if (
          fetchedTrendingProducts &&
          "success" in fetchedTrendingProducts &&
          fetchedTrendingProducts.success === 1
        ) {
          setTrendingProducts(fetchedTrendingProducts.data);
        }

        const {data:fetchedAppRatingLink} = await httpService.get( httpService.apiEndpointShort + "information/7", {
          headers: httpService.headers,
        });
        if (
          fetchedAppRatingLink &&
          "success" in fetchedAppRatingLink &&
          fetchedAppRatingLink.success === 1
        ) {
          setAppRatingLink(fetchedAppRatingLink.data);
        }

        
      } catch (error) {
        console.log("catalog context error", error);
      }
    };
    getData();
  }, []);

  const getProductFromProductsList = (product_id) => {
    let result = null;
    productsList.forEach((product, index) => {
      if (Number(product.product_id) === Number(product_id)) {
        result = product;
      }
    });
    return result;
  };
  const showToast = (type,heading,msg) =>{
    const info = {type,heading,msg,status:'show'};
    setToastStatus(info);
    setTimeout(function(){
      setToastStatus({...info,status:'hide'})
    },2500)
  }

  return (
    <CatalogContext.Provider
      value={{ productsList, getProductFromProductsList, orderStatuses, topBanners, midBanners, bottomBanners, trendingProducts, gridBanners, appRatingLink, showToast,toastStatus }}
    >
      
      {props.children}
    </CatalogContext.Provider>
  );
};

export default CatalogContext;
export { CatalogProvider };
