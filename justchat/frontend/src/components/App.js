import React from 'react'
import ReactDOM from 'react-dom'
import Chat from './chat/Chat'
import Sidepanel from './chat/Sidepanel'
import '../styles/main.scss'
import WebSocketInstance from '../websocket'
import { Provider } from 'react-redux'
import store from '../store'
import Register from './auth/Register'
import Login from './auth/Login'
import Dashboard from './Dashboard'
import { HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import Header from './layout/Header'
import { loadUser} from '../actions/auth'
import PrivateRoute from './common/PrivateRoute'
import Footer from './layout/Footer'
class App extends React.Component{
    componentDidMount(){
        store.dispatch(loadUser())
        WebSocketInstance.connect()
    }
    render(){
        return(
            <Provider store={store}>
                <Router>
            <main >
                <div>
                    <Header />
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard}/>
                       
                        {/* <PrivateRoute exact path="/:chatURL/" component={Dashboard}/> */}
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <PrivateRoute exact path="/:chatID" component={Chat}/>
                </Switch>
                <Footer />
                </div>
            </main>
            </Router>
            </Provider>
        )
    }
}
ReactDOM.render(<App />,document.getElementById('app'))