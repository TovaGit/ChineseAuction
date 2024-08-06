import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import axios from "axios";

const Gifts=()=>
{
    let emptyProduct = {
        name: '',
        categoryId: null,
        donorId: null,
        price: 0,
    };
    const [products, setProducts] = useState(null);
    const [category, setCategories] = useState(null);
    const [donors, setDonors] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [value, setValue] = useState(0);

    const toast = useRef(null);
    const dt = useRef(null);
    const fetchData = async () => {
        try {
             const response = await axios.get("http://localhost:5015/Gift");
             if (response.status === 200) {
                 setProducts(response.data);
             }
         } catch (error) {
             console.error('Error fetching gifts:', error);
         }
         try {
            const response = await axios.get("http://localhost:5015/Category/GetAllCatigories");
            if (response.status === 200) {
              setCategories(response.data)
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        try{
            axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
            const response = await axios.get("http://localhost:5015/Donor");
            if(response.status===200)
            setDonors(response.data)
        }
        catch (error) {
            console.error('Error fetching donors:', error);
        }
        }
    useEffect(() => {
        
             fetchData()
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = async() => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (product.giftId) {
                const index = findIndexById(product.giftId);

                _products[index] = _product;
                try{
            axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
            const response = await axios.put(`http://localhost:5015/Gift/edit/${product.giftId}`,{
                name: product.name,
                donorId: product.donorId,
                categoryId: product.categoryId,
                price: product.price
            });
               }
            catch (error) {
                console.error('Error edit :', error);
            }
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
               // _product.image = 'product-placeholder.svg';
                try{
                    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
                    const response = await axios.post(`http://localhost:5015/Gift`,{
                        name: product.name,
                        donorId: product.donorId,
                        categoryId: product.categoryId,
                        price: product.price
                    });}
                    catch(error){ console.error('Error new gift:', error);}
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = async(product) => {

      
       setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = async(rowData) => {
       setProduct(rowData)
        setDeleteProductDialog(true);
    };

    const deleteProduct = async() => {
        let _products = products.filter((val) => val.giftId !== product.giftId);
        try{
            axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
            const response = await axios.delete(`http://localhost:5015/DeleteById/${product.giftId}`);
            if(response.status===200)
              setProducts({ ..._products });
        }
        catch (error) {
            console.error('Error deleting gift:', error);
        }
       
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].giftId === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    


    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));

        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };
        const categoryObj =category.find((i)=>i.name===e.value)
        _product['categoryId'] = categoryObj.categoryId;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };
const setDonorFilter=async(e)=>
{
    try{
        if(e!=''){
        axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
        const response = await axios.get(`http://localhost:5015/GetGiftsByDonorName/${e}`);
        if(response.status===200)
          setProducts(response.data);}
        else{
            fetchData()
        }
    }
    catch(error)
    {
        console.error('Error GetGiftsByDonorName :', error);

    }
}
const ByAmountOfBuyers=async(num)=>
{
    try{
        if(num!=0){
        axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
        const response = await axios.get(`http://localhost:5015/GetGiftsByAmountOfBuyers/${num}`);
        if(response.status===200)
          setProducts(response.data);}
        else{
            fetchData()
        }
    }
    catch(error)
    {
        console.error('Error GetGiftsByDonorName :', error);

    }
}
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} style={{backgroundColor:'#3FBC5F',borderBlockColor:'#3FBC5F'}}/>
            </div>
        );
    };
    const imageBodyTemplate = (rowData) => {
        return <img src={`images/${rowData.name}.jpg`} alt={rowData.name} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };
const categoryBodyTemplate=(rowData)=>
    {
        if(category){
        const categoryName =category.find((e)=>e.categoryId===rowData.categoryId)?.name
         return categoryName}
         return rowData.categoryId
    }
    const donorBodyTemplate=(rowData)=>
        {
            if(donors){
            const donorsName =donors.find((e)=>e.donorId===rowData.donorId)?.fullName
             return donorsName}
             return rowData.donorId
        }
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };



    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} style={{backgroundColor:'#E89D3D',color:'black',borderkColor:'#4472C4'}}/>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)}style={{backgroundColor:'#F94561',color:'black'}} />
            </React.Fragment>
        );
    };

    
    const header = (
    <>
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            {leftToolbarTemplate()}
            <IconField iconPosition="left" style={{border: '2px solid #3FBC5F',borderRadius:'5px'}}>
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search By Gift Name..." />
            </IconField>
            <IconField iconPosition="left" style={{border: '2px solid #3FBC5F',borderRadius:'5px'}}>
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setDonorFilter(e.target.value)} placeholder="Search By Donor Name..." />
            </IconField>
        <label style={{width:'150px'}}htmlFor="minmax-buttons" className="font-bold block mb-2">Amout of purchases for gift</label>
        <InputNumber style={{border: '2px solid #3FBC5F',borderRadius:'5px'}} inputId="minmax-buttons" value={value} onValueChange={(e) =>  {setValue(e.value) ;ByAmountOfBuyers(e.value)}} mode="decimal" showButtons min={0} max={10000} />
        </div></>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div style={{marginTop:'2%'}}>
            <Toast ref={toast} />
            <div className="card" >
                <DataTable   ref={dt} value={products} style={{border: '2px solid #4472C4'}}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column field="giftId" header="GiftId" sortable style={{ minWidth: '8rem' ,thead:"red"}}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate} style={{ minWidth: '10rem' }}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column header="Category" body={categoryBodyTemplate}sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="donorId" header="Doner"  body={donorBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>

                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="donorId" className="font-bold">
                        DonorId
                    </label>
                    <InputText id="donorId" value={product.donorId} onChange={(e) => onInputChange(e, 'donorId')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.donorId })} />
                    {submitted && !product.donorId && <small className="p-error">DonorId is required.</small>}
                </div>
                
                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-5" >
                        {category ? (
                category.map((categoryItem) => (<>
                <RadioButton inputId={categoryItem.categoryId} name="category" value={categoryItem.name} onChange={onCategoryChange} checked={product.categoryId === categoryItem.categoryId} style={{display:'grid'}}/>
                <label htmlFor={categoryItem.categoryId}>{categoryItem.name}</label>
                </>
                ))
                ) : (
                <p>Loading categories...</p> // Placeholder while categories are loading
                )}
                        </div>
                        </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );

        
}
export default Gifts