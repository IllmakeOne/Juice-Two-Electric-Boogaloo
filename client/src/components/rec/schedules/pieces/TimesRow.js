import  Paper  from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles' 
import { MyContext } from '../../../../App'
import {GridColumn } from 'emotion-flex-grid'
import { useContext} from 'react'

function TimesRow({timeHighlight,onCellClick, upMouseScroll}) {
    const C = useStyles()
    const cx = useContext(MyContext)

    const selctedRow =(index)=>{
        onCellClick(index)
    }

    const wheelMove = e =>{
        if(e.deltaY < 0) 
            upMouseScroll(-1)
        else 
            upMouseScroll(1)
    }

    return (
        <div onWheel={wheelMove}>
            <Paper elevation={3} >
                    <div style={{    
                    height: 60,   
                    textAlign: 'center',
                    fontSize: 20,
                        }}>{cx.lg=='en'? 'Times':'Ore'}</div> 
            </Paper>
            <GridColumn >
                        {tymes.map((el,index)=>(
                            <Paper elevation={3} onClick={()=>selctedRow(index)} >
                                <div className={index == timeHighlight? C.timeCellHighlight:C.emptycell}
                                    >{el}</div>
                            </Paper>)
                        )}
            </GridColumn>
        </div>
    )
}

const useStyles = makeStyles({
    emptycell:{
        background: 'white',    
        height: 25,   
        textAlign: 'center',
    },

    timeCellHighlight:{
        background: 'white',    
        height: 25,   
        textAlign: 'center',
        
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'rgb(100, 125, 235)'
    },
})


const tymes = [//'Times',
        '07:00-07:30',
        '07:30-08:00',
        '08:00-08:30',
        '08:30-09:00',
        '09:00-09:30',
        '09:30-10:00',
        '10:00-10:30',
        '10:30-11:00',
        '11:00-11:30',
        '11:30-12:00',
        '12:00-12:30',
        '12:30-13:00',
        '13:00-13:30',
        '13:30-14:00',
        '14:00-14:30',
        '14:30-15:00',
        '15:00-15:30',
        '15:30-16:00',
        '16:00-16:30',        
        '16:30-17:00',
        '17:00-17:30',
        '17:30-18:00',
        '18:00-18:30',
        '18:30-19:00',
        '19:00-19:30',
        '19:30-20:00',
        '20:00-20:30',        
        '20:30-21:00',
        '21:00-21:30',
        '21:30-22:00',
        '22:00-22:30',
        '22:30-23:00',
        '23:00-23:30',
        '23:30-24:00',
        '00:00-00:30',
        '00:30-01:00',
        '01:00-01:30',
        '01:30-02:00',
    ]


export default TimesRow
