import React from 'react'
import { NavLink} from 'react-router-dom'
const Contact = (props) => (
    <NavLink to={`${props.chatURL}`}>
    <li>
        <p>Username:{props.username}</p>
        <p>Online:{props.status}</p>
    </li>
    </NavLink>
)
export default Contact