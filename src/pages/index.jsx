import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage, { action as loginAction } from "./Login";
import RootLayout from "../layouts/Root";
import NotFound from "./NotFound";
import { checkAuthLoader } from "../utils/auth.js";
import SystemError from "./error/SystemError";
import Logout, { action as logoutAction } from "./Logout";
import Home from "./home/Home";
import UserList from "./admin/UserList.jsx";
import BookList from "./BookList.jsx";
import BookDetail from "./BookDetail.jsx";
import BookSold from "./BookSold.jsx";
import { UserDetail } from "./admin/UserDetail.jsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        action: loginAction,
    },
    {
        path: "/",
        element: <RootLayout />,
        loader: checkAuthLoader,
        errorElement: <SystemError />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "admin",
                children: [
                    {
                        path: "users",
                        children: [
                            {index: true, element: <UserList />},
                            {path: ":userAction/:userId", element: <UserDetail/>}
                        ]
                    },
                ],
            },
            {
                path: "book",
                children: [
                    {index: true, element: <BookList/>},
                    { path: ":bookAction/:bookId", element: <BookDetail /> },
                ],
            },{
                path: "book-sold",
                element: <BookSold/>
            }
        ],
    },
    {
        path: "/logout",
        element: <Logout />,
        action: logoutAction,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

const MainPage = () => {
    return <RouterProvider router={router} />;
};

export default MainPage;
