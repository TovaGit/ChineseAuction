import React, { useEffect, useState ,useRef} from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useUserContext } from './UserContext';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import {useNumOfPurchasesContext} from './NumOfPurchasesContex'
import { Toast } from 'primereact/toast';

const Cart = ({  }) => {
const { user ,setUser} = useUserContext();
const [products, setProducts] = useState([]);
const {numOfPurch,setNumOfPurch}=useNumOfPurchasesContext()
const [totalForCart,setTotalForCart]=useState(0);
const toast = useRef(null);


const CheckOut=async()=>
    {
        if(products){
            try{
                const response = await axios.put("http://localhost:5015/Purchases/CheckOut",products)
                if(response.status===200){
                    setNumOfPurch(0)
                    alert('thank you')}
            }
            catch (error) {
                console.error('Error cheking out gifts:', error);
        }}
        
    }
const upDateMinus=async(prod)=>
    {
        try{
            const response = await axios.put(`http://localhost:5015/Purchases/Update/${user.Id}/${prod.giftId}`);
            setProducts(response.data.slice(0, 40)) 
        }
        catch (error) {
            console.error('Error upDateMinus:', error);
    }
    }
const UpDatePlus=async(prod)=>
    {
        try{
            const response = await axios.put(`http://localhost:5015/Purchases/UpdateMinus/${user.Id}/${prod.giftId}`);
            setProducts(response.data.slice(0, 40))   
             }
            catch (error) {
                console.error('Error UpDatePlus:', error);
        }
    }
    const deleteProduct=async(prod)=>
        {
            try{
                const response = await axios.delete(`http://localhost:5015/Purchases/Delete/${prod.purchaseNumber}`)
                if(response.status===200)
                    {
                        setNumOfPurch(numOfPurch-1)
                        toast.current.show({ severity: 'danger', summary: 'Deleted', detail: `${prod.giftName} Deleted` })

                    }
            }
            catch (error) {
                console.error('Error deleting product:', error);
        }
        }
useEffect(() => {
    const prod = async () => {
        if(user.Id!=null){
        try{
            const response = await axios.get(`http://localhost:5015/Purchases/GetPuchasesByUserId/${user.Id}`);
            setProducts(response.data.slice(0, 40));   
         }
            catch (error) {
                console.error('Error GetPuchasesByUserId:', error);
        }}
    }
    const TotalPaymentInCartForUser=async()=>
        {
            if(user.Id!=null){
            const res=await axios.get(`http://localhost:5015/Purchases/TotalPaymentInCartForUser/${user.Id}`)
            setTotalForCart(res.data)}
        }
        TotalPaymentInCartForUser()
    prod();

}, [products],[deleteProduct]);



const itemTemplate = (product, index) => {
    return (
<div style={{backgroundColor:'black'}} className="col-12 p-2" key={product.purchaseNumber}>
    <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-3 gap-4 border-top-1 surface-border ')} style={{ position: 'relative' }}>
        <img style={{ objectFit: 'cover', height: '120px' }} className="w-5 shadow-2 border-round" src={`images/${product.giftName}.jpg`} alt={product.giftName} />
        <div style={{ color: '#3FBC5F' }} className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-6">
                <div>
                    <div>
                        <span style={{ color: '#3FBC5F' }}>{product.giftName}</span>
                    </div>
                    <span style={{ color: '#E89D3D' }}>{product.ticketPrice} $</span>
                </div>
                <div className="flex align-items-center" style={{color:'#4472C4'}}>
                    <Button style={{ fontSize: '5px' ,color:'#4472C4'}} icon="pi pi-minus" rounded text aria-label="Filter" onClick={()=>UpDatePlus(product)}/>
                    <Tag value={product.amountOfTickets} style={{color:'#4472C4'}}/>
                    <Button icon="pi pi-plus" rounded text aria-label="Filter" onClick={()=>upDateMinus(product)} style={{color:'#4472C4'}}/>
                </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                <span className="text-2xl font-semibold">${product.totalPrice}</span>
            </div>
            <Button onClick={()=>{deleteProduct(product)}}style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'black', border: 'solid #F94561', color: '#F94561' }} icon="pi pi-trash" className="p-button-rounded"></Button>
        </div>
    </div>
</div>


    );
};


const listTemplate = (items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((product, index) => {
        return itemTemplate(product, index);
    });

    return <div className="grid grid-nogutter">{list}</div>;
};

return (
    <>    <Toast ref={toast} position="top-center"/>
<div className="card">
        <DataView value={products} listTemplate={listTemplate}  />
    </div>
    <div style={{color:'#F94561'}}>Total Payment {totalForCart}$</div>
    <Button style={{backgroundColor:'white',color:'black'}} onClick={products.length!=0?CheckOut:''}>CheckOut</Button>

    </>
)
}
export default Cart;
