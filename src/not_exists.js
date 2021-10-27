import React from 'react'
import { useHistory } from 'react-router'
import * as mui from '@mui/material'
import * as Icons from '@mui/icons-material'

function Not_exists() {
    let history = useHistory()
    return (
        <div>
        <div className="splash" > 
        <mui.Button
        variant="text"
        color="warning"
        onClick={()=>history.push('/')}
        ><Icons.KeyboardArrowLeft />  Go Back To Home</mui.Button> </div>
      </div>
    )
}

export default Not_exists
