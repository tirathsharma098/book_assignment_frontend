import { useActionData } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ALL_USER_TYPE, BUTTON_ACTIONS } from "../../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import useHttp from "../../hooks/useHttp";
import { apiUserAdd, apiUserList } from "../../services/user";
import headerCommon from "../../config/common-headers";
import { ApiConfig } from "../../config/api-config-class";

const UserListTable = React.memo(
    ({ usersData, onSortingUser, sortField, sortOrder }) => {
        const location = useLocation();
        const navigate = useNavigate();
        const navigatePageHandler = (buttonAction, userId) => {
            const currentPath =
                location.pathname +
                "/" +
                (buttonAction === BUTTON_ACTIONS.delete
                    ? BUTTON_ACTIONS.delete
                    : buttonAction === BUTTON_ACTIONS.update
                    ? BUTTON_ACTIONS.update
                    : BUTTON_ACTIONS.view) +
                "/" +
                userId;
            navigate(currentPath);
        };
        const actionBodyTemplate = (rowData) => {
            return (
                <>
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
                        onClick={() =>
                            navigatePageHandler(
                                BUTTON_ACTIONS.delete,
                                rowData._id
                            )
                        }
                    />
                </>
            );
        };
        return (
            // <div style={{ textAlign: 'center' }}>
            <DataTable
                value={usersData ? usersData : []}
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
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={onSortingUser}
            >
                <Column
                    header="#"
                    body={(data, options) => options.rowIndex + 1}
                    style={{ width: "5%" }}
                    align="center"
                />
                <Column
                    field="full_name"
                    header="Name"
                    align="center"
                    sortable
                />
                <Column
                    field="username"
                    header="Username"
                    align="center"
                    sortable
                />
                <Column field="email" header="Email" align="center" sortable />
                <Column
                    field="user_type"
                    header="User Type"
                    align="center"
                    sortable
                />
                <Column
                    field="status"
                    header="Status"
                    align="center"
                    sortable
                />
                <Column
                    header="Action"
                    body={actionBodyTemplate}
                    align="center"
                />
            </DataTable>
            // </div>
        );
    }
);

const UserList = () => {
    const actionData = useActionData();
    const [searchValue, setSearchValue] = useState("");
    const [searchValueNow, setSearchValueNow] = useState("");
    const [searchTimeOutId, setSearchTimeOutId] = useState();
    // setting state
    const [showForm, setShowForm] = useState(false);
    // setting state for filter
    const [perPage, setPerPage] = useState(50);
    const [pageNumber, setPageNumber] = useState(1);
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("DESC");
    // setting state for form
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [userType, setUserType] = useState("");
    // api request custom hooks
    const {
        response: usersData,
        isLoading: isUserDataLoading,
        apiFunc: fetchUserData,
    } = useHttp();
    const {
        response: addUserResponse,
        isLoading: isUserAdding,
        apiFunc: addUserFunc,
    } = useHttp();
    // Setting search params for search input
    useEffect(() => {
        if (!searchValue) {
            return;
        }
        clearTimeout(searchTimeOutId);
        const clearTimeoutId = setTimeout(() => {
            setSearchValueNow(searchValue);
        }, 1000);
        setSearchTimeOutId(clearTimeoutId);
    }, [searchValue]);
    // getting users data
    useEffect(() => {
        fetchUserData(
            apiUserList,
            new ApiConfig(
                {},
                {
                    per_page: perPage,
                    page_number: pageNumber,
                    sort_field: sortField,
                    sort_order: sortOrder,
                    search_term: searchValueNow,
                },
                headerCommon()
            )
        );
    }, [
        fetchUserData,
        perPage,
        pageNumber,
        sortField,
        sortOrder,
        searchValueNow,
        addUserResponse,
    ]);
    // Resetting form data if form submitted
    useEffect(() => {
        if (actionData?.success === true || showForm === false) {
            setFullName("");
            setUsername("");
            setEmail("");
            setUserType("");
            setMobile("");
            setPassword("");
        }
    }, [actionData, showForm]);
    const onSortingUser = useCallback((event) => {
        const orderNow =
            event.sortOrder === 1
                ? "ASC"
                : event.sortOrder === -1
                ? "DESC"
                : "";
        setSortField(event.sortField);
        setSortOrder(orderNow);
    }, []);
    // Submitting form
    const onAdding = () => {
        addUserFunc(
            apiUserAdd,
            new ApiConfig(
                {
                    full_name: fullName,
                    email,
                    username,
                    password,
                    mobile,
                    user_type: userType,
                },
                {},
                headerCommon()
            ),
            "POST"
        );
    };
    return (
        <>
            <div className="flex flex-wrap grid -mx-1 -mt-1">
                <div className="flex col-4 justify-content-start">
                    <div className="p-input-icon-left ">
                        <i className="pi pi-search" />
                        <InputText
                            placeholder="Search"
                            name="search_term"
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="p-inputtext-sm"
                        />
                    </div>
                </div>
                <div className="flex col-4 justify-content-center">
                    <div className="flex align-self-center">
                        <h4 className="page-main-title">Faculty List</h4>
                    </div>
                </div>
                <div className="flex col-4 justify-content-end">
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
                        header="Add User"
                        visible={showForm}
                        style={{ width: "50vw" }}
                        onHide={() => setShowForm(false)}
                        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                    >
                        <div className="flex flex-column">
                            <div className="grid">
                                <div className="col-6 flex justify-content-end">
                                    <div className="flex align-items-center mr-3">
                                        Full Name:{" "}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <InputText
                                        value={fullName}
                                        onChange={(e) =>
                                            setFullName(e.target.value)
                                        }
                                        placeholder="Full Name"
                                        className="md:w-11rem p-inputtext-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid">
                                <div className="col-6 flex justify-content-end">
                                    <div className="flex align-items-center mr-3">
                                        Username:{" "}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <InputText
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        placeholder="Username"
                                        className="md:w-11rem p-inputtext-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid">
                                <div className="col-6 flex justify-content-end">
                                    <div className="flex align-items-center mr-3">
                                        Password:{" "}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <InputText
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Password"
                                        className="md:w-11rem p-inputtext-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid">
                                <div className="col-6 flex justify-content-end">
                                    <div className="flex align-items-center mr-3">
                                        Email:{" "}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <InputText
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="name@gmail.com"
                                        className="md:w-11rem p-inputtext-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid">
                                <div className="col-6 flex justify-content-end">
                                    <div className="flex align-items-center mr-3">
                                        Mobile:{" "}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <InputText
                                        value={mobile}
                                        onChange={(e) =>
                                            setMobile(e.target.value)
                                        }
                                        placeholder="+91 9188787895"
                                        className="md:w-11rem p-inputtext-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid">
                                <div className="col-6 flex justify-content-end">
                                    <div className="flex align-items-center mr-3">
                                        User Type:{" "}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <Dropdown
                                        value={userType}
                                        onChange={(e) => setUserType(e.value)}
                                        options={ALL_USER_TYPE}
                                        placeholder="User Type"
                                        className={`w-full md:w-11rem p-inputtext-sm`}
                                        optionValue="value"
                                        optionLabel="type"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-content-center mb-1">
                                <Button
                                    label="ADD USER"
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
            {usersData && (
                <UserListTable
                    usersData={usersData}
                    onSortingUser={onSortingUser}
                    sortField={sortField}
                    sortOrder={sortOrder}
                />
            )}
        </>
    );
};

export default UserList;
