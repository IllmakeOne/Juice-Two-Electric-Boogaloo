import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles' 

function SticckyDateNames({week}) {
    const C = useStyles()
    return (
        <div>
            {//console.log(thisWeek),
            week.map((el)=>{
                return(
                        <Paper elevation={3} className={C.daynameCell}>
                            <div >{el[0]} 
                                <br/> {el[1]}
                            </div>
                        </Paper>                  
                )
            })}
            
        </div>
    )
}

const useStyles = makeStyles({
    daynameCell:{
        background: '#0cbff5',    
        height: 60,   
        // borderLeft: 'solid',
        // borderRight: 'solid',
        // borderWidth: 1,
        textAlign: 'center',
        fontSize: 23,

        position: 'sticky',
        top: 73,

    }
  })

export default SticckyDateNames
