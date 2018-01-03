import React, {Component} from 'react'
import Logo from '../../component/logo/logo'

import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Login extends Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
    }

    register() {
        this.props.history.push('/register')
    }
    render(){
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <h2>登陆页</h2>
                    <WingBlank>
                        <List>
                            <InputItem>用户</InputItem>
                            <InputItem type='password'>密码</InputItem>
                        </List>
                        <WhiteSpace></WhiteSpace>
                        <Button type='primary'>登陆</Button>
                        <WhiteSpace></WhiteSpace>
                        <Button onClick={this.register}>注册</Button>
                    </WingBlank>
                </WingBlank>
            </div>
        )
        
    }
}

export default Login