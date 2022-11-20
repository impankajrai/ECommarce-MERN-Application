import React,{useState} from "react";
import { Heading, Page, Container,SubContainer} from "./style";
import { Button } from "@mui/material";
import Popup from "../../Components/Popup";
import PasswordEdit from "./PasswordEdit";
import { useSelector } from "react-redux";

function Account() {
const [opendialog,setOpendialog]=useState(false);
const user=useSelector(globalState=>globalState.user)

  return (
    <Page>
      <Container>
        <Heading >Account Setting</Heading>
        <SubContainer>
          <table  width="50%" style={{marginTop:'10px'}}>
            <tr height='35px'>
              <th  width='200px' align="center">Email</th>
              <td  width='200px'>{user.email}</td>
            </tr>

            <tr height='35px'>
              <th width='200px'  align="center">Password</th>
              <td  width='200px'>*****************</td>
            </tr>
          </table>
        </SubContainer>
        <Button  variant="contained" size="small" style={{width:'200px',margin:'0 auto'}} onClick={()=>setOpendialog(true)}>Change Password</Button>

        {/* -------- DialogBox Code --------- */}
        <Popup open={opendialog} setopen={setOpendialog}>
            <PasswordEdit setopen={setOpendialog}/>
        </Popup>


      </Container>
    </Page>
  );
}

export default Account;
