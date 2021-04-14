import { useState, useEffect } from 'react'
import { GridWrap, GridRow, GridColumn } from 'emotion-flex-grid'
import {css} from '@emotion/css'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'   


import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Button from '@material-ui/core/Fab'
import { Container } from '@material-ui/core'

function Canvas() {

    const C = useStyles()
    
    


    const [unit, setUnit] = useState({
                                x: 0,
                                y: 0,
                            })

    const pickedItem = e => {
        e.preventDefault()
        console.log('reee')
        console.log(e.props.clientX)


        // setUnit({
        //     x: e.props.clientX,
        //     y: e.props.clientY,
        // })

    }

    return (
        <div><br/><br/><br/>

        <DragDropContext>
            <GridRow  
                className={css` 
                        width: 1400px;
                        height: 800px
                    `}
                >
                <GridColumn width= {2} 
                    className={css` 
                        background: lightgrey
                
                        `}
                    >   
                    
                        <Draggable>
                            <Paper elevation={2} className={C.littleSqare}  >
                                    <Button onDrag={e=>pickedItem(e)}>
                                        E
                                    </Button>
                            </Paper >
                        </Draggable>


                </GridColumn>
                <GridColumn width= {10} 
                    className={css` 
                        background: pink
                
                        `}

                    ><Container><Droppable>
                        <Paper elevation={3} className={C.fillish}>

                        </Paper>
                    </Droppable></Container>



                        <GridColumn>
                            {/* {unit.x} */}
                        </GridColumn>
                </GridColumn>
            </GridRow>
        </DragDropContext>

        
            
        </div>
    )
}

const useStyles = makeStyles({
    fill:{
        width: '100%',
        height: '100%'

    },
    fillish:{
        width: '90%',
        height: '90%'

    },

    littleSqare:{
        position: 'absolute',
        height: 100,
        width: 100,
        background: 'rgb(232, 238, 248)'
    }
})

export default Canvas
