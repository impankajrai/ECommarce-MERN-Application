import React from 'react'
import { useSelector } from 'react-redux'
import NotFound from './NotFound'

function PageNavigator(props) {
    const user=useSelector(globalState=>globalState.user)


    if(user.role==="user"){
        return (<>
          {props.children}
            </>
        )
    }else{
        return (
          <NotFound/>
        )
    }
}

export default PageNavigator