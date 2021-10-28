import React from 'react'
import { useHistory } from 'react-router'
import * as mui from '@mui/material'
import * as Icons from '@mui/icons-material'
import { BackBtn } from './App'


function NotExists() {
    let history = useHistory()
    return (
      <div>
        <BackBtn />
        <div className="splash">
          <div>
            
            <mui.Button
            variant="text"
            color="warning"
            onClick={()=>history.push('/')}
            ><Icons.ArrowBackIos />  Go Back To Home</mui.Button>
          </div>
        
          <div>
          <img width="100%" alt="404" title="404 - return to home" src='https://media1.giphy.com/media/hS42TuYYnANLFR9IRQ/giphy.gif?cid=6c09b952d7kfjcjmq95xpdxj2t2oczysznih93625vwosnzc&rid=giphy.gif&ct=s' />
          </div>
        </div>
      </div>
    )
}

export default NotExists
