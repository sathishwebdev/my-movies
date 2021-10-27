import React from 'react'
import { Route, Switch } from 'react-router'
import App from './App'
import Splash from './splash'

function RouteConfig() {


    return (
        <div>
            <Switch>
                <Route path="/movies" children={<App/>}>
                </Route>
                <Route path = '/' children={<Splash />}></Route>
            </Switch>
        </div>
    )
}

export default RouteConfig
