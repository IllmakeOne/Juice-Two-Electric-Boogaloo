
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

function OrangePaper({children, height, width}) {
    
const useStyles = makeStyles({

    paper: {
        boxShadow: '2px 2px 34px 7px rgb(255, 170, 86)',
        height: 400,
        width:  600,
        padding: 15,
        height: height==undefined?'500px':height,
        width: width==undefined?'600px':width,
        overflow: 'auto',
    },
  });

    const C = useStyles()
    return (
        <Paper elevation={2} className={C.paper}>
            {children}
        </Paper>
    )

    
}

export default OrangePaper
