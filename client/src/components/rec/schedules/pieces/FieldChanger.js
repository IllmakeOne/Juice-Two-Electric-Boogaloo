import {useContext} from 'react'

import Button from '@material-ui/core/Button'
import {  GridColumn, GridRow } from 'emotion-flex-grid'
import { MyContext } from '../../../../App'

function FieldChanger({changeField}) {

    const cx = useContext(MyContext)
    const fields =cx.lg=='en' ?
             ['Hall', 'OutDoor', 'Tennis', 'Aerobic']:
             ['Sala Polivalenta', 'Fotbal', 'Tenis', 'Aerobic']

    const changeCrtField = (field) => {
        changeField(field)
    }

    return (
        <GridRow >
            {fields.map( el => {
                      return (
                          <GridColumn>
                              <Button
                                  variant="outlined"
                                  style={{margin: 15, padding: 10}}
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
