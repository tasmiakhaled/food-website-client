import React, { useContext, useState } from 'react'
import './dropdown.css'
import { AuthContext } from '../../contexts/UserContext';


const DropDown = ({ dropdown, setDropdown }) => {
    const { user, logOut } = useContext(AuthContext);
    const [settingSub, setSettingSub] = useState(false)

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error));
    }
    
    return (
        <div className='dropdown-container'>
            <li className="d-item " onClick={() => {
                console.log('profile')
            }}>
                <i class="ri-profile-line"></i>
                <p>MyProfile</p>
            </li>
            <li className="d-item " onClick={() => {
                setSettingSub(!settingSub)
                console.log('settings')
            }}>
                <i class="ri-settings-3-line"></i>
                <p>Settings</p>
            </li>
            {settingSub &&
                <div className='d-sub-items'>
                    <li className="d-sub-item" onClick={() => {
                        console.log('edit profile')
                    }}>
                        <p>Edit Profile</p>
                    </li>
                    <li className="d-sub-item" onClick={() => {
                        console.log('change pass')
                    }}>
                        <p>Change password</p>
                    </li>
                    <li className="d-sub-item " onClick={() => {
                        console.log('privacy')
                    }}>
                        <p>Privacy settings</p>
                    </li>
                </div>
            }
            <li className="d-item" onClick={() => {
                console.log('help')
            }}>
                <i class="ri-question-line "></i>
                <p> Help</p>
            </li>

            <li className="d-item " onClick={() => {
                console.log('logged out')
                handleLogOut()
                setDropdown(!dropdown)
            }}>
                <i class="ri-logout-box-line"></i>
                <p>Logout</p>
            </li>

        </div>
    )
}

export default DropDown