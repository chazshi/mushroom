import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, Radio, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import './register.scss'

@connect(
    state => state.user,
    {register}
)
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            pwd:'',
            repeatPwd: '',
            type: 'hunter'  //boss hunter
        }
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    handleRegister() {
        this.props.register(this.state)
    }
    
    render() {
        // console.log(this.props)
        const RadioItem = Radio.RadioItem
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <h2>注册页</h2>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem
                            onChange={v => { this.handleChange('name', v) }}
                        >用户</InputItem>
                        <InputItem
                            type='password'
                            onChange={v => { this.handleChange('pwd', v) }}
                        >密码</InputItem>
                        <InputItem
                            type='password'
                            onChange={v => { this.handleChange('repeatPwd', v) }}
                        >确认密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <RadioItem 
                            checked={this.state.type==='hunter'}
                            onChange={() => { this.handleChange('type', 'hunter') }}
                        >求职者</RadioItem>
                        <RadioItem 
                            checked={this.state.type==='boss'}
                            onChange={() => { this.handleChange('type', 'boss') }}
                        >BOSS</RadioItem>
                        <Button 
                            type='primary'
                            onClick={() => this.handleRegister()}
                        >注册</Button>
                    </List>
                </WingBlank>
            </div>
        )

    }
}

export default Register