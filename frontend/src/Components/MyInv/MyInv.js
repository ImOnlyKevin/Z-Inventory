import { useEffect, useState } from "react"
import './MyInv.css'
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../helpers";
import pencil from '../../svgs/pencil.svg'
import trash from '../../svgs/trash.svg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const MyInv = () => {
    const navigate = useNavigate()
    const username = document.cookie.split('; ').find(row => row.startsWith('username='))?.split('=')[1].split(' ')[0];

    const [ inventory, setInventory ] = useState()
    const [ update, setUpdate ] = useState()
    const [ addToggle, setAddToggle ] = useState(false)

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/')
          }
        //fetch inventory
        fetch(`http://localhost:3001/myinv/${username}`)
            .then(res => res.json())
            .then(data => {
                setInventory(data)
            })
    }, [update])


    const handleDecrement = (item) => {
        fetch(`http://localhost:3001/myinv/dec`, {
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
                    setUpdate(!update)
                }
            })
    }

    const handleIncrement = (item) => {
        fetch(`http://localhost:3001/myinv/inc`, {
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
                    setUpdate(!update)
                }
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3001/myinv`, {
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
                    setAddToggle(false)
                    setUpdate(!update)
                }
            })
    }

    const handleAdd = () => {
        if (addToggle) {
            return (
                <form onSubmit={handleSubmit} className="addItemForm">
                    <h3>Add Item</h3>
                    <input type="text" name='item' placeholder="item" required/>
                    <textarea type="text" name='description' placeholder="description" required/>
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

    const handleDelete = (item) => {
        fetch(`http://localhost:3001/myinv`, {
            method: 'DELETE',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json" 
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(`Deleted ${data.name}`)
                    setUpdate(!update)
                }
            })
    }


    return (
        <div className="invContainer">
            {inventory?.map(item => {
                return (
                    <div key={item.id} className="item">
                        <p onClick={() => {navigate('/myinv/item', {state: {item: item, edit: false}})}}><strong>{item.item}</strong></p>
                        {item.description.length > 100 ? <p>{item.description.substring(0,100)}...</p> : <p>{item.description}</p>}
                        <p>Quantity: {item.quantity}</p>
                        <div className="btnDiv">
                            <button onClick={() => {handleIncrement(item)}} className="itemBtn">+</button>
                            <button onClick={() => {handleDecrement(item)}} className="itemBtn">-</button>
                            <button onClick={() => {navigate('/myinv/item', {state: {item: item, edit: true}})}} className="itemBtn"><img className="edit" src={pencil} alt="" /></button>
                            <button onClick={() => {handleDelete(item)}} className="itemBtn"><img className="edit" src={trash} alt="" /></button>
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

export default MyInv