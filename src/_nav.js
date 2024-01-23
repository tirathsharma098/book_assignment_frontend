import { CNavGroup, CNavItem } from "@coreui/react";
import { ALL_USER_TYPE, USER_TYPE } from "./utils/constants";

export const getNavigationArray = ({ userType }) => {
    const _nav = [
        {
            component: CNavItem,
            name: "Home",
            to: "/",
            icon: <i className="pi pi-home pr-3" />,
            badge: {
                color: "info",
            },
        },
    ];
    if (userType === "super_admin") {
        _nav.push({
            component: CNavGroup,
            name: "Admin",
            icon: <i className="pi pi-shield pr-3" />,
            items: [
                {
                    component: CNavItem,
                    name: "Users List",
                    icon: <i className="pi pi-user pr-3" />,
                    to: "/admin/users",
                },
            ],
        });
    }
    _nav.push({
        component: CNavItem,
        name: "Book",
        to: "/book",
        icon: <i className="pi pi-book pr-3" />,
        badge: {
            color: "info",
        },
    });
    if (userType === USER_TYPE.SUPER_ADMIN || userType === USER_TYPE.ADMIN)
        _nav.push({
            component: CNavItem,
            name: "Book Sold",
            to: "/book-sold",
            icon: <i className="pi pi-dollar pr-3" />,
            badge: {
                color: "info",
            },
        });
    _nav.push({
        component: CNavItem,
        name: "Book Bought",
        to: "/my-books",
        icon: <i className="pi pi-shopping-cart pr-3" />,
        badge: {
            color: "info",
        },
    });
    return _nav;
};
