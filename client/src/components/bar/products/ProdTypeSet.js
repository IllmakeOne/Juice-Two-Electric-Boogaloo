import React from 'react'
import ProdButton from './ProdButton'
import Button from 'react-bootstrap/esm/Button';
import { GridWrap, GridRow, GridColumn } from 'emotion-flex-grid'




const ProdTypeSet = ({items, onClick, changeFav}) => {
    const aux = (id) =>{
        changeFav(id)
    }


    const getSlice = () => {
        var ret = []
        items.map((el,index)=>{
            if(el.stock == 0){ ret.push(<GridColumn width ={4} p={['m', 'm']}  >
                    <div key = {el.id} >
                            <ProdButton prod = {el}
                                onClick = {aux} 
                                changeFav ={changeFav}
                                className ='unavailableprodbutton'
                                />
                        </div>
                </GridColumn>)

            } else {
                ret.push(<GridColumn width ={4} p={['m', 'm']}  >
                    <div key = {el.id} >
                             <ProdButton prod = {el}
                                 onClick = {onClick} 
                                 className ='prodbutton'
                                 changeFav ={changeFav}
                                 />
                         </div>
                 </GridColumn>)
            }

        })
        return ret
    }
    

    const makeGrid = () => {
        var ret =[]
        // console.log(ret)

        ret.push(<GridRow wrap='wrap'justify='around' >
                {getSlice()
                // ,console.log(ret)
                }
            </GridRow>)
        return ret
    }


    return (
        <div className='prodtypeset'>
            {/* <h2>Type: {items[0].type}</h2> */}
            {makeGrid()}
        </div>
    )
}

export default ProdTypeSet
