import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, InputButton, Page, Paragraph } from './Style'

function NotFound() {
    const navigate=useNavigate()
  return (
    <Page>
            <Container>

                <h1>OPPS!</h1>
                <Paragraph>Error 404 : Page Not Found</Paragraph>
                <InputButton variant='contained' onClick={()=>navigate('/')}> Go To HomePage</InputButton>
            </Container>



    </Page>
  )
}

export default NotFound