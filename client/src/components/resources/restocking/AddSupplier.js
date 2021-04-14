import { useState } from 'react'

const  AddSupplier = ({pushTop}) => {


    const onSubmit = (e) => {
        e.preventDefault()

        if(name == ''){
            alert('Add prod name please')
            return 
        } else if (cui == ''){
            alert('Add prod CUI please')
            return 
        } else if (orc == ''){
            alert('Add prod CUI please')
            return 
        }else if (address == ''){
            alert('Add an Adress please')
            return 
        }else if (bank == ''){
            alert('Add a Bank name please')
            return 
        }else if (iban == ''){
            alert('Add correct IBAN please')
            return 
        }

        pushTop({name, cui, orc, address, bank, iban})
        
        setName('')
        setCui('')
        setOrc('')
        setAddress('')
        setBank('')
        setIban('')
        
    }
        //furnizor
        
      const [name, setName] = useState('')
      const [cui, setCui] = useState('')
      const [orc, setOrc] = useState('') 
      const [address, setAddress] = useState('')
      const [bank, setBank] = useState('')
      const [iban, setIban] = useState('')
    
        return (
            <div className= 'ScreenElement'>
        <form className='add-form-supplier' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Name</label>
                <input
                type='text'
                placeholder='Add Supplier name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className='form-control'>
                <label>CUI</label>
                <input
                type='text'
                placeholder='uniq CUI'
                value={cui}
                onChange={(e) => setCui(e.currentTarget.value)}
                />
            </div>

            <div className='form-control'>
                <label>ORC</label>
                <input
                type='text'
                placeholder='lamo'
                value={orc}
                onChange={(e) => setOrc(e.currentTarget.value)}
                />
            </div>
            
            <div className='form-control'>
                <label>Address</label>
                <input
                type='text'
                placeholder='your moms '
                value={address}
                onChange={(e) => setAddress(e.currentTarget.value)}
                />
            </div>
            
            <div className='form-control'>
                <label>Bank</label>
                <input
                type='text'
                placeholder='ex: BRD'
                value={bank}
                onChange={(e) => setBank(e.currentTarget.value)}
                />
            </div>

            <div className='form-control'>
                <label>Bank IBAN</label>
                <input
                type='text'
                placeholder='RO00BRD0123456'
                value={iban}
                onChange={(e) => setIban(e.currentTarget.value)}
                />
            </div>
    
            <input type='submit' value='Save Product' className='btn btn-block' width = '50px' />
        </form>
        </div>
        )
}

export default AddSupplier
