import { useEffect, useState } from "react";
import { FrontEndData } from "../components/QnaData";
import Login from "../components/Login";
import Welcome from "../components/Welcome";

export default function Home() {
    const [user, setUser] = useState(localStorage.getItem('user'));

    const [isRegistered, setIsRegistered] = useState(false);

    // 상태를 업데이트하는 함수
    function handleRegister() {
      setIsRegistered(true);
    }

    useEffect(() => {
        setUser(localStorage.getItem('user'));
        if (user) {
            handleRegister();
        }
    }, [isRegistered]);

    return(
    <>
    {!user &&
        <Login onRegister={handleRegister}/>
    }
    {user && 
        <Welcome 
            isRegistered={isRegistered}
            user={user}
            setUser={setUser}
            FrontEndData={FrontEndData}
        />
    }
    </>
    )
};