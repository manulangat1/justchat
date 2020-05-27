import {tokenConfig } from './auth'
import axios from 'axios'
import { CONTACT_SUCCESS } from './types'
// ,getState(tokenConfig)
export const loadContacts = (username) => (dispatch,getState) => {
    axios.get(`/api/chats/?username=${username}`,tokenConfig(getState))
        .then(res => {
            dispatch({
                type:CONTACT_SUCCESS,
                payload:res.data
            })
        })
        .catch(err => console.log(err))
}