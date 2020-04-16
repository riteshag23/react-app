import React, { Component } from "react"
import AppSettings from "./appSettings"
import axios from 'axios'

export default function UserService() {
    const appSettings = new AppSettings();

    const setToken = (token) => localStorage.setItem("token", token);

    const getToken = () => localStorage.getItem("token");

    async function verifyUser(username) {
        const URL = appSettings.USER_SERVICE_URL + "verifyUser/" + username;
        return callAPI(URL);
    }

    async function getUser(username) {
        const URL = appSettings.USER_SERVICE_URL + "getUser/" + username;
        return callAPI(URL);
    }

    async function getAdUser(username) {
        const URL = appSettings.USER_SERVICE_URL + "getAdUser/" + username;
        return callAPI(URL);
    }

    async function getReportingMangers() {
        const URL = appSettings.USER_SERVICE_URL + "getReportingUsers";
        return callAPI(URL);
    }

    async function getUsers() {
        const URL = appSettings.USER_SERVICE_URL + "getUsers";
        const options = {
            headers: {
                'x-access-token': getToken()
            }
        };
        return callAPI(URL);
    }

    async function getDepartments() {
        const URL = appSettings.USER_SERVICE_URL + "getDepartments";
        return callAPI(URL);
    }

    async function getDesignations() {
        const URL = appSettings.USER_SERVICE_URL + "getDesignations";
        return callAPI(URL);
    }

    async function getRegions() {
        const URL = appSettings.USER_SERVICE_URL + "regions";
        return callAPI(URL);
    }

    async function saveUser(user) {
        const URL = appSettings.USER_SERVICE_URL + "saveUser";
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        };
        var res = callAPI(URL, options);
    }

    async function uploadPhoto(formData) {
        const URL = appSettings.USER_SERVICE_URL + "uploadPhoto";
        axios.post(URL, formData).then(result => {
            console.log(result)
        });
    }

    function callAPI(url, options) {
        return fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    handleResponseError(response);
                }
                if (response.headers["x-access-token"])
                    setToken(response.headers["x-access-token"]);

                return response.json();
            })
            .then(json => {
                console.log(json);
                return json;
            })
            .catch(handleError);
    }

    function handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }

    function handleError(error) {
        console.log(error.message);
        return error.message;
    }

    return Object.freeze({
        getAdUser,
        getReportingMangers,
        verifyUser,
        getUsers,
        getDepartments,
        getDesignations,
        getRegions,
        saveUser,
        uploadPhoto,
        getUser
    });
}