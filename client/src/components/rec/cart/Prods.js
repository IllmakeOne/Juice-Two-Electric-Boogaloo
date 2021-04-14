import React from 'react'
import { GridWrap, GridRow, GridColumn } from 'emotion-flex-grid'
import { Button } from '@material-ui/core'

function Prods({items, addItem}) {

    const getSlice = () => {
        var ret = []
        items.map((prod,index) => {
                ret.push(
                <GridColumn width ={4} p={['m', 'm']}  >
                    <div key = {prod.id} onClick={()=>addItem(prod.id)}>
                        <div className = 'prodbutton' >
                            <h3>{prod.name}   </h3>
                            Price: {prod.price} <br/>
                            Stock: {prod.stock}
                            {/* <Button onClick ={()=>addItem(prod.id)} >Add</Button> */}
                        </div>
                    </div>
                 </GridColumn>)

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
        <React.Fragment>
        <div className='prodset'>
            <GridRow warp='nowrap '>
            {items? makeGrid():null}
            </GridRow>
        </div>
        </React.Fragment>
    )
}

export default Prods
