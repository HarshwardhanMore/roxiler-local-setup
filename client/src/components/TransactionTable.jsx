import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Search,
  Database,
  X,
  CircleCheckBig,
} from "lucide-react";
import axios from "axios";
import Loading from "./Loading";

const TransactionTable = ({
  month,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  forcedChange,
  setForcedChange,
}) => {
  const [transactionsData, setTransactionsData] = useState([]);
  // const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [showDesc, setShowDesc] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dialogVisibility, setDialogVisibility] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/transactions?month=${
            month ? month : "01"
          }&perPage=${rowsPerPage}&page=${page}&search=${searchValue}`
        );
        setTransactionsData(response?.data?.transactions);
        console.log("data djasbdjksakudaskdgsagd: ", response.data);
        // setLoading(false);
        // if (response.statusCode === 200) {
        // }
      } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, [month, rowsPerPage, page, searchValue]);

  const handlePerPageChange = (event) => {
    setPage(1);
    setForcedChange(true);
    setRowsPerPage(event.target.value);
    console.log(event.target.value);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    console.log(event.target.value);
  };

  const filterName = (name) => {
    const lst = name.split(" ");
    if (lst.length > 5) {
      return `${lst.slice(0, 5).join(" ")}...`;
    } else {
      return lst.join(" ");
    }
  };

  const showDialog = (data) => {
    setSelectedData(data);
    setDialogVisibility(true);
  };

  return (
    <div className="flex flex-col items-start">
      <div className=" text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-x-2 sm:gap-x-0">
        <div className="w-full sm:w-max">Transaction Table</div>
        <div className="w-full sm:w-max flex items-center gap-x-2">
          <div className="w-full sm:w-max mt-2 sm:mt-0 flex gap-x-1 sm:gap-x-2 items-center  font-normal text-sm rounded-lg overflow-hidden bg-secondary-bg-col px-2 shadow border">
            <Search size={18} className="text-primary-col" />
            <input
              type="text"
              className="text-secondary-col text-xs sm:text-sm py-2.5 w-full sm:w-max"
              placeholder="Search Transaction"
              value={searchValue}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-12 gap-x-4 py-4 bg-secondary-bg-col mb-2 rounded-lg text-sm font-semibold shadow border px-2 sm:px-0">
          <div className="col-span-1 justify-center hidden sm:flex"></div>
          <div className="col-span-2 text-primary-col font-semibold text-xs sm:text-sm">
            Title
          </div>
          <div className="col-span-4 hidden lg:block">Description</div>
          <div className="col-span-1 text-center text-xs sm:text-sm">Price</div>
          <div className="col-span-1 hidden sm:flex text-xs sm:text-sm">
            Category
          </div>
          <div className="col-span-1 text-center text-xs sm:text-sm">Sold</div>
          <div className="col-span-2 flex justify-center text-xs sm:text-sm">
            Image
          </div>
        </div>
        <div className="w-full flex flex-col items-start rounded-lg text-sm overflow-hidden border">
          {transactionsData.length > 0 ? (
            transactionsData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="cursor-pointer w-full grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-12 gap-x-4 py-2 mt-0.5 bg-secondary-bg-col text-secondary-col shadow px-2 sm:px-0 hover:bg-primary-bg-col"
                  onClick={() => showDialog(item)}
                >
                  <div className="col-span-1 w-full hidden sm:flex items-center justify-center text-xs sm:text-sm">
                    {index + 1}
                  </div>
                  <div className="col-span-2 w-full h-full flex items-center capitalize text-primary-col font-normal text-xs sm:text-sm lg:font-semibold">
                    <span className="flex sm:hidden">
                      {filterName(item?.title)}
                    </span>
                    <span className="hidden sm:flex">{item?.title}</span>
                  </div>
                  <div className="col-span-4 w-full items-center text-justify text-xs sm:text-sm hidden lg:flex">
                    {item?.description.length > 100
                      ? `${item?.description.slice(0, 100)}...`
                      : // <span>
                        //   {
                        //     <>
                        //       {!showDesc && (
                        //         <span>{item.description.slice(0, 100)}...</span>
                        //       )}
                        //       {showDesc && <span>{item.description}</span>}
                        //       <span
                        //         className="text-primary-col cursor-pointer"
                        //         onClick={() => setShowDesc(!showDesc)}
                        //       >
                        //         {!showDesc && <span>more</span>}
                        //         {showDesc && <span>less</span>}
                        //       </span>
                        //     </>
                        //   }
                        // </span>
                        item.description}
                  </div>
                  <div className="col-span-1 w-full flex items-center justify-center text-xs sm:text-sm">
                    <span className="font-semibold text-green-500 mr-1">₹</span>
                    {item?.price}
                  </div>
                  <div className="col-span-1 w-full hidden sm:flex items-center capitalize text-xs sm:text-sm">
                    {item?.category}
                  </div>
                  <div className="col-span-1 w-full flex text-xs items-center justify-center capitalize">
                    {item?.sold ? (
                      // <>
                      //   <span className="hidden sm:flex rounded-full px-1 sm:px-2 py-0.5 bg-green-100 text-green-500">
                      //     Sold
                      //   </span>
                      //   <CircleCheckBig className="flex sm:hidden text-green-500" />
                      // </>
                      <>
                        <CircleCheckBig
                          className="flex sm:hidden text-green-500"
                          size={16}
                        />
                        <CircleCheckBig className="hidden sm:flex text-green-500" />
                      </>
                    ) : (
                      // <>
                      //   <span className="hidden sm:flex rounded-full px-2 py-0.5 bg-red-100 text-red-500">
                      //     Unsold
                      //   </span>
                      //   <X className="flex sm:hidden text-red-500" />
                      // </>
                      <>
                        <X className="flex sm:hidden text-red-500" size={16} />
                        <X className="hidden sm:flex text-red-500" />
                      </>
                    )}
                  </div>
                  <div className="col-span-2 flex items-center justify-center w-full">
                    <img
                      src={item?.image}
                      alt=""
                      className="h-8 sm:h-16 lg:h-20 w-auto object-contain"
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full h-32 flex justify-center items-center text-base sm:text-xl text-primary-col bg-secondary-bg-col">
              <Database className="mr-2" />{" "}
              <span className="text-gray-500">No Data Found</span>
            </div>
          )}
        </div>
        <div className="w-full flex justify-between items-center py-4 text-sm">
          <div className="text-secondary-col text-xs sm:text-sm flex">
            <span className="hidden sm:flex">Page No:</span>{" "}
            <span className="text-primary-col font-semibold sm:ml-1">
              {page}
            </span>
          </div>
          <div className="flex gap-x-1 sm:gap-x-2 lg:gap-x-4 text-xs sm:text-sm">
            <span
              className="flex items-center cursor-pointer hover:text-primary-col"
              onClick={() => setPage(page - 1 > 0 ? page - 1 : page)}
            >
              <ChevronLeft size={16} className="mt-0.5" />
              <span className="hidden sm:flex">Previous</span>
            </span>
            <span
              className="flex items-center cursor-pointer hover:text-primary-col"
              onClick={() =>
                rowsPerPage * page < 60 ? setPage(page + 1) : null
              }
            >
              <span className="hidden sm:flex">Next</span>
              <ChevronRight size={16} className="mt-0.5" />
            </span>
          </div>
          <select
            name="perPage"
            id="perPage"
            className="text-secondary-col px-1 sm:px-2 lg:px-4 text-xs lg:text-sm py-1.5 sm:py-2.5 rounded-lg bg-secondary-bg-col cursor-pointer"
            value={rowsPerPage}
            onChange={handlePerPageChange}
          >
            <option
              disabled
              value=""
              className="text-secondary-col px-4 py-2.5 rounded-lg bg-secondary-bg-col"
            >
              Per Page
            </option>
            <option
              value="5"
              className="text-secondary-col px-4 py-2.5 rounded-lg bg-secondary-bg-col"
            >
              5
            </option>
            <option
              value="10"
              className="text-secondary-col px-4 py-2.5 rounded-lg bg-secondary-bg-col"
            >
              10
            </option>
            <option
              value="15"
              className="text-secondary-col px-4 py-2.5 rounded-lg bg-secondary-bg-col"
            >
              15
            </option>
            <option
              value="25"
              className="text-secondary-col px-4 py-2.5 rounded-lg bg-secondary-bg-col"
            >
              25
            </option>
            <option
              value="50"
              className="text-secondary-col px-4 py-2.5 rounded-lg bg-secondary-bg-col"
            >
              50
            </option>
          </select>
        </div>
      </div>
      {dialogVisibility && (
        <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center mx-auto bg-[#00000080] z-50">
          <div className="w-5/6 sm:w-4/6 lg:w-3/6 h-5/6 flex flex-col items-end bg-secondary-bg-col p-6 shadow-xl rounded-lg overflow-x-hidden overflow-y-scroll dialog">
            <div>
              <button onClick={() => setDialogVisibility(false)}>
                <X />
              </button>
            </div>
            <div className="w-full">
              <div className="w-full flex justify-center relative py-6">
                <img src={selectedData?.image} alt="" className="h-48 sm:h-64 lg:h-72 object-contain" />

                <div className="absolute top-4 right-0 sm:right-4">
                  {selectedData?.sold == true ? (
                    <div className="px-2 py-0.5 text-xs sm:text-sm rounded-full bg-green-100 text-green-500">
                      Sold
                    </div>
                  ) : (
                    <div className="px-2 py-0.5 text-xs sm:text-sm rounded-full bg-red-100 text-red-500">
                      Unsold
                    </div>
                  )}
                </div>
              </div>
              {/* <div>
                {selectedData?.sold == true ? (
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                ) : (
                  <div className="h-4 w-4 rounded-full bg-red-500"></div>
                )}
              </div> */}
              <div className="sm:font-semibold text-primary-col">
                {selectedData?.title}
              </div>
              <div className="inline-block px-2 py-0.5 font-semibold rounded-lg bg-gray-100 text-gray-500 capitalize text-sm my-1 sm:my-2">
                {selectedData?.category}
              </div>
              <div className="font-semibold text-sm sm:text-base my-1 sm:my-2">
                <span className="mr-1 text-green-500">₹</span>
                <span>{selectedData?.price}</span>
              </div>
              <div className="text-xs sm:text-sm text-justify">
                {selectedData?.description}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {loading && <Loading />} */}
    </div>
  );
};

export default TransactionTable;
