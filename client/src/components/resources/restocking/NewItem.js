import { useState, useEffect, useContext } from 'react'

import { Autocomplete } from '@material-ui/lab'
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import Switch from '@material-ui/core/Switch'
import { makeStyles } from '@material-ui/core/styles'


import { BsQuestionDiamond } from 'react-icons/bs'

import AutoCompAddItem from './AutoCompAddItem'
import { fetchProds, addItem } from '../../DBconn'
import { MyContext } from  '../../../App'


import { GridRow, GridColumn } from 'emotion-flex-grid'
import ShowProduct from '../../../containers/products/ShowProduct'
import OrangePaper from '../../../containers/papers/OrangePaper'
import { Button, Modal } from '@material-ui/core'
import { FiCheckSquare } from 'react-icons/fi'
import ScannedBarcode from '../../bar/ScannedBarcode'

function NewItem() {
    const [prods, setProds] = useState([])
    const [uniqueTypes, setUniqueTypes] = useState([])
    const [open, setOpen] = useState(false)
    const [crtItem, setCrtItem] = useState(emptyItem)
    

    const cx = useContext(MyContext)
    const C = useStyles()

    useEffect(()=>{
        const gett = async () => {
            const inprods = await fetchProds()
            setProds(inprods)

            var types = inprods.map((elem)=>{return elem.type}).filter((el) => el != 'Service')
            types = types.filter((elem, index)=> { return types.indexOf(elem) == index})
            var auxtypes = types.map(el => {
                var vat = inprods.filter(e=>e.type == el)
                return {name: el , vat: vat[0].vat}
            })
            setUniqueTypes(auxtypes)
            // console.log(auxtypes)    
        }
        gett()  
    },[])


    const openInfo = () => {
        const aux = cx.lg=='en'?imageInstructionsEN:imageInstructionsRO
        alert(aux)
    }
    // useEffect(()=>{
    //     console.log(prods)
    // },[prods])

    const onSubmit = (e) => {
        e.preventDefault()   

        // pushTop({name, type, price, vat})
        // console.log(crtItem)
        addItem(crtItem)
        setCrtItem(emptyItem)
    }


    const setTypeandVAT = (itemtyvat) => {
        setCrtItem({...crtItem, type: itemtyvat.name, vat: itemtyvat.vat})
        // console.log(JSON.stringify(itemtyvat) + ' in newItem')
    }

    const scannedBarrCode = (scanned) => {
        // console.log(scanned)
        setCrtItem({...crtItem, barcode: scanned})
    }


    return (
        <div className= 'ScreenElement'>
            <h6>{cx.lg=='en'? 'Add new product':'Adauga produs nou'}</h6>
        <form className='add-form' onSubmit={onSubmit}>
            <GridRow >
                <GridColumn width={6} p='xxl'>

                <GridRow direction = 'column' align='center'>
                    <GridColumn p='l'>
                        <h3>{cx.lg=='en'? 'Product Name':'Nume Produs'}</h3>
                    </GridColumn>
                    <GridColumn p='l'>
                        <h3>{cx.lg=='en'? 'Price':'Pret'}</h3>
                    </GridColumn>
                    <GridColumn p='l'>
                        <h3>{cx.lg=='en'? 'Product Type and VAT ':'Tip produs si TVA'}</h3>
                    </GridColumn>
                    <GridColumn p='xl'>
                        <h3>{cx.lg=='en'? 'Product Barcode ':'Cod de bare '}</h3>
                    </GridColumn>
                    <GridColumn p='l' mt='l'>
                        <h3>{cx.lg=='en'? 'Product Image ':'Imagine Produs'}</h3>
                        <Button 
                            startIcon={<BsQuestionDiamond/>}
                            onClick={openInfo}
                            />
                    </GridColumn>
                    <GridColumn p='m'>
                        <h3>{cx.lg=='en'? 'Fixed Price?':'Pret Fix?'}</h3>
                    </GridColumn>    
                    <GridColumn p='m'>        
                        <Switch
                            checked={crtItem.fixedPrice}
                            onChange={(e) => setCrtItem({...crtItem, fixedPrice: e.target.checked })}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </GridColumn>

                    <GridColumn p='m' offset={20}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            size='large'
                            startIcon={<FiCheckSquare/>}
                            onClick={onSubmit}
                            >
                            {cx.lg=='en'?'Add Item': 'Adauga Produs'}
                        </Button>
                    </GridColumn>
                </GridRow>
            </GridColumn>

            <GridColumn p='xxl'>
                <GridRow direction = 'column' align='center'>
                    <GridColumn p='m'>
                        <Input 
                            type='text'
                            value={crtItem.name}
                            error={crtItem.name.length < 2}
                            onChange={(e) => setCrtItem({...crtItem, name: e.currentTarget.value})}
                        />
                    </GridColumn>
                    <GridColumn p='m'>
                        <Input 
                            type='number'
                            inputProps={{min: 1, style: { textAlign: 'center' }}}
                            value={crtItem.price}
                            error={crtItem.price < 1}
                            onChange={(e) => setCrtItem({...crtItem, price: e.currentTarget.value})}
                        />
                    </GridColumn>

                    <GridColumn p='m'>
                        <AutoCompAddItem 
                            open = {open} setOpen = {setOpen}
                            types= {uniqueTypes}
                            upValue={setTypeandVAT}
                            />
                    </GridColumn>

                    <GridColumn p='l'>
                        <ScannedBarcode
                            styling = {C.scanner}
                             upScanned = {scannedBarrCode} 
                        />
                    </GridColumn>

                    <GridColumn p='m'>
                        <Input 
                            type='text'
                            value={crtItem.image}
                            onChange={(e) => setCrtItem({...crtItem, image: e.currentTarget.value})}
                        />
                    </GridColumn>
                    
                    <GridColumn p='m'>
                        <img width = {110} height={110} 
                            src={crtItem.image==''?
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpyx9AbdQE6YZ6lm5IAXeDtOz7wbSiXskAVekYJAsvVMQVsOXUquOrex5Rt9qArV6tojs&usqp=CAU':crtItem.image}
                            />
                    </GridColumn>         
                </GridRow>
            </GridColumn>


            <GridColumn width={6} align='center' p='xxl'>
                <OrangePaper height = {750}>
                    <ShowProduct item = {crtItem}/>
                </OrangePaper>
            </GridColumn>
            </GridRow>
            
        </form>


        </div>
    )
}

const emptyItem = {
    name: '',
    type: '',
    vat: '',
    price: 0,
    stock: 0,
    fixedPrice: true, 
    fav: false,
    image: '',
}

const imageInstructionsEN='Find an image you want on google, right click on it and select "Copy image address" \nPaste the link in the box(right-hand side) and you are done!'

const imageInstructionsRO='Gaseste o imagine care ai vrea pe google. Click dreapta pe ea si selecteaza "Copy image address" \nApasa "Paste" in cutia de text din dreapta si gata!'

const useStyles = makeStyles({

    infolilbox:{
        width: 200,

    },
    infobox:{
        width: 10,
    },

    scanner:{
        borderStyle: 'solid',
        borderColor: 'pink',
    },

    root:{
        position: 'absolute',
        left: '12%',
        top: '8%',
    },
  });


export default NewItem


          