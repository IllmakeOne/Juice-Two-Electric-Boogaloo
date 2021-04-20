import {useContext, useState} from 'react'

import Button from '@material-ui/core/Button'
import {  GridColumn, GridRow } from 'emotion-flex-grid'
import { MyContext } from '../../../../App'

function FieldChanger({ changeField}) {

    const cx = useContext(MyContext)
    const [crtField, setCrtField]= useState('Hall')
    const fields =cx.lg=='en' ?
             ['Hall', 'OutDoor', 'Tennis', 'Aerobic']:
             ['Sala Polivalenta', 'Fotbal', 'Tenis', 'Aerobic']

    const changeCrtField = (field) => {
        setCrtField(field)
        changeField(field)
    }

    return (
        <GridRow >
            {fields.map( el => {
                    const auxColor = crtField==el?'highlitedField':''
                      return (
                          <GridColumn>
                              <Button
                                //   className={auxColor}
                                  variant="outlined"
                                  style={{margin: 15, padding: 10, background:  crtField==el?'#e6edff':'#fffbe6'}}
                                  onClick={()=>changeCrtField(el)}
                                  >
                                  {el}
                              </Button>
                          </GridColumn>
                      )
                  })}
        </GridRow>
    )
}

export default FieldChanger
