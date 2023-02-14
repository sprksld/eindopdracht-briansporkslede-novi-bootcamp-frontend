import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import isValidJwtToken from "../helpers/isValidJwtToken";
import path2url from "../helpers/path2url";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const decodedToken = (storedToken) ? jwt_decode(storedToken) : null;
        if (storedToken && isValidJwtToken(storedToken)) {
            console.log("user still logged in");
            // console.log(decodedToken.exp);
            void fetchUserData(storedToken, decodedToken.sub);
        } else {
            // geen stored token
            setAuth({
                ...auth
                , isAuth: false
                , user: null
                , status: "done"
            });
        }
    }, []);

    function login(jwt) {
        localStorage.setItem("token", jwt);
        console.log("The user has logged in");
        const decodedToken = jwt_decode(jwt);
        // console.log(decodedToken);
        void fetchUserData(jwt, decodedToken.sub, "/dashboard");
    }

    function logout() {
        localStorage.removeItem("token");   // was clear()
        console.log("The user has logged out");
        setAuth({
            ...auth
            , isAuth: false
            , user: null
            , status: "done"
        });
        navigate("/");
    }

    async function fetchUserData(token, id, redirect) {
        try {
            const response = await axios.get(path2url(`/users/${id}`),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            setAuth({
                ...auth
                , isAuth: true
                , user: {
                    username: response.data.username,
                    authorities: response.data.authorities,
                    email: response.data.email,
                    isPlanner: !!response.data.authorities.find((e) => e.authority === "PLANNER"),
                    isMentor: !!response.data.authorities.find((e) => e.authority === "MENTOR"),
                    isStudent: !!response.data.authorities.find((e) => e.authority === "STUDENT"),
                    isTeacher: !!response.data.authorities.find((e) => e.authority === "TEACHER"),
                    fullname: (response.data.student) ? response.data.student.name : response.data.mentor.name,
                    student_id: (response.data.student != null) ? response.data.student.id : null,
                    teacher_id: (response.data.mentor) ? response.data.mentor.id : null,
                }
                , status: "done"
            });
            console.log(response.data);
            if (redirect) {
                navigate(redirect);
            }
        } catch (e) {
            console.error(e);
            setAuth({
                ...auth
                , status: "done"
            });
        }
    }

    const contextData = {
        isAuth: auth.isAuth,
        setAuth: setAuth,
        user: auth.user,
        login: login,
        logout: logout,
        status: auth.status,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading ...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;