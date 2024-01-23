import React, { useCallback, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useNavigate, useSubmit } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { apiUserSignUp } from "../../services/user";
import { ApiConfig } from "../../config/api-config-class";
import headerCommon from "../../config/common-headers";
const Login = (props) => {
    const FORM_TYPE = props.formType;
    // setting state for form
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    let submit = useSubmit();
    const navigate = useNavigate();
    // custom hook to send api req
    const {
      response: signUpData,
      isLoading: isSigningUp,
      apiFunc: signUpUserFunc,
  } = useHttp();
  useEffect(()=>{
    if(!signUpData) return;
    navigate(0);
  }, [signUpData])
  const onSignUp = () => {
    signUpUserFunc(
      apiUserSignUp,
      new ApiConfig(
        {
            full_name: fullName,
            email,
            username,
            password,
            mobile,
        },
        {},
        headerCommon()
    ),
    "POST"
    )
  }
    const setAuthPage = (authPageToGo) => {
        props.setAuthPage(authPageToGo);
    };

    const containerClassName = classNames(
        "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
    );

    const onSubmitForm = useCallback(() => {
        submit(
            {
                username: username,
                password: password,
                mode: props.authPage,
            },
            { method: "post", encType: "application/json" }
        );
    }, [username, password, props.authPage, submit]);

    return (
        <div>
            <div className={containerClassName}>
                <div className="flex flex-column align-items-center justify-content-center">
                    <div
                        style={{
                            borderRadius: "56px",
                            padding: "0.3rem",
                            marginTop: "0.3rem",
                            background:
                                "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
                        }}
                    >
                        <div
                            className="w-full surface-card py-8 px-5 sm:px-8"
                            style={{ borderRadius: "53px" }}
                        >
                            <h3 className="text-center mb-5">
                                Sartia Global
                                {/* <div className="text-900 text-3xl font-medium mb-3">Presence</div>
                <span className="text-600 font-medium">Take your attendance</span> */}
                            </h3>

                            <div className="flex flex-column justify-content-center">
                                {props.authPage === FORM_TYPE.LOGIN && (
                                    <>
                                        <label
                                            htmlFor="username"
                                            className="block text-900 text-xl font-medium mb-1"
                                        >
                                            Email
                                        </label>
                                        <InputText
                                            id="username"
                                            type="text"
                                            name="username"
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            placeholder="Email address"
                                            className="p-inputtext-sm w-full md:w-30rem mb-3"
                                            style={{
                                                zIndex: 200,
                                                backgroundColor: "white",
                                            }}
                                        />

                                        <label
                                            htmlFor="password"
                                            className="block text-900 font-medium text-xl mb-1"
                                        >
                                            Password
                                        </label>
                                        <Password
                                            inputId="password"
                                            value={password}
                                            name="password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Password"
                                            toggleMask
                                            feedback={false}
                                            className="p-inputtext-sm w-full md:w-30rem mb-3"
                                            inputClassName="w-full md:w-30rem"
                                        />
                                        
                                    </>
                                )}
                                {props.authPage === FORM_TYPE.VERIFY_EMAIL && (
                                    <>
                                        <label
                                            htmlFor="forgot_email"
                                            className="block text-900 text-xl font-medium mb-1"
                                        >
                                            Email
                                        </label>
                                        <InputText
                                            id="forgot_email"
                                            type="text"
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            placeholder="Email address"
                                            className="p-inputtext-sm w-full md:w-30rem mb-3"
                                        />
                                    </>
                                )}
                                {props.authPage === FORM_TYPE.SIGNUP && (
                                    <>
                                        <label
                                            htmlFor="full_name"
                                            className="block text-900 text-xl font-medium mb-1"
                                        >
                                            Full Name
                                        </label>
                                        <InputText
                                            id="full_name"
                                            value={fullName}
                                            onChange={(e) =>
                                                setFullName(e.target.value)
                                            }
                                            placeholder="Full Name"
                                            className="p-inputtext-sm w-full md:w-30rem mb-3"
                                            style={{
                                                zIndex: 200,
                                                backgroundColor: "white",
                                            }}
                                        />
                                        <label
                                            htmlFor="username"
                                            className="block text-900 text-xl font-medium mb-1"
                                        >
                                            Username
                                        </label>
                                        <InputText
                                            id="username"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            placeholder="Username"
                                            className="p-inputtext-sm w-full md:w-30rem mb-3"
                                            style={{
                                                zIndex: 200,
                                                backgroundColor: "white",
                                            }}
                                        />
                                        <label
                                            htmlFor="password"
                                            className="block text-900 text-xl font-medium mb-1"
                                        >
                                            Password
                                        </label>
                                        <InputText
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Password"
                                            className="p-inputtext-sm w-full md:w-30rem mb-3"
                                            style={{
                                                zIndex: 200,
                                                backgroundColor: "white",
                                            }}
                                        />
                                        <label
                                            htmlFor="email"
                                            className="block text-900 text-xl font-medium mb-1"
                                        >
                                            Email
                                        </label>
                                        <InputText
                                            id="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="name@gmail.com"
                                            className="p-inputtext-sm w-full md:w-30rem mb-3"
                                            style={{
                                                zIndex: 200,
                                                backgroundColor: "white",
                                            }}
                                        />
                                        <label
                                            htmlFor="mobile"
                                            className="block text-900 text-xl font-medium mb-1"
                                        >
                                            Mobile
                                        </label>
                                        <InputText
                                            id="mobile"
                                            value={mobile}
                                            onChange={(e) =>
                                                setMobile(e.target.value)
                                            }
                                            placeholder="+91 9188787895"
                                            className="p-inputtext-sm w-full md:w-30rem mb-3"
                                            style={{
                                                zIndex: 200,
                                                backgroundColor: "white",
                                            }}
                                        />
                                    </>
                                )}
                                <div className="flex flex-column">
                                    <Button
                                        size="small"
                                        style={{ fontSize: "18px" }}
                                        onClick={props.authPage === FORM_TYPE.SIGNUP ? onSignUp: onSubmitForm}
                                    >
                                        {props.authPage === FORM_TYPE.LOGIN &&
                                            "Sign In"}
                                        {props.authPage ===
                                            FORM_TYPE.VERIFY_EMAIL &&
                                            "Forgot Password"}
                                        {props.authPage === FORM_TYPE.SIGNUP &&
                                            "SignUp"}
                                    </Button>
                                    <div className="d-flex justify-content-between font-medium no-underline ml-2">
                                        <span
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setAuthPage(
                                                    props.authPage ===
                                                        FORM_TYPE.LOGIN
                                                        ? FORM_TYPE.SIGNUP
                                                        : FORM_TYPE.LOGIN
                                                );
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {props.authPage === FORM_TYPE.LOGIN
                                                ? "SignUp"
                                                : "Login"}
                                        </span>
                                        <span
                                            style={{
                                                color: "var(--primary-color)",
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setAuthPage("verify-email");
                                            }}
                                            className="cursor-pointer"
                                        >
                                            Forgot password?
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
