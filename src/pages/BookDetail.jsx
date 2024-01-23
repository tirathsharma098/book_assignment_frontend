import { Form, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BUTTON_ACTIONS } from "../utils/constants";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import useHttp from "../hooks/useHttp";
import { ApiConfig } from "../config/api-config-class";
import headerCommon from "../config/common-headers";
import { apiBookDetail, apiBookUpdate } from "../services/book";

const BookDetail = () => {
    let { bookId, bookAction } = useParams();
    const navigate = useNavigate();
    // Form values state
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [summary, setSummary] = useState("");
    const [price, setPrice] = useState("");
    // request using custom hook
    const {
        response: bookDetail,
        isLoading: isBookDetailLoading,
        apiFunc: getBookDetail,
    } = useHttp();
    const {
        response: updateBookResponse,
        isLoading: isUpdateBookLoading,
        apiFunc: updateBookFunc,
    } = useHttp();
    useEffect(() => {
        if (!bookDetail) return;
        setTitle(bookDetail?.title);
        setAuthor(bookDetail?.author);
        setSummary(bookDetail?.summary);
        setPrice(bookDetail?.price);
    }, [bookDetail, updateBookResponse]);
    // getting user detail
    useEffect(() => {
        getBookDetail(
            apiBookDetail,
            new ApiConfig({}, {}, headerCommon(), { id: bookId })
        );
    }, [getBookDetail, bookId]);
    // submitting form
    const onUpdatingBook = () => {
        updateBookFunc(
            apiBookUpdate,
            new ApiConfig(
                {
                    title,
                    author,
                    summary,
                    price,
                },
                {},
                headerCommon(),
                { id: bookId }
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
                    <h4 className="page-main-title">Book Details</h4>
                </div>
                {bookDetail && (
                    <Form className="row gx-5" method="post">
                        <div className="mb-3 col-md-4 d-flex flex-column">
                            <label htmlFor="title">Title</label>
                            <InputText
                                id="title"
                                placeholder="Title"
                                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                                className="p-inputtext-sm"
                                defaultValue={
                                    bookDetail?.title ? bookDetail.title : ""
                                }
                                disabled={
                                    bookAction === BUTTON_ACTIONS.update
                                        ? false
                                        : true
                                }
                            />
                        </div>
                        <div className="mb-3 col-md-4 d-flex flex-column">
                            <label htmlFor="author">Author</label>
                            <InputText
                                id="author"
                                placeholder="Author"
                                name="author"
                                onChange={(e) => setAuthor(e.target.value)}
                                className="p-inputtext-sm"
                                defaultValue={
                                    bookDetail?.author ? bookDetail.author : ""
                                }
                                disabled={
                                    bookAction === BUTTON_ACTIONS.update
                                        ? false
                                        : true
                                }
                            />
                        </div>
                        <div className="mb-3 col-md-4 d-flex flex-column">
                            <label htmlFor="summary">Summary</label>
                            <InputText
                                id="summary"
                                placeholder="Summary"
                                name="summary"
                                onChange={(e) => setSummary(e.target.value)}
                                className="p-inputtext-sm"
                                defaultValue={
                                    bookDetail?.username
                                        ? bookDetail.username
                                        : ""
                                }
                                disabled={
                                    bookAction === BUTTON_ACTIONS.update
                                        ? false
                                        : true
                                }
                            />
                        </div>
                        <div className="mb-3 col-md-4 d-flex flex-column">
                            <label htmlFor="price">Price</label>
                            <InputText
                                id="price"
                                placeholder="Price"
                                name="price"
                                onChange={(e) => setPrice(e.target.value)}
                                className="p-inputtext-sm"
                                defaultValue={
                                    bookDetail?.price ? bookDetail.price : ""
                                }
                                disabled={
                                    bookAction === BUTTON_ACTIONS.update
                                        ? false
                                        : true
                                }
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <Button
                                disabled={
                                    bookAction === BUTTON_ACTIONS.update
                                        ? false
                                        : true
                                }
                                type="button"
                                raised
                                size="small"
                                severity="success"
                                onClick={onUpdatingBook}
                            >
                                {bookAction === BUTTON_ACTIONS.update
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

export default BookDetail;
