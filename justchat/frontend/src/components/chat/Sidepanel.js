import React from 'react'
import Contact from './Contact'
import { connect } from 'react-redux'
import {loadContacts} from '../../actions/chats'
class Sidepanel extends React.Component{
    componentDidMount(){
        console.log(this.props.auth)
        if (this.props.auth){
            this.props.loadContacts(this.props.auth)
        } 
    }
    // componentWillReceiveProps(){
    //     console.log(this.props.auth)
    // }
    render(){
        const { contacts } = this.props
        return(
            <section>
                {
                    contacts && contacts.map(contact => (
                        <div>
                            <Contact  key={contact.id} username="manu" status="online" chatURL={`/${contact.id}`}/>
                        </div>
                    ))
                }
            </section>
        )
    }
}
const mapStateToProps = state => ({
    auth:state.auth.user.username,
    contacts:state.chats.contacts
})
export default connect(mapStateToProps,{loadContacts})(Sidepanel)