import { useEffect } from "react";
import { logout } from "../utils/logout";

const SESSION_TIME = 15 * 60 * 1000; // 15 minutes

function SessionTimeout() {

    

    useEffect(() => {

        let timer;

        const resetTimer = () => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                alert("Session expired due to inactivity.");

                logout();

            }, SESSION_TIME);

        };

        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keypress", resetTimer);
        window.addEventListener("click", resetTimer);
        window.addEventListener("scroll", resetTimer);

        resetTimer();

        return () => {

            clearTimeout(timer);

            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keypress", resetTimer);
            window.removeEventListener("click", resetTimer);
            window.removeEventListener("scroll", resetTimer);

        };

    }, []);

    return null;
}

export default SessionTimeout;