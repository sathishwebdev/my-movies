import React from 'react'
import { Route, Switch } from 'react-router'
import App from './App'


function RouteConfig() {


    return (
        <div>
            <Switch>
                <Route exact path="/" children={<App/>}>
                </Route>
            </Switch>
        </div>
    )
}

export default RouteConfig
