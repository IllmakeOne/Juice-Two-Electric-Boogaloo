import { useEffect } from 'react'
import { Button  } from '@material-ui/core';


const dummyItems=[
    {
        name:'fanta',
        price: 6,
        stock: 1
    },
    {
        name:'cola',
        price: 6,
        stock: 10
    },
    {
        name:'apa',
        price: 5,
        stock: 5
    },
]

export default function Bill() {


    var recipt = 'CF^RO 123456\n'


    /**
     * 
     * @param {*} items ={ name, price, stock}
     */
    const AddItemstoBill = (items) =>{
        // S^ARTICOL 1^600^1000^buc^1^1
        var ret = ''
        items.forEach( item => {
            ret +='S^' + item.name + '^'
                + item.price*100 + '^'
                + item.stock*1000 + '^'
                + '1^1\n'
        });
        recipt += ret
        // console.log(recipt)
    }

    /**
     * cash is the cash amount paid
     * card is the card amount paid
     */
    const AddPaymenttoBill = ({cash, card}) =>{
        var ret = ''
        if (cash != 0 )
            ret += 'P^1^' + cash*100 + '\n'
        if (card != 0 )
            ret += 'P^2^' + card*100 + '\n'

        recipt+=ret
        // console.log(recipt)
    }

    const makeDummyRecipt = () =>{
        AddItemstoBill(dummyItems)
        AddPaymenttoBill({cash:19, card:10})
        recipt+='ST^\nTL^\nTL^' //subtotal + empty row + empty row
        console.log(recipt)
    }

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1>{recipt}</h1>
            
            <Button className = 'dab'
                variant="outline-primary" 
                onClick ={()=>makeDummyRecipt()}
                >
                Trat
                    
            </Button>
                
        </div>
    )
}
