import useAuth from "../../hooks/useAuth";

function SpotifyDashboard( {code} ) {

    const accessToken = useAuth(code);

    return(
        <div>{code}</div>
    )
}

export default SpotifyDashboard;