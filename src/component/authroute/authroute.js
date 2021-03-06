import {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux.js'
import {connect} from 'react-redux'
 
@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends Component {
    componentDidMount() {
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname

        if(publicList.indexOf(pathname)>-1) {
            return null
        }

        console.log('AuthRoute.js: ' + pathname)

        axios.get('/user/info')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        // console.log(res.data.code)   //是0
                        this.props.loadData(res.data.data)
                    } else {
                        //not here
                        this.props.history.push('/login')
                    }
                }
            })
    }
    render(){
        return null
    }
}

export default AuthRoute