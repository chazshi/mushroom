import React, {Component} from 'react'
import Logo from '../../component/logo/logo'

import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { Redirect} from 'react-router-dom'

import { connect } from "react-redux"
import {login} from '../../redux/user.redux'

@connect(
    state=>state.user,
    {login}
)
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            pwd: ''
        }
        this.register = this.register.bind(this)
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    handleLogin(){
        this.props.login(this.state)
    }

    register() {
        this.props.history.push('/register')
    }
    render(){
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}

                <Logo></Logo>
                <WingBlank>
                    <h2>登陆页</h2>
                    <WingBlank>
                        <List>
                            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}

                            <InputItem
                                onChange={v => { this.handleChange('name', v) }}
                            >用户</InputItem>
                            <InputItem 
                                type='password'
                                onChange={v => { this.handleChange('pwd', v) }}
                            >密码</InputItem>
                        </List>
                        <WhiteSpace></WhiteSpace>
                        <Button 
                            type='primary'
                            onClick={() => this.handleLogin()}
                            >登陆</Button>
                        <WhiteSpace></WhiteSpace>
                        <Button onClick={this.register}>注册</Button>
                    </WingBlank>
                </WingBlank>
            </div>
        )
        
    }
}

export default Login