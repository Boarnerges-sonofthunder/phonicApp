import React, { useState } from 'react'
import "../../Styles/logoutButton.css"
import { useAuth } from "../Firebase/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { usePanier } from '../Context/PanierContext';


const LogoutButton = () => {
    const { logout } = useAuth()
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [click, setClick] = useState(false);
    const closeMobileMenu = () => setClick(false);
    const { getPanier } = usePanier();

    async function handleLogout() {
        setError("")
        try {
            await logout()
            getPanier()
            navigate("/login")
        } catch {
            setError("Deconnexion échouée")
        }
    }
  return (
    <>
    <button className='log-out'>
        <Link className='a-out' to="" onClick= {() => {handleLogout(); closeMobileMenu()}}>
            <FontAwesomeIcon icon={faRightFromBracket} />Se déconnecter
        </Link>
    </button>
    </>
  )
}

export default LogoutButton