import React from 'react'
import ReactDOM from 'react-dom'
// import HOC from '../hoc/HOC'
import { connect } from 'react-redux'
import {Link,withRouter,Redirect} from 'react-router-dom'
import {logout} from '../../actions/auth'
import '../../styles/main.scss'
class Header extends React.Component{
    state = {
        search:""
    }
    // componentDidMount(){
    //     this.props.cartSuccess()
    //     console.log(this.props.cart)
    // }
    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    
    onSubmit = e =>{
        e.preventDefault();
        const { search} = this.state
        // const search = "Sw"
        if(!this.props.auth.isAuthenticated){
            alert("You need to be authenticated to use this feature")
            return <Redirect to='/login' />
        } else{
        this.props.loadCategory(search)
        this.props.history.push('/search')
        }
        
        // return <Redirect to="/search" />
    }
    render(){
        const {isAuthenticated,user} = this.props.auth
        const { search } = this.state
        const authLinks = (
            <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    </li>
                    <button onClick={this.props.logout} className="primary-btn">Logout</button>
                </ul>
        )
        const guestLinks = (
            <ul>
                    <li>
                    <Link to="/login">Login</Link>
                    </li>
                    <li>
                    <Link to="/register">register</Link>
                    </li>
                </ul>
        )
        return (
            <section>
            <section id="heads">
                <div className="container">
                    <div id="branding">
                        <h1> <i class="fas fa-couch fa-5.5x"><span className="highlight"> Letshego </span> Furniture</i></h1>
                        
                    </div>
                    <nav>
                        {isAuthenticated ? authLinks:guestLinks}
                    </nav>
                </div>
            </section>
            </section>
        )
    }
}
// Header = HOC(Header)
const mapStateToProps = state=> ({
    auth:state.auth,
})
export default withRouter(connect(mapStateToProps,{logout})(Header))