import {
    Form,
    useNavigate,
    useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { BUTTON_ACTIONS } from "../../utils/constants";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import useHttp from "../../hooks/useHttp";
import { ApiConfig } from "../../config/api-config-class";
import headerCommon from "../../config/common-headers";
import { apiGetUserDetail, apiUserUpdate } from "../../services/user";
import { ALL_USER_TYPE } from "../../utils/constants";

export function UserDetail() {
    let { userId, userAction } = useParams();
    const navigate = useNavigate();
    // setting state for form
    const [full_name,setFullName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [mobile,setMobile] = useState("");
    const [user_type,setUserType] = useState("");
    // request using custom hook
    const {
        response: userDetail,
        isLoading: isUserDetailLoading,
        apiFunc: getUserDetail,
    } = useHttp();
    const {
        response: updateUserResponse,
        isLoading: isUpdateUserLoading,
        apiFunc: updateUserFunc,
    } = useHttp();
    useEffect(() => {
        if (!userDetail) return;
        setFullName(userDetail?.full_name);
        setUsername(userDetail?.username);
        setEmail(userDetail?.email);
        setMobile(userDetail?.mobile);
        setUserType(userDetail?.user_type);
    }, [userDetail]);
    // getting user detail
    useEffect(() => {
        getUserDetail(
            apiGetUserDetail,
            new ApiConfig({}, {}, headerCommon(), {userId })
        );
    }, [getUserDetail, userId, updateUserResponse]);
    // submitting form
    const onUpdatingUser = () => {
        updateUserFunc(
            apiUserUpdate,
            new ApiConfig(
                {
                    full_name,
                    username,
                    password,
                    email,
                    mobile,
                    user_type
                },
                {},
                headerCommon(),
                { userId }
            ),
            "PUT"
        );
    };
    const goBackHandler = () => {
        navigate("..");
    };
    return (
        <>
            <div className="container px-sm-5 py-2">
                <div style={{ textAlign: "center" }}>
                    <h4 className="page-main-title">User Details</h4>
                </div>
                {userDetail && (
                    <Form className="row gx-5" method="post">
                        <div className="mb-3 col-md-4 d-flex flex-column">
                            <label htmlFor="full_name">Name</label>
                            <InputText
                                id="full_name"
                                placeholder="Full Name"
                                name="full_name"
                                onChange={(e) => setFullName(e.target.value)}
                                className="p-inputtext-sm"
                                defaultValue={
                                    userDetail?.full_name ? userDetail.full_name : ""
                                }
                                disabled={
                                    userAction === BUTTON_ACTIONS.update
                                        ? false
                                        : true
                                }
                            />
                        </div>
                        <div className="mb-3 col-md-4 d-flex flex-column">
                            <label htmlFor="username">Username</label>
                            <InputText
                                id="username"
                                placeholder="Username"
                                name="username"
                                onChange={(e) => setUsername(e.target.value)}
                                className="p-inputtext-sm"
                                defaultValue={
                                    userDetail?.username ? userDetail.username : ""
                                }
                                disabled={
                                    userAction === BUTTON_ACTIONS.update
                                        ? false
                                        : true
                                }
                            />
                        </div>
                        <div className="mb-3 col-md-4 d-flex flex-column">
                            <label htmlFor="password">Password</label>
                            <InputText
                                id="password"
                                placeholder="Password"
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-inputtext-sm"
                                defaultValue=""
                                disabled={
                                    userAction === BUTTON_ACTIONS.update
                                        ? false
                                        : true
                                }
                            />
                        </div>
                        <div className="mb-3 col-md-4 d-flex flex-column">
                            <label htmlFor="email">Email</label>
                            <InputText
                                id="email"
                                placeholder="Email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-inputtext-sm"
                                defaultValue={
                                    userDetail?.email ? userDetail.email : ""
                                }
                                disabled={
                                    userAction === BUTTON_ACTIONS.update
                                        ? false
                                        : true
                                }
                            />
                        </div>
                        <div className="mb-3 col-md-4 d-flex flex-column">
                            <label htmlFor="mobile">Mobile</label>
                            <InputText
                                id="mobile"
                                placeholder="Mobile"
                                name="mobile"
                                onChange={(e) => setMobile(e.target.value)}
                                className="p-inputtext-sm"
                                defaultValue={
                                    userDetail?.mobile ? userDetail.mobile : ""
                                }
                                disabled={
                                    userAction === BUTTON_ACTIONS.update
                                        ? false
                                        : true
                                }
                            />
                        </div>
                        <div className="mb-3 col-md-4 d-flex flex-column">
                            <label htmlFor="user_type">User Type</label>
                            <Dropdown
                                        value={user_type}
                                        onChange={(e) => setUserType(e.value)}
                                        options={ALL_USER_TYPE}
                                        placeholder="User Type"
                                        className={`w-full md:w-11rem p-inputtext-sm`}
                                        optionValue="value"
                                        optionLabel="type"
                                    />
                        </div>
                        <div className="d-flex justify-content-between">
                            <Button
                                disabled={
                                    userAction === BUTTON_ACTIONS.update
                                        ? false
                                        : true
                                }
                                type="button"
                                raised
                                size="small"
                                severity="success"
                                onClick={onUpdatingUser}
                            >
                                {userAction === BUTTON_ACTIONS.update
                                    ? "Update"
                                    : "View"}
                            </Button>
                            <Button
                                onClick={goBackHandler}
                                type="button"
                                raised
                                size="small"
                                severity="help"
                            >
                                Back
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </>
    );
};
