import { Link } from "react-router-dom";
import { useContext, useEffect} from "react";
import { UserContext } from "./UserContext";

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:4000/profile', {
                    credentials: 'include',
                });

                if (response.ok) {
                    const userInfo = await response.json();
                    setUserInfo(userInfo);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const logout = async () => {
        try {
            await fetch('http://localhost:4000/logout', {
                credentials: 'include',
                method: 'POST',
            });
            setUserInfo(null);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">Talks.</Link>
            <nav>
                {username ? (
                    <>
                        <Link className="btn" to="/create">Create new post</Link>
                        <Link className="btn" onClick={logout}>Logout ({username})</Link>
                    </>
                ) : (
                    <>
                        <Link className="btn" to="/register">Register</Link>
                        <Link className="btn" to="/login">Login</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
