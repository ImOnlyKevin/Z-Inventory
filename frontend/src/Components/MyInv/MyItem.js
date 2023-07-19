import { useLocation, useNavigate } from "react-router-dom"
import './MyInv.css'
import { useEffect, useState } from "react"
import { isLoggedIn } from "../../helpers"
import pencil from '../../svgs/pencil.svg'
import trash from '../../svgs/trash.svg'

const MyItem = () => {
    const navigate = useNavigate()
    const username = document.cookie.split('; ').find(row => row.startsWith('username='))?.split('=')[1].split(' ')[0];
    const { item } = useLocation().state
    const { edit } = useLocation().state
    const [ inventory, setInventory ] = useState()
    const [ update, setUpdate ] = useState()

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/splash')
          }

        if (!inventory) {
            setInventory(item)
            return
        }
        //fetch inventory
        fetch(`http://localhost:3001/myinv/item/${item.id}`)
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
        fetch(`http://localhost:3001/myinv/item`, {
            method: 'PUT',
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
                    navigate('/myinv')
                }
            })
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
                    navigate('/myinv')
                }
            })
    }

    const handleEdit = () => {
        console.log('inv ', inventory)
        if (edit) {
            return (
                <div className="itemContainer">
                    <form onSubmit={handleSubmit} className="addItemForm">
                        <h3>Add Item</h3>
                        <input type="text" name='item' placeholder="item" defaultValue={inventory?.item} required/>
                        <input type="text" name='description' placeholder="description" defaultValue={inventory?.description} required/>
                        <input type="number" name='quantity' placeholder="quantity" defaultValue={inventory?.quantity} required/>
                        <div className="btnDiv">
                            <button type='submit'>Update Item</button>
                            <button onClick={() => navigate('/myinv')} className="backBtn">Back</button>
                        </div>
                    </form>
                </div>
            )
        } else {
            return (
                <>
                    <div className="itemContainer">
                        <div className="item">
                            <p><strong>{inventory?.item}</strong></p>
                            {inventory?.description.length > 100 ? <p>{inventory?.description.substring(0,100)}...</p> : <p>{inventory?.description}</p>}
                            <p>Quantity: {inventory?.quantity}</p>
                            <div className="btnDiv">
                                <button onClick={() => {handleIncrement(item)}} className="itemBtn">+</button>
                                <button onClick={() => {handleDecrement(item)}} className="itemBtn">-</button>
                                <button onClick={() => {navigate('/myinv/item', {state: {item: item, edit: true}})}} className="itemBtn"><img className="edit" src={pencil} alt="" /></button>
                                <button onClick={() => {handleDelete(item)}} className="itemBtn"><img className="edit" src={trash} alt="" /></button>
                            </div>
                        </div>
                    <button onClick={() => navigate('/myinv')} className="backBtn">Back</button>
                    </div>
                </>
            )
        }
    }

    return handleEdit()
}

export default MyItem