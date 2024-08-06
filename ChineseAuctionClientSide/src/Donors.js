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

const Donors=()=>
{
    let emptyDonor = {
        donorId:'',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    };
    const [expandedRows, setExpandedRows] = useState(null);
    const [donors, setDonors] = useState(null);
    const [donorDialog, setDonorDialog] = useState(false);
    const [deleteDonorDialog, setDeleteDonorDialog] = useState(false);
    const [donor, setDonor] = useState(emptyDonor);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [fetchedGifts, setFetchedGifts] = useState(null);

    const toast = useRef(null);
    const dt = useRef(null);
    const purchasesGift=async(id)=>
        {
            try{
                axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
                const response = await axios.get(`http://localhost:5015/Donor/GetGiftsById/${id}`);
                if (response.status === 200) {
                    return response.data
                }
            }
            catch(error)
            {
                console.error('Error purchasesFor Gift:', error);

            }
        }
    const fetchDonors = async () => {
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
             const response = await axios.get("http://localhost:5015/Donor");
             if (response.status === 200) {
                 setDonors(response.data);
                 const gifts = {};
                const giftPromises =await response.data.map(async (don) => {
                    gifts[don.donorId] = await purchasesGift(don.donorId);
                });
                
                await Promise.all(giftPromises);
                
                setFetchedGifts(gifts);
             }
         } catch (error) {
             console.error('Error fetching Donors:', error);
         }

        }
    useEffect(() => {
        
             fetchDonors()
    }, []);

    const openNew = () => {
        setDonor(emptyDonor);
        setSubmitted(false);
        setDonorDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setDonorDialog(false);
    };

    const hideDeletedonorDialog = () => {
        setDeleteDonorDialog(false);
    };

    const savedonor = async() => {
        setSubmitted(true);

            let _donors = [...donors];
            let _donor = { ...donor };

            if (donor.donorId) {
                const index = findIndexById(donor.donorId);
                _donors[index].fullName = _donor.firstName+" "+_donor.lastName;

                try{
            axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
            const response = await axios.put(`http://localhost:5015/Donor/edit/${donor.donorId}`,{
                firstname: donor.firstName,
                lastName: donor.lastName,
                email: donor.email,
                phone: donor.phone
            });
            if(response===200)
                {
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'donor Updated', life: 3000 });
                }
               }
            catch (error) {
                console.error('Error edit :', error);
            }
            } else {
                try{
                    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
                    const response = await axios.post(`http://localhost:5015/Donor`,{
                        firstname: donor.firstName,
                        lastName: donor.lastName,
                        email: donor.email,
                        phone: donor.phone
                    });                    _donor.donorId=response.data.donorId
                }
                    catch(error){ console.error('Error new gift:', error);}
                    _donor.fullName = _donor.firstName+" "+_donor.lastName;

                _donors.push(_donor);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Donor Created', life: 3000 }); 
        }
        setDonors(_donors);
        setDonorDialog(false);
        setDonor(emptyDonor);
    };

    const editDonor = async(donor) => {

      
       setDonor({ ...donor });
        setDonorDialog(true);
    };

    const confirmDeletedonor = async(rowData) => {
  
       setDonor(rowData)
        setDeleteDonorDialog(true);
        
    };

    const deleteDonor =async () => {

         let _donors = donors.filter((val) => val.donorId !== donor.donorId)
         try{
            axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
            const response = await axios.delete(`http://localhost:5015/Donor/delete/${donor.donorId}`);
            if(response.status===200){
            toast.current.show({ severity: 'success', summary: 'Successful', detail: `donor ${donor.fullName} Deleted`, life: 3000 });}

        }
        catch (error) {
            console.error('Error deleting donor:', error);
        }
        setDonors(_donors);

        setDeleteDonorDialog(false);
        setDonor(emptyDonor);
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < donors.length; i++) {
            if (donors[i].donorId === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    
     const onInputChange = (e, name) => {
        let firstName;
        let lastName
        const val = (e.target && e.target.value) || '';
        let _donor = { ...donor };
        if(_donor.fullName){
            if(name==='firstName')
                {
                    firstName=val;
                    _donor.fullName?lastName=_donor.fullName.split(" ")[1]:lastName=_donor.lastName
                    
                }
                if(name==='lastName'){
                    _donor.fullName?firstName=_donor.firstName.split(" ")[0]:firstName=_donor.lastName
                    lastName=val
                }
            const newDonor=emptyDonor
            newDonor.firstName=firstName
            newDonor.lastName=lastName
            newDonor.email=_donor.email
            newDonor.phone=_donor.phone
            newDonor.donorId=donor.donorId
            setDonor(newDonor);

        }
        else{
           _donor[`${name}`] = val;
           setDonor(_donor);

        }
    };
const setDonorFilterByName=async(e)=>
{
    try{
        if(e!=''){
        axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
        const response = await axios.get(`http://localhost:5015/Donor/GetDonorByName/${e}`);
        if(response.status===200)
          setDonors(response.data);}
        else{
            fetchDonors()
        }
    }
    catch(error)
    {
        console.error('Error GetDonorByName :', error);

    }
}
const SearchByEmail=async(e)=>
{
    try{
        if(e!=''){
        axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
        const response = await axios.get(`http://localhost:5015/Donor/GetDonorByMail/${e}`);
        if(response.status===200)
          setDonors(response.data);}
        else{
            fetchDonors()
        }
    }
    catch(error)
    {
        console.error('Error GetDonorByMail :', error);

    }
}
const SearchByDonation=async(e)=>
    {
        try{
            if(e!=''){
            axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
            const response = await axios.get(`http://localhost:5015/Donor/GetDonorByGift/${e}`);
            if(response.status===200)
              setDonors(response.data);}
            else{
                fetchDonors()
            }
        }
        catch(error)
        {
            console.error('Error GetDonorByMail :', error);
    
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

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editDonor(rowData)} style={{backgroundColor:'#E89D3D',color:'black',borderkColor:'#4472C4'}}/>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeletedonor(rowData)}style={{backgroundColor:'#F94561',color:'black'}} />
            </React.Fragment>
        );
    };

    
    const header = (
    <>
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage donors</h4>
            {leftToolbarTemplate()}
            <IconField iconPosition="left" style={{border: '2px solid #3FBC5F',borderRadius:'5px'}}>
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setDonorFilterByName(e.target.value)} placeholder="Search By Donor Name..." />
            </IconField>
            <IconField iconPosition="left" style={{border: '2px solid #3FBC5F',borderRadius:'5px'}}>
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => SearchByEmail(e.target.value)} placeholder="Search By Email ..." />
            </IconField>
            <IconField iconPosition="left" style={{border: '2px solid #3FBC5F',borderRadius:'5px'}}>
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => SearchByDonation(e.target.value)} placeholder="Search By Donation..." />
            </IconField>
        
        </div></>
    );
    const donorDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={savedonor} />
        </React.Fragment>
    );
    const deletedonorDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletedonorDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteDonor} />
        </React.Fragment>
    );
    const allowExpansion = (rowData) => {
        return fetchedGifts ? fetchedGifts[rowData.donorId]?.length || 0 : 0;
    };
    const GetImage=(rowData)=>
        {
        return <img src={`images/${rowData.name}.jpg`} alt={rowData.name} className="shadow-2 border-round" style={{ width: '64px' }} />;

        }
    const rowExpansionTemplate = (data) => {
        const gifts = fetchedGifts[data.donorId] || [];
                return (
            <div className="p-3">
                <h5 style={{color:'#3FBC5F'}}>My Donations {data.fullName}</h5>
                <DataTable value={gifts}>
                    <Column field="giftId" header="giftId" sortable></Column>
                    <Column field="name" header="GiftName" sortable></Column>
                    <Column header="Image" body={GetImage} sortable></Column>
                </DataTable>
            </div>
        );
    };
    return (
        
        <div style={{marginTop:'2%'}}>
            <Toast ref={toast} />
            <div className="card" >
                <DataTable   ref={dt} value={donors} style={{border: '2px solid #4472C4'}}
                expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}

                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} donors" globalFilter={globalFilter} header={header}>
                    <Column expander={allowExpansion} style={{ width: '5rem' }} />
                    <Column field="donorId" header="DonorId" sortable style={{ minWidth: '8rem' ,thead:"red"}}></Column>
                    <Column field="fullName" header="Name" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="email" header="Email"  sortable style={{ minWidth: '8rem' }}></Column>
                    <Column header="Phone" field="phone"sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                </DataTable>
            </div>

            <Dialog visible={donorDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="donor Details" modal className="p-fluid" footer={donorDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="firstname" className="font-bold">
                        First Name
                    </label>
                    <InputText id="firstname" value={donor.firstName?donor.firstName:donor.fullName?donor.fullName.split(" ")[0]:""} onChange={(e) => onInputChange(e, 'firstName')} required autoFocus className={classNames({ 'p-invalid': submitted && !donor.firstName })} />
                    {submitted && !donor.firstName && <small className="p-error">firstName is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="lastName" className="font-bold">
                        last Name
                    </label>
                    <InputText id="lastName" value={donor.lastName?donor.lastName:donor.fullName?donor.fullName.split(" ")[1]:""} onChange={(e) => onInputChange(e, 'lastName')} required autoFocus className={classNames({ 'p-invalid': submitted && !donor.lastName })} />
                    {submitted && !donor.lastName && <small className="p-error">lastName is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <InputText id="email" value={donor.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !donor.email })} />
                    {submitted && !donor.email && <small className="p-error">email is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="donorId" className="font-bold">
                        PhoneNumber
                    </label>
                    <InputText id="donorId" value={donor.phone} onChange={(e) => onInputChange(e, 'phone')} required autoFocus className={classNames({ 'p-invalid': submitted && !donor.phone })} />
                    {submitted && !donor.phone && <small className="p-error">phone is required.</small>}
                </div>
                
                
            </Dialog>

            <Dialog visible={deleteDonorDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletedonorDialogFooter} onHide={hideDeletedonorDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {donor && (
                        <span>
                            Are you sure you want to delete <b>{donor.fullName}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

           
        </div>
    );

        
}
export default Donors