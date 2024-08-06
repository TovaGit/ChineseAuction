import React, { useState,useEffect,useRef } from "react";
import axios from "axios";
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Toast } from 'primereact/toast';

const Raffle=()=>
    {
        const [products, setProducts] = useState([]);
        const [layout, setLayout] = useState('grid');
        const [drawnProducts, setDrawnProducts] = useState({}); // State to track drawn products
        const [winners, setWinners] = useState([]);
        const toast = useRef(null);

        const sendEmails=async()=>
            {
                const send=async(obj)=>{
                    try {
                        const response = await axios.post("http://localhost:5015/SendEmail", {
                          email: obj.email,
                          subject: 'Congratulations',
                          message: `You won the ${obj.winningGift} in the loto Of Chinese auction!`,
                        }
                      );
                      } catch (error) {
                        console.error('Error sending email for:', obj.email, error);
                      }
                    }
                    for (const obj of winners) {
                        await send(obj)
                        console.log('Email sent successfully for:', obj.email);

                    }


                }
            
            
        const Draw=async(gift)=>
            {
                try {
                    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
                    const response = await axios.post(`http://localhost:5015/Reffle/RaffleForEeahGiftById/${gift.giftId}`);
                    if (response.status === 200) {
                        setDrawnProducts({ ...drawnProducts, [gift.name]: true }); // Update drawn state
                        toast.current.show({ severity: 'success', summary: 'Item Raffled', detail: `The Winner Of ${gift.name} is UserId ${response.data.userId}`})
                     }
                     if(response.status===204)
                        alert("No Purchases For This Item")
                     
                } catch (error) {
                    console.error('Error fetching gifts:', error);
                }
               
            }
        useEffect(() => {
            const CheckIfDrawn=async(gift)=>
                {
                    try {
                        const response = await axios.get(`http://localhost:5015/Reffle/AllWinners`)
                        if (response.status === 200) {
                            const winnerData = response.data; 
                            setWinners(winnerData)
                            setDrawnProducts({ ...winnerData.reduce((acc, winner) => {
                                acc[winner.winningGift] = winner.winningGift; 
                                return acc;
                              }, {}) });
                              
                        } 
                        }
                     catch (error) {
                        console.error('Error fetching gifts:', error);
                    }
                   
                }
                CheckIfDrawn()
            const fetchData = async () => {
               try {
                    const response = await axios.get("http://localhost:5015/Gift");
                    if (response.status === 200) {
                        setProducts(response.data.slice(0, 40));
                    }
                } catch (error) {
                    console.error('Error fetching gifts:', error);
                }
               
            };
            
            fetchData();

        });

        const gridItem = (product) => {
            const isDrawn = drawnProducts[product.name] || false; // Check using product ID

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
                           {isDrawn?<div style={{color:'#F94561'}}>{winners.find((winner) => winner.winningGift === product.name)?.fullName || 'No Winner Yet'}</div>:<Button onClick={()=>{Draw(product)}} style={{borderColor:'#F94561',color:'#F94561',borderRadius:'0'}}label={"Draw"} severity="danger" outlined />     
                        }
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
        return(
            <> <div style={{ backgroundColor: 'black' }} className="card">
            <DataView value={products} listTemplate={listTemplate} layout={layout} />
          </div>      
       <Toast ref={toast}/>
       <Button onClick={sendEmails}style={{backgroundColor:'#E89D3D',border: '2px solid #E89D3D',alignItems:'center',justifyContent: 'center'}}>Send Email To All Winners</Button>
          </>
        )
    }
    export default Raffle