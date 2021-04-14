import { useState } from 'react'
import Input from '@material-ui/core/Input'

import useKeypress from './keypress'

import { css }  from '@emotion/css'


const Scanner = ({upScanned, image}) => {

    const [scanned, setScanned] = useState('')
    const [focused, setFocused] = useState(true)
    


    useKeypress(' ' , () => {
        focusMethod()
    });

    useKeypress('Enter' , () => {
        focusMethod()
    });

    const focusMethod = () =>{
        setFocused(true)
        document.getElementById('scanner').focus()
    }
    
    const handleScan = e => {
        setScanned(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        setScanned('')
        upScanned(scanned)
    }

    // const generate = () => {
    //     if(type == 'clintkey')
    //         return (

    //         )
    //     else 
    //         return (

    //         )
    // } style={{display: 'none'}}

    return (
        <div>
            <form  noValidate autoComplete="off" onSubmit={handleSubmit} >
                <div >
                    <label>Scanner</label>
                    <input
                        id = {'scanner'}
                        autoFocus = {true}
                        onBlur = {()=>setFocused(false)}
                        type='text'
                        placeholder='scanner'
                        value={scanned}
                        onChange={handleScan}/>
                </div>
            </form>

            <br/><br/>
            <div className={css`
                border-style: solid;
                border-width: 5px;
                border-color: ${focused? 'red':'white'}
                // width: 1000px;
                // height: 1000px;
                `}>
                <img src={image} onClick={focusMethod} style={{width:'100%', height:'100%'}}/>
            </div>
        </div>
    )
}

export default Scanner
