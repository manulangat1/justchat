// import { CONTACT_SUCCESS } from ''
import { CONTACT_SUCCESS } from '../actions/types'
const initialState = {
    contacts:[]
}
export default function(state=initialState,action){
    switch(action.type){
        case CONTACT_SUCCESS:
            return{
                ...state,
                contacts:action.payload
            }
        default:
            return state
    }
}