import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3008",
  }),
  prepareHeaders: (headers, { getState }) => {
    headers.set("Accept-Encoding", gzip, compress, br);
    return headers;
  },
  tagTypes: ["User", "Clinics"],
  reducerPath: "jsonplaceholderApi",
  endpoints: (build) => ({
    clinics: build.query({
      query: () => "/clinics",
    }),
    register: build.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    login: build.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    getEmployee: build.query({
      query: () => ({
        url: "/employees/employee",
        headers: {
          authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      }),
      providesTags: ["User"],
    }),
    UpdateEmployee: build.mutation({
      query: (body) => ({
        url: "/employees/employee",
        method: "PUT",
        headers: {
          authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getClinics: build.query({
      query: () => ({
        url: "/clinics",
        headers: {
          authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      }),
      providesTags: ["Clinics"],
    }),
    postClinic: build.mutation({
      query: (body) => ({
        url: "/clinics",
        method: "POST",
        headers: {
          authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
        body,
      }),
      invalidatesTags: ["Clinics"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
  useGetClinicsQuery,
  usePostClinicMutation,
} = api;
