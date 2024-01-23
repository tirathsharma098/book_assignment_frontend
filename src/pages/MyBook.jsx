
import React, { useCallback, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import useHttp from "../hooks/useHttp";
import headerCommon from "../config/common-headers";
import { ApiConfig } from "../config/api-config-class";
import {
    apiBookAdd,
    apiBookApprove,
    apiBookBuy,
    apiBookDelete,
    apiBookList,
    apiGetBookSold,
    apiGetMyBooks,
} from "../services/book";
import { BUTTON_ACTIONS } from "../utils/constants";

const MyBookTable = React.memo(({myBookData}) => {
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button
                    rounded
                    severity={rowData.approved? "success": "primary"}
                    style={{
                        marginLeft: "2px",
                        padding: "10px",
                        height: "25px",
                    }}
                    size="small"
                    disabled={true}
                > {rowData.approved? "Approved": "Pending"} </Button>
            </>
        );
    };
    return (
        // <div style={{ textAlign: 'center' }}>
        <DataTable
            value={myBookData ? myBookData : []}
            tableStyle={{
                marginLeft: "4px",
                marginTop: "4px",
                borderTop: "1px solid 	#cccccc",
                // textAlign: 'center',
            }}
            size="small"
            removableSort
            paginator
            rows={50}
            emptyMessage="Users not found"
        >
            <Column
                header="#"
                body={(data, options) => options.rowIndex + 1}
                style={{ width: "5%" }}
                align="center"
            />
            <Column field="book.title" header="Title" align="center" />
            <Column field="book.author" header="Author" align="center" />
            <Column field="book.price" header="Price" align="center" />
            <Column header="Action" body={actionBodyTemplate} align="center" />
        </DataTable>
        // </div>
    );
});

export default function MyBook() {
    // setting state for form
    const {
        response: myBookData,
        isLoading: isMyBookFetching,
        apiFunc: getMyBookFunc,
    } = useHttp();
    // getting books data
    useEffect(() => {
        getMyBookFunc(apiGetMyBooks, new ApiConfig({}, {}, headerCommon()));
    }, [getMyBookFunc]);
    
    return (
        <>
            <div className="flex flex-wrap grid -mx-1 -mt-1">
                <div className="flex col-12 justify-content-center">
                    <div className="flex ">
                        <h4 className="page-main-title">Book Bought</h4>
                    </div>
                    </div>
            </div>
            {myBookData && (
                <MyBookTable
                myBookData={myBookData}
                />
            )}
        </>
    );
}
