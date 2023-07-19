import { useEffect, useState } from "react"
import './Inventory.css'
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../helpers";

const Inventory = () => {
    const navigate = useNavigate()
    const username = document.cookie.split('; ').find(row => row.startsWith('username='))?.split('=')[1].split(' ')[0];

    const [ inventory, setInventory ] = useState()
    const [ addToggle, setAddToggle ] = useState(false)

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/splash')
          }
        //fetch inventory
        fetch(`http://localhost:3001/inventory/${username}`)
            .then(res => res.json())
            .then(data => {
                setInventory(data)
            })
    })


    const handleDecrement = (item) => {
        fetch(`http://localhost:3001/inventory/dec`, {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json" 
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(`Decremented ${item.item} by ${data}`)
                }
            })
    }

    const handleIncrement = (item) => {
        fetch(`http://localhost:3001/inventory/inc`, {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json" 
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(`Incremented ${item.item} by ${data}`)
                }
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3001/inventory`, {
            method: 'POST',
            body: JSON.stringify({
                item: e.target.item.value,
                description: e.target.description.value,
                quantity: e.target.quantity.value,
                username: username
            }),
            headers: {
                "Content-Type": "application/json" 
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(data)
                    setAddToggle(false)
                }
            })
    }

    const handleAdd = () => {
        if (addToggle) {
            return (
                <form onSubmit={handleSubmit} className="addItemForm">
                    <h3>Add Item</h3>
                    <input type="text" name='item' placeholder="item" required/>
                    <input type="text" name='description' placeholder="description" required/>
                    <input type="number" name='quantity' placeholder="quantity" required/>
                    <div>
                        <button type='submit'>Add Item</button>
                        <button onClick={() => setAddToggle(false)}>Cancel</button>
                    </div>
                </form>
            )
        } else {
            return <button onClick={() => setAddToggle(true)} className="toggleBtn">+</button>
        }
    }

    return (
        <div className="invContainer">
            {inventory?.map(item => {
                return (
                    <div key={item.id} className="item">
                        <p><strong>{item.item}</strong></p>
                        {item.description.length > 100 ? <p>{item.description.substring(0,100)}...</p> : <p>{item.description}</p>}
                        <p>Quantity: {item.quantity}</p>
                        <div>
                            <button onClick={() => {handleIncrement(item)}} className="itemBtn">+</button>
                            <button onClick={() => {handleDecrement(item)}} className="itemBtn">-</button>
                        </div>
                    </div>
                )
            })}
            <div className="addItem">
                {handleAdd()}
            </div>
        </div>
    )
}

export default Inventory