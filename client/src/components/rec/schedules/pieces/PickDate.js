import {useContext } from 'react'

import {KeyboardDatePicker,
    MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { MyContext } from '../../../../App'

function PickDate({date, changeDate}) {
    const cx = useContext(MyContext)
    const auxCangeDate = (date) =>{
        changeDate(date)
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}> 
            <KeyboardDatePicker
                disableToolbar
                // views={["year", "month", "day"]}
                variant="inline"
                format="dd-MM"
                label={cx.lg=='en'?'Pick date':'Alege data'}
                value={date}
                onChange={auxCangeDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
        </MuiPickersUtilsProvider>
    )
}

export default PickDate
