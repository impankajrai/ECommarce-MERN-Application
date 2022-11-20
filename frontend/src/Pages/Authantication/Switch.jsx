import React,{useState} from 'react'
import ForgetPassword from './ForgetPassword';
import SignIn from './SignIn'
import SignUp from './SignUp'

export default function Switch() {
  const [showWindows,setShowWindows]=useState("signin");

return (<>

    {showWindows==="signin" &&<SignIn setShowWindows={setShowWindows}/>}
    {showWindows==="signup" &&<SignUp setShowWindows={setShowWindows}/>}
    {showWindows==="forgetpassword" &&<ForgetPassword setShowWindows={setShowWindows}/>}



  </>
  )
}
