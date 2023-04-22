import { useState, useEffect } from "react";
import axios from 'axios';

const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    // useEffect(() => {
    //     axios.post("/api/spotify/login", {code})
    //         .then((response) => {
    //             console.log(response.data);
    //         })
    // }, [code])

}

export default useAuth;