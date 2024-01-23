
import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useHttp from "../hooks/useHttp";
import headerCommon from "../config/common-headers";
import { ApiConfig } from "../config/api-config-class";
import {
    apiBookApprove,
    apiGetBookSold,
} from "../services/book";

const BookSoldListTable = React.memo(({bookSoldData, onApproved}) => {
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button
                    icon="pi pi-check"
                    rounded
                    severity={rowData.approved? "success": "primary"}
                    style={{
                        marginLeft: "2px",
                        padding: "0px",
                        width: "25px",
                        height: "25px",
                    }}
                    size="small"
                    disabled={rowData.approved}
                    onClick={() => onApproved(rowData._id)}
                />
            </>
        );
    };
    return (
        // <div style={{ textAlign: 'center' }}>
        <DataTable
            value={bookSoldData ? bookSoldData : []}
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
            emptyMessage="Book not found"
        >
            <Column
                header="#"
                body={(data, options) => options.rowIndex + 1}
                style={{ width: "5%" }}
                align="center"
            />
            <Column field="user.full_name" header="Name" align="center" />
            <Column field="user.username" header="Username" align="center" />
            <Column field="user.email" header="Email" align="center" />
            <Column field="book.title" header="Title" align="center" />
            <Column field="book.author" header="Author" align="center" />
            <Column field="book.price" header="Price" align="center" />
            <Column header="Action" body={actionBodyTemplate} align="center" />
        </DataTable>
        // </div>
    );
});

export default function BookSold() {
    // setting state for form
    const {
        response: bookSoldData,
        isLoading: isBookSoldFetching,
        apiFunc: getBookSoldFunc,
    } = useHttp();
    const {
        response: bookApproveData,
        isLoading: isBookApproving,
        apiFunc: approveBookFunc,
    } = useHttp();
    // getting books data
    useEffect(() => {
        getBookSoldFunc(apiGetBookSold, new ApiConfig({}, {}, headerCommon()));
    }, [getBookSoldFunc, bookApproveData]);
    
    const onApproved = (id) => {
        approveBookFunc(
            apiBookApprove,
            new ApiConfig({}, {}, headerCommon(), { id }),
            "PUT"
        );
    };
    return (
        <>
            <div className="flex flex-wrap grid -mx-1 -mt-1">
                <div className="flex col-12 justify-content-center">
                    <div className="flex align-self-center">
                        <h4 className="page-main-title">Book Sold</h4>
                    </div>
                    </div>
            </div>
            {bookSoldData && (
                <BookSoldListTable
                bookSoldData={bookSoldData}
                    onApproved={onApproved}
                />
            )}
        </>
    );
}
