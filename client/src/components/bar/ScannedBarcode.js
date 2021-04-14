import { Button, Input } from '@material-ui/core'
import {useState} from 'react'



function ScannedBarcode({styling, upScanned}) {
    const [scanned, setScanned] = useState('')

    const handleScan = e => {
        e.preventDefault()
        setScanned(e.target.value)
        upScanned(e.target.value)
    }

    const submit = e => {
        e.preventDefault()
        console.log(e.target.value)
        upScanned(scanned)
    }

    return (
        <div>
            <Input 
                    className={styling}
                    type='text'
                    placeholder='code'
                    value={scanned}
                    onChange={handleScan}
                />
        </div>
    )
}

export default ScannedBarcode
