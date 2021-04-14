import Checkbox from "@material-ui/core/Checkbox"
import { makeStyles } from '@material-ui/core/styles'
import { GridColumn, GridRow } from "emotion-flex-grid"
import { useContext } from 'react'
import { MyContext } from "../../App"
import { AiOutlineWarning } from 'react-icons/ai'
import { IconContext } from "react-icons";

function ShowProduct({item}) {
    const C = useStyles()
    const cx = useContext(MyContext)
    const decidelg = (en, ro) =>{
        if( cx.lg=='en')
            return en
        else 
            return ro
    }

    const Checkempty = (el)=>{
        if(el=='')
            return (
            <IconContext.Provider value={{ color: "red" }}>
                <div>
                    <AiOutlineWarning />
                </div>
            </IconContext.Provider>
            )
        else 
            return el
    }
    return (
        <div >
            <GridRow direction='column'>
                <GridColumn align='center' className='hdBS'>
                    {decidelg('Product name: ', 'Nume Produs:')}
                </GridColumn>
                <GridColumn align='center' m='s' className ='hdBB'>
                    {Checkempty(item.name)}
                </GridColumn>
                
                <GridColumn align='center'  className='hdBS'>
                    {decidelg('Product type:', 'Nume Produs:')}
                </GridColumn>
                <GridColumn align='center' m='s' className ='hdBB'>
                    {Checkempty(item.type)}
                </GridColumn>
                
                <GridColumn align='center'  className='hdBS'>
                    {decidelg('Product VAT:', 'TVA Produs:')}
                </GridColumn>
                <GridColumn align='center' m='s' className ='hdBB'>
                    {Checkempty(item.vat)}
                </GridColumn>
                
                <GridColumn align='center'  className='hdBS'>
                    {decidelg('Product Price:', 'Pret Produs:')}
                </GridColumn>
                <GridColumn align='center'm='s' className ='hdBB'>
                    {item.price}
                </GridColumn>

                <GridColumn align='center'  className='hdBS'>
                    {decidelg('Number in inventory: ', 'Numar pe stoc: ')}
                </GridColumn>
                <GridColumn align='center' m='s' className ='hdBB'>
                    {item.stock}
                </GridColumn>

                <GridColumn align='center'  className='hdBS'>
                    {decidelg('Barcode: ', 'Cod de bare: ')}
                </GridColumn>
                <GridColumn align='center' m='s' className ='hdBB'>
                    {item.barcode}
                </GridColumn>

                
                <GridColumn align='center'  className='hdBS'>
                    {decidelg('Product price fixed? (no if it is a service)', 'Pret produs fix? (nu daca este serviciu)')}
                </GridColumn>
                <GridColumn align='center' m='s'>
                <Checkbox
                    checked={item.fixedPrice}
                    // onChange={handleChange}
                    name="checkedB"
                    color="primary"
                />
                </GridColumn>

                
                <GridColumn align='center'  className='hdBS'>
                    {decidelg('Product Image: ', 'Imagine Produs:')}
                </GridColumn>
                <GridColumn align='center' m='s'>
                    <img width = {70} height={70} src={item.image==''?'https://static.thenounproject.com/png/341328-200.png':item.image} />
                </GridColumn>


            </GridRow>
            
        </div>
    )
}

const useStyles = makeStyles({

    paper: {
        boxShadow: '2px 2px 34px 7px rgb(255, 170, 86)',
        height: 400,
        width:  600,
        padding: 15,
        height: 500, 
        overflow: 'auto',
    },
  });


export default ShowProduct
