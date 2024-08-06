
import React, { useState, useEffect, useRef } from 'react';
import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import axios from "axios";
import { ConfirmPopup } from 'primereact/confirmpopup'; 
import { confirmPopup } from 'primereact/confirmpopup';
export default function Purchases() {
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [fetchedPurchases, setFetchedPurchases] = useState({}); // Object to store purchases for each gift
    const [buyers,setBuyers]=useState(null)
    const toast = useRef(null);
    const confirm1 = (rowData) => {
        let user;
        if(buyers){
             user =buyers.find((e)=>e.id===rowData.userId)
                     }
        confirmPopup({
            group: 'headless',
            message: <div>
                <h3 style={{color:'#F94561'}}>User Details</h3>
                <div style={{color:'#E89D3D'}}>fullName:</div> {user.fullName}<br></br>
                <div style={{color:'#E89D3D'}}>Email:</div> {user.email} <br></br>
                <div style={{color:'#E89D3D'}}>Phone:</div> {user.phone}<br></br>
            </div>,
            defaultFocus: 'accept',

        });
    };
    const FetchGifts=async()=>
    {
        try {
            const response = await axios.get("http://localhost:5015/Gift");
            if (response.status === 200) {
                setProducts(response.data.slice(0, 40));
                const productPurchases = {};
                const purchasePromises =await response.data.map(async (product) => {
                  productPurchases[product.name] = await purchasesGift(product.name);
                });
                
                await Promise.all(purchasePromises);
                
                setFetchedPurchases(productPurchases);

            }
        } catch (error) {
            console.error('Error fetching gifts:', error);
        }    
    }
    const FetchBuyers=async()=>
        {
            try{
                axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
                const response = await axios.get(`http://localhost:5015/Purchases/DetailsOfBuyers`);
                if (response.status === 200) {
                    setBuyers(response.data)
                }
            }
            catch(error)
            {
                console.error('Error DetailsOfBuyers Gift:', error);

            }
        }

    useEffect(() => {
FetchGifts()
FetchBuyers()
    }, []); 

    const expandAll = () => {
        let _expandedRows = {};

        products.forEach((p) => (_expandedRows[`${p.id}`] = true));

        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const purchasesGift=async(name)=>
        {
            try{
                axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
                const response = await axios.get(`http://localhost:5015/Purchases/PurchasesByGift/${name}`);
                if (response.status === 200) {
                    return response.data
                }
            }
            catch(error)
            {
                console.error('Error purchasesFor Gift:', error);

            }
        }
    const amountBodyTemplate = (rowData) => {
  return fetchedPurchases[rowData.name] ? formatCurrency(fetchedPurchases[rowData.name].price) : "Loading..."; // Display loading indicator
    };

    const statusOrderBodyTemplate = (rowData) => {
        return <Tag value={rowData.status.toLowerCase()}></Tag>;
    };

    const searchBodyTemplate = () => {
        return <Button icon="pi pi-search" />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`images/${rowData.name}.jpg`} alt={rowData.name} width="64px" className="shadow-4" />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

const subtrDate=(rowData)=>
    {
       return rowData?rowData.date.slice(0,10):''
    }
    const allowExpansion = (rowData) => {
        return fetchedPurchases ? fetchedPurchases[rowData.name]?.length || 0 : 0;
    };

    const SortByMostPurchasedGift=async()=>
        {
            try{
                axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
                const response = await axios.get(`http://localhost:5015/Purchases/SortByMostPurchasedGift`);
                if (response.status === 200) {
                    setProducts(response.data)
                }
            }
            catch(error)
            {
                console.error('Error SortByMostPurchasedGift :', error);

            }
        }
        const actionBodyTemplate = (rowData) => {
            return (
         <Button  onClick={()=>confirm1(rowData)} icon={'pi pi-search'} style={{color:'black',backgroundColor:'white',borderColor:'white'}}></Button> 
            );
        };
    const rowExpansionTemplate = (data) => {
        const purchases = fetchedPurchases[data.name] || [];
                return (
            <div className="p-3">
                <h5 style={{color:'#3FBC5F'}}>Orders for {data.name}</h5>
                <DataTable value={purchases}>
                    <Column field="purchaseNumber" header="PurchaseNumber" sortable></Column>
                    <Column field="userId" header="Customer" sortable></Column>
                    <Column field="date" header="Date" body={subtrDate} sortable></Column>
                    <Column field="amountOfTickets" header="AmountOfTickets"  sortable></Column>
                    <Column header="Details" body={actionBodyTemplate} ></Column>
                    <Column headerStyle={{ width: '4rem' }} ></Column>
                </DataTable>
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text style={{color:'#F94561'}}/>
            <Button icon="pi pi-sort" onClick={SortByMostPurchasedGift} style={{color:'#F94561',backgroundColor:"#161D21",borderColor:'#161D21'}}></Button>
            <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text style={{color:'#F94561'}}/>
        </div>
    );

    return (
        <div style={{marginTop:'2%'}}>
        <div className="card">
            <Toast ref={toast} />
            <DataTable style={{border: '2px solid #4472C4'}} value={products} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                     rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="id" header={header} tableStyle={{ minWidth: '45rem' }}>
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="name" header="Name" sortable />
                <Column field="price" header="Price" sortable />
                <Column header="Image" body={imageBodyTemplate} />
            </DataTable>
            <ConfirmPopup 
                group="headless" style={{ position:'relative'}}
                content={({message, hide}) => 
                    <div className="bg-gray-900 text-white border-round p-3">
                        <span>{message}</span>
                        <div className="flex align-items-center gap-2 mt-3">
                            <Button  style={{color:'#3FBC5F'}} label="Cancel" outlined onClick={() => { hide();}}className="p-button-sm p-button-text"></Button>
                        </div>
                    </div>
                }
            />

        </div></div>
    );
}
        