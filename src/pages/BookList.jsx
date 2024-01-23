import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
    apiBookBuy,
    apiBookDelete,
    apiBookList,
} from "../services/book";
import { BUTTON_ACTIONS, USER_TYPE } from "../utils/constants";

const BookListTable = React.memo(({ books, onDeleting, onBookBought }) => {
    const userTypeGot = localStorage.getItem("user_type");
    const location = useLocation();
    const navigate = useNavigate();
    const navigatePageHandler = (buttonAction, bookId) => {
        const currentPath =
            location.pathname +
            "/" +
            (buttonAction === BUTTON_ACTIONS.delete
                ? BUTTON_ACTIONS.delete
                : buttonAction === BUTTON_ACTIONS.update
                ? BUTTON_ACTIONS.update
                : BUTTON_ACTIONS.view) +
            "/" +
            bookId;
        navigate(currentPath);
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                {userTypeGot === USER_TYPE.CUSTOMER && (
                    <Button
                        icon="pi pi-cart-plus"
                        rounded
                        severity="success"
                        style={{
                            marginLeft: "2px",
                            padding: "0px",
                            width: "25px",
                            height: "25px",
                        }}
                        size="small"
                        onClick={() => onBookBought(rowData._id)}
                    />
                )}
                <Button
                    icon="pi pi-eye"
                    rounded
                    severity="primary"
                    style={{
                        marginLeft: "2px",
                        padding: "0px",
                        width: "25px",
                        height: "25px",
                    }}
                    size="small"
                    onClick={() =>
                        navigatePageHandler(BUTTON_ACTIONS.view, rowData._id)
                    }
                />
                {userTypeGot === USER_TYPE.SUPER_ADMIN ||
                userTypeGot === USER_TYPE.ADMIN ? (
                    <>
                        <Button
                            icon="pi pi-pencil"
                            rounded
                            severity="warning"
                            size="small"
                            style={{
                                marginLeft: "2px",
                                padding: "0px",
                                width: "25px",
                                height: "25px",
                            }}
                            onClick={() =>
                                navigatePageHandler(
                                    BUTTON_ACTIONS.update,
                                    rowData._id
                                )
                            }
                        />
                        {userTypeGot === USER_TYPE.SUPER_ADMIN && (
                            <Button
                                icon="pi pi-trash"
                                rounded
                                severity="danger"
                                size="small"
                                style={{
                                    marginLeft: "2px",
                                    padding: "0px",
                                    width: "25px",
                                    height: "25px",
                                }}
                                onClick={() => onDeleting(rowData._id)}
                            />
                        )}
                    </>
                ) : (
                    ""
                )}
            </>
        );
    };
    return (
        // <div style={{ textAlign: 'center' }}>
        <DataTable
            value={books ? books : []}
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
            <Column field="title" header="Title" align="center" />
            <Column field="author" header="Author" align="center" />
            <Column field="summary" header="Summary" align="center" />
            <Column field="price" header="Price" align="center" />
            <Column header="Action" body={actionBodyTemplate} align="center" />
        </DataTable>
        // </div>
    );
});

export default function BookList() {
    // setting state
    const [showForm, setShowForm] = useState(false);
    // setting state for form
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [summary, setSummary] = useState("");
    const [price, setPrice] = useState("");
    const {
        response: addBookResponse,
        isLoading: isBookAdding,
        apiFunc: addBookFunc,
    } = useHttp();
    const {
        response: bookData,
        isLoading: isBookFetching,
        apiFunc: getBookFunc,
    } = useHttp();
    const {
        response: deleteBookResponse,
        isLoading: isBookDeleting,
        apiFunc: deleteBookFunc,
    } = useHttp();
    const {
        response: boughtBookResponse,
        isLoading: isBookBoughtLoading,
        apiFunc: buyBookFunc,
    } = useHttp();
    // getting books data
    useEffect(() => {
        getBookFunc(apiBookList, new ApiConfig({}, {}, headerCommon()));
    }, [getBookFunc, addBookResponse, deleteBookResponse]);
    const onAdding = () => {
        addBookFunc(
            apiBookAdd,
            new ApiConfig(
                {
                    title,
                    author,
                    summary,
                    price,
                },
                {},
                headerCommon()
            ),
            "POST"
        );
    };
    const onDeleting = (id) => {
        deleteBookFunc(
            apiBookDelete,
            new ApiConfig({}, {}, headerCommon(), { id }),
            "DELETE"
        );
    };
    const onBookBought = (id) => {
        buyBookFunc(
            apiBookBuy,
            new ApiConfig({}, {}, headerCommon(), { id }),
            "POST"
        );
    };
    return (
        <>
            <div className="flex flex-wrap grid -mx-1 -mt-1">
                <div className="flex col-10 justify-content-center">
                    <div className="flex align-self-center">
                        <h4 className="page-main-title">Book List</h4>
                    </div>
                </div>
                <div className="flex col-2 justify-content-end">
                    <Button
                        label="+Add"
                        severity="info"
                        raised
                        size="small"
                        style={{ padding: "6px", fontSize: "18px" }}
                        icon="pi pi-external-link"
                        onClick={() => setShowForm(true)}
                    />
                    <Dialog
                        header="Add Book"
                        visible={showForm}
                        style={{ width: "50vw" }}
                        onHide={() => setShowForm(false)}
                        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                    >
                        <div className="flex flex-column">
                            <div className="grid">
                                <div className="col-6 flex justify-content-end">
                                    <div className="flex align-items-center mr-3">
                                        Title:{" "}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <InputText
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        placeholder="Title"
                                        className="md:w-11rem p-inputtext-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid">
                                <div className="col-6 flex justify-content-end">
                                    <div className="flex align-items-center mr-3">
                                        Author:{" "}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <InputText
                                        value={author}
                                        onChange={(e) =>
                                            setAuthor(e.target.value)
                                        }
                                        placeholder="Author"
                                        className="md:w-11rem p-inputtext-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid">
                                <div className="col-6 flex justify-content-end">
                                    <div className="flex align-items-center mr-3">
                                        Summary:{" "}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <InputText
                                        value={summary}
                                        onChange={(e) =>
                                            setSummary(e.target.value)
                                        }
                                        placeholder="Summary"
                                        className="md:w-11rem p-inputtext-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid">
                                <div className="col-6 flex justify-content-end">
                                    <div className="flex align-items-center mr-3">
                                        Price:{" "}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <InputText
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                        placeholder="$45"
                                        className="md:w-11rem p-inputtext-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-content-center mb-1">
                                <Button
                                    label="ADD Book"
                                    severity="success"
                                    type="button"
                                    // disabled={isSubmitting}
                                    raised
                                    // loading={isSubmitting}
                                    size="small"
                                    onClick={() => onAdding()}
                                />
                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
            {bookData && (
                <BookListTable
                    books={bookData}
                    onDeleting={onDeleting}
                    onBookBought={onBookBought}
                />
            )}
        </>
    );
}
