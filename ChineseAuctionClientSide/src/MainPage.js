import React, { useState,useEffect,useRef } from "react";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import axios from "axios";
import { useParams } from "react-router-dom";
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import './MainPage.css'
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import { Menubar } from 'primereact/menubar';
import 'primeicons/primeicons.css';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Badge } from 'primereact/badge';
import './flags.css'
import { InputNumber } from 'primereact/inputnumber';
import { CascadeSelect } from 'primereact/cascadeselect';
import Login from "./login";
import { useUserContext } from './UserContext';
import { Sidebar } from 'primereact/sidebar';
import Cart from "./Cart";
import { useLoginContext } from "./LoginContex";
import { Dropdown } from 'primereact/dropdown';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import {useNumOfPurchasesContext} from './NumOfPurchasesContex'
import Manager from'./Manager'
import { Toast } from 'primereact/toast';
import Raffle from "./Raffle";
const MainPage = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0'); // Day with leading zero
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month with leading zero (0-indexed)
  const yyyy = today.getFullYear();

  const formattedDate = `${mm}/${dd}/${yyyy}`;     const { jwtDecode } = require('jwt-decode');
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [value2, setValue2] = useState(1);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState(['#4472C4','#3FBC5F','#F94561','#E89D3D']);
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedSort, setSelectedSort] = useState(null);
    const [userName,setUserName]=useState(null)
    const { user ,setUser} = useUserContext();
    const {numOfPurch,setNumOfPurch}=useNumOfPurchasesContext()
    const [inCart,setInCart]=useState(false);
    const [visibleRight, setVisibleRight] = useState(false);
    const {login,setLogin} = useLoginContext();
    const [isManager,setIsManager]= useState(null)
  
    const toast = useRef(null);
        const sorts = [
        {
            name: 'price: high to low',
        },
        {
            name: 'price: low to high',
        }
    ];
    
    const handleClick = async(category) => {
      if (category === 'כל הקטגוריות') {
        setActiveCategory(null);
      } else {
        setActiveCategory(category);
      }

        let url
        if(category=='all')
          url="http://localhost:5015/Gift"
        else
          url=`http://localhost:5015/GetGiftsByCategory/${category}`
          try {
        const response = await axios.get(url)
        if (response.status === 200) {
            setProducts(response.data.slice(0, 40));
        }
    } catch (error) {
        console.error('Error fetching gifts:', error);
    }
    };
    const handleSortChange = (e) => {
      setSelectedSort(e);
      if(e.name==='price: high to low')
      SortHighToLow();
    if(e.name==='price: low to high')
    SortLowTohigh()


    };
    const addToCart=async(product)=>{
      try{
      const res = await axios.get(`http://localhost:5015/Purchases/CheckIfProductIsInCart/${user.Id}/${product.giftId}`)
      if (res.status === 200) {
          if(res.data)
            {
              setInCart(true)
              const response = await axios.put(`http://localhost:5015/Purchases/Update/${user.Id}/${product.giftId}`)
              if(response.status===200)
                {
                  toast.current.show({ severity: 'success', summary: 'Item In Cart', detail: `${product.name} Updated +1`})
                }
            }
            else{
              setInCart(true)
              const response = await axios.post("http://localhost:5015/Purchases/Add",{
                userId:user.Id,
                giftId: product.giftId,
                amountOfTickets: 1
              })
              if(response.status===200){
                setNumOfPurch(numOfPurch+1)
              toast.current.show({ severity: 'success', summary: 'New Item', detail: `${product.name} added` })}
            }
          }
              
          }  catch (error) {
                console.error('Error fetching gifts:', error);
            }
    }
    const fetchData = async () => {
      try {
           const response = await axios.get("http://localhost:5015/Gift");
           if (response.status === 200) {
               setProducts(response.data.slice(0, 40));
           }
       } catch (error) {
           console.error('Error fetching gifts:', error);
       }
       try {
         const response = await axios.get("http://localhost:5015/Category/GetAllCatigories");
         if (response.status === 200) {
           const giftNames = await response.data.map((gift) => gift.name);
           setCategories(giftNames)
         }
     } catch (error) {
         console.error('Error fetching gifts:', error);
     }
   };
    const SortLowTohigh=async()=>
      {
        try{
          const response = await axios.get('http://localhost:5015/SortByPriceLowToHigh');
          if (response.status === 200) 
            setProducts(response.data.slice(0, 40))     
          }
          catch (error) {
            console.error('Error fetching gifts:', error);
        }
      }
      const SortHighToLow=async()=>
        {
          try{
            const response = await axios.get('http://localhost:5015/SortByPriceHighToLow');
            if (response.status === 200) 
              setProducts(response.data.slice(0, 40))     
            }
            catch (error) {
              console.error('Error fetching gifts:', error);
          }
        }
        const input=async(e)=>
          {
            if(e.target.value!=''){
            try{
              const response = await axios.get(`http://localhost:5015/GetGiftsByName/${e.target.value}`);

              if (response.status === 200) 
                setProducts(response.data.slice(0, 40))     
              }
              catch (error) {
                console.error('Error fetching gifts:', error);
            }
          }
            else{
          fetchData()
            }
          }
    useEffect(() => {
      if(!user){
        if(sessionStorage.getItem('token'))
      {setUser(sessionStorage.getItem('token')?jwtDecode(sessionStorage.getItem('token')):userName)
      }
if(sessionStorage.getItem('token')&&!isManager)
  {
    {setIsManager(jwtDecode(sessionStorage.getItem('token')).role)}}

  }
      
      const numOfP = async () => {
        try{
          const response = await axios.get(`http://localhost:5015/Purchases/GetPuchasesByUserId/${user.Id}`);
          if (response.status === 200) {
            console.log(numOfPurch)
              setNumOfPurch(response.data.length)}
            }
          catch (error) {
            console.error('Error getting purcheses:', error);
        }
      }
      fetchData();
      if(user){
        numOfP()
      }
  }, [user],[isManager]);
  const handleLoginDialogClose = () => {
    setLogin(false);
};
  const gridItem = (product) => {
      return (
          <div style={{backgroundColor:'black'}} className="col-6 sm:col-6 lg:col-6 xl:col-3 p-8 reduced-line-spacing " key={product.id}>
              <div style={{width:'350px',border:'solid #4472C4'}}  className=" p-1 border-1   " >
                  <div className="flex flex-wrap align-items-center justify-content-between gap-4">
                      <div className="flex align-items-center gap-2">
                          <i style={{fontSize:'20px',color:'#E89D3D'}} className="pi pi-tag"></i>
                          <span style={{fontSize:'20px',color:'#E89D3D'}} className="font-semibold">{product.categoryId}</span>
                      </div>
                  </div >
                  <div className="flex flex-column align-items-center gap-5 py-5">
                      <img style={{objectFit:'cover',height:'250px', border: '4px solid '}} className="w-11 shadow-2 "    src={`images/${product.name}.jpg`} alt={product.name} />
                      <div  className="w-11 flex align-items-center justify-content-between">
                      <div style={{color:'#3FBC5F'}}className="text-1xl ">{product.name}</div>
                      <div style={{color:'#3FBC5F'}} className="text-3xl font-semibold">${product.price}</div>
                      </div>
                      {/* {
                        
                            user?(getProductsByUser(user.Id)===0?<Button onClick={()=>{user?addToCart(product.giftId):setLogin(true)} } style={{borderColor:'#F94561',color:'#F94561',borderRadius:'0'}}label="Add to cart" severity="danger" outlined />:
                            <InputNumber value={value2} onValueChange={(e) => setValue2(e.value)} showButtons buttonLayout="horizontal" step={1}
                    decrementButtonClassName="p-button custom-decrement-button" incrementButtonClassName="p-button custom-increment-button" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    inputClassName="custom-input-field" />):<Button onClick={()=>{user?addToCart(product.giftId):setLogin(true)} } style={{borderColor:'#F94561',color:'#F94561',borderRadius:'0'}}label="Add to cart" severity="danger" outlined />
                      } */}
              
                      <Button onClick={()=>{user?addToCart(product):setLogin(true)} } style={{borderColor:'#F94561',color:'#F94561',borderRadius:'0'}}label="Add to cart" severity="danger" outlined />     
                  </div>
              </div>
          </div>
      );
  };
  const itemTemplate = (product, layout, index) => {
    if (!product) {
      return;
    }
    return gridItem(product);
  };
  const listTemplate = (products, layout) => {
    return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
  };

  return (
    formattedDate==="07/050/2024"?<><Raffle/></>:
    isManager==='True'?<Manager></Manager>:<>  
    <div >  
      <div className="main-page-container">
        <Image
          src="images/logo.png"
          alt="Image"
          height="65%"
          className="logo"
        />  
      </div>
      <div style={{top: '10px', right: '10px'
       ,position:'absolute'}}>
  <Button onClick={()=>{setLogin(true)}} style={{ backgroundColor:'transparent',border: 'solid #4472C4',color:'#4472C4',width:'200px'}} icon="pi pi-user" severity="info" aria-label="User" lable="user" >{user?user.FullName:userName}</Button>
      </div>
      <div className="blue-line"></div>
      <i  
        onClick={() => setVisibleRight(true)}
        style={{
          fontSize:'50px',
          color:'#E89D3D' ,
          alignItems: 'center',
          top:'40px',
          left:'1810px'
        }}
        className="p-button-icon pi pi-shopping-cart  p-overlay-badge" 
        size="large" 
        rounded 
        text >
        <Badge value={numOfPurch} style={{backgroundColor:'#F94561'}} ></Badge>
      </i>
      </div>
      <div style={{ textAlign: 'center', backgroundColor: 'black' }}>
        <Button
          className="category"
          label="see all"
          style={{
            top: '40px',
            backgroundColor: activeCategory === 'all' ? '#E89D3D' : 'transparent',
            border: `1px solid ${activeCategory === 'all' ? '#000000' : '#E89D3D'}`,
            color: activeCategory === 'all' ? '#000000' : '#E89D3D',
            borderRadius: '0',
            width: '100px',
            height: '100px'
          }}
          onClick={() => handleClick('all')}
        >
        </Button>
        {categories.map((category, index) => (
          <Button
            className="category"
            key={category}
            label={category}
            style={{
              backgroundColor: activeCategory === category ? colors[index % colors.length] : 'transparent',
              top: '40px',
              border: `1px solid ${activeCategory === category ? '#000000' : colors[index % colors.length]}`,
              color: activeCategory === category ? '#000000' : colors[index % colors.length],
              borderRadius: '0',
              width: '100px',
              height: '100px',

            }}
            onClick={() => handleClick(category)}
          >
          </Button>
        ))}
      </div>
      <div className="card flex justify-content-left">
      

<Dropdown value={selectedSort} onChange={(e) => handleSortChange(e.value)} options={sorts} optionLabel="name" 
  style={{top:140, position: 'fixed',left: '1%',border: 'solid #3FBC5F'}} 

    placeholder="Sort by" className="w-full md:w-14rem" checkmark={true}  highlightOnSelect={false} />
<IconField iconPosition="left"  onChange={input} style={{top:2, position: 'fixed',left: '42%'}}>
    <InputIcon className="pi pi-search"> </InputIcon>
    <InputText v-model="value1" placeholder="Search" />
</IconField>
        </div>
      <div style={{ backgroundColor: 'black' }} className="card">
        <DataView value={products} listTemplate={listTemplate} layout={layout} />
      </div>
    
{login&&<Login onClose={handleLoginDialogClose} />}

      <Sidebar style={{backgroundColor:'black',width:'30%',borderLeft:'solid #E89D3D'}} visible={visibleRight} position="right" onHide={() => {setVisibleRight(false)}}>
          <Cart></Cart>
      </Sidebar>
            <Toast ref={toast}/>
           </>
  );
};

export default MainPage;