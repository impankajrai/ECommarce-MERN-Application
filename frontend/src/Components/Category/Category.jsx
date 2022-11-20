import React from 'react'
import {data} from './data'
import { Component, Container, MenuImage, MenuText } from './Style';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

function Category() {

  return (
    <>
        <Component>
            {
                data.map(temp => (
                    <Container key={temp.id}>
                        <MenuImage src={temp.url} alt="Menu" />
                        <MenuText>{temp.text}{temp.Options&&<ArrowDropDownIcon />}</MenuText>
                    </Container>
                ))
            }
        </Component>
    </>
  )
}

export default Category