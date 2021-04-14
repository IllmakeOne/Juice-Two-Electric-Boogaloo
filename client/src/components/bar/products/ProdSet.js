// import { Button } from '@material-ui/core';
import ProdTypeSet from './ProdTypeSet'
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from 'react'
import ProdButton from './ProdButton'
import React from 'react'

import Paper from '@material-ui/core/Paper';


import { GridWrap, GridRow, GridColumn } from 'emotion-flex-grid'

const  ProdSet = ({items, onClick, changeFav}) => {

    
    const[crtType, setCrtType] = useState('Juice')
    const[uniqueTypes, setUniqueTypes] = useState([])

    useEffect(() => {
        var types = items.map((elem)=>elem.type).filter((el) => el != 'Service')
        types.unshift('Favorites')
    
        setUniqueTypes(types.filter((elem, pos)=> { //this makes it so there are no doubles
            return types.indexOf(elem) == pos
        }))        
    },[])   


    return (
        <div className='prodset'>
            <GridRow warp='nowrap '>
                <GridColumn className='changeitemtype' width={2}>
                {uniqueTypes.map((t)=> {
                    return(
                    <Button
                        onClick= {()=>setCrtType(t)}>
                        <h2>{t}</h2>
                    </Button>
                    )
                    })  
                }
                </GridColumn>
                <GridColumn width={13} >
                    <Paper style={{maxHeight: 690, overflow: 'auto'}} >   
                        {//console.log(items),
                        crtType.localeCompare('Favorites') == 0? 
                            <ProdTypeSet 
                                items = {items.filter((el) => {if(el.fav) return el})} 
                                //bugggggg hereee , if he filter coems out empty it crashes
                                onClick = {onClick}
                                changeFav = {changeFav}
                                />
                            :<ProdTypeSet 
                                items = {items.filter((el) => {if(el.type == crtType) return el})}
                                onClick = {onClick}
                                changeFav ={changeFav}
                                />}
                    </Paper>   
                </GridColumn>
            </GridRow>
        </div>
    )
}

export default ProdSet