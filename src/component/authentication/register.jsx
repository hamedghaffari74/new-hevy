import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import routinApi from "../axiosApi/axiosRoutin";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as yup from "yup";
import LOGO from "../../img/LOGO_DDEM_BLACK.png";
import CustomizedSnackbars from "../snakbar/alert";

function Register() {
  const [Successfull, setSuccessfull] = useState(false);
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState();
  const initialValues = {
    name: "",
    mobile: "",
    password: "",
    gender: "",
  };

  const registerFormValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required("وارد کردن نام الزامیست")
      .min(3, "نباید کمتر از 3 حرف باشد")
      .max(18, "نباید بیشتر از 20 حرف باشد"),
    mobile: yup.string().required("وارد کردن شماره ی همراه الزامیست"),
    password: yup
      .string()
      .min(7, "نباید کمتر از 7 کاراکتر باشد")
      .required("وارد کردن رمز عبور الزامیست")
      .min(6, "نباید کمتر از 6 کاراکتر باشد")
      .max(12, "نباید بیشتر از 12 کاراکتر باشد"),
    // gender: yup.required("یک گزینه را انتخاب کنید")
  });

  const handleSubmit = (value) => {
    routinApi
      .post(`/register`, value)
      .then((res) => setSuccessfull(true))
      .catch((err) =>
        err.request.status == 404 || 422
          ? (setTextError(err.response.data.message), setError(true))
          : ""
      );
  };
  if (Successfull) {
    return <Navigate to="./login" />;
  }

  return (
    <>
      {error ? (
        <>
          <CustomizedSnackbars variant={2} text={textError} />
          {setTimeout(() => {
            setError(false);
          }, 3000)}
        </>
      ) : (
        ""
      )}
      <div className="login h-[80vh]">
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-[5.5rem] w-[5.5rem]"
              src={LOGO}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
              ثبت نام در DDEM
            </h2>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <Formik
                validationSchema={registerFormValidationSchema}
                initialValues={initialValues}
                onSubmit={(value) => handleSubmit(value)}
              >
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1">
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback text-red-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      phone
                    </label>
                    <div className="mt-1">
                      <Field
                        id="mobile"
                        name="mobile"
                        type="phone"
                        autoComplete="mobile"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="invalid-feedback  text-red-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback text-red-300"
                    />
                  </div>
                  <div className="flex row">
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700"
                    >
                      gender
                    </label>
                    <div className="mt-1 ml-3">
                      <label className="text-gray-500  font-bold">
                        <Field
                          name="gender"
                          value="male"
                          className="mr-2 leading-tight"
                          type="radio"
                        />
                        <span class="text-sm  mr-2">مرد</span>
                      </label>
                    </div>
                    <div className="mt-1 ml-3">
                      <label className="text-gray-500 font-bold">
                        <Field
                          name="gender"
                          value="female"
                          className="mr-2 leading-tight"
                          type="radio"
                        />
                        <span class="text-sm mr-2   ">زن</span>
                      </label>
                    </div>
                  </div>
                  <div className="mt-2">
                    {" "}
                    <Link to="/login "> حساب کاربری دارید </Link>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      ثبت نام کنید
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
