import CartButton from './CartButton'
import ChangePriceB from './ChangePriceB'
import React from 'react'

function CartSet({items, removeItem, changePrice}) {

    class Popup extends React.Component {
        render() {
          return (
            <div className='popup'>
              <div className='popup_inner'>
                <h1>Kiss</h1>
              <button onClick={this.props.closePopup}>close me</button>
              </div>
            </div>
          );
        }
      }


    return (
        <div className='cartset'> 
             { 
                items.map((item) => 
                (
                <div key = {item.id} 
                    className = 'cartbutton'
                    >
                    <h3>{item.name}</h3> 
                    <CartButton item = {item} 
                        removeItem = {removeItem}
                        changeItem = {changePrice}/>
                    {/* <ChangePriceB item = {item} changePrice = {changePrice}/> */}
                </div>            
                )) 
            }
        </div>
    )
}

export default CartSet
