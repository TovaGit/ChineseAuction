import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { TabMenu } from 'primereact/tabmenu';
import { useState } from 'react';
import Gifts from './Gifts';
import Purchases from './Purchases';
import Donors from './Donors';
import Raffle from './Raffle';
import Documents from './Documents';
const Manager=()=>
{
    const[gifts,SetGifts]=useState(false)
    const[donors,SetDonors]=useState(false)
    const[purchases,SetPurchases]=useState(false)
    const[documents,SetDocuments]=useState(false)
    const[raffle,SetRaffle]=useState(false)

    const items = [
        { label: <span style={{ color: '#E89D3D' }}>Gift</span>, icon: <i className="pi pi-gift" style={{ color: '#E89D3D' }}></i>, command: () => {SetGifts(true);SetPurchases(false);SetDocuments(false);SetRaffle(false);SetDonors(false)}},
        { label: <span style={{ color: '#E89D3D' }}>Donors</span>, icon: <i className="pi pi-users" style={{ color: '#E89D3D' }}></i>,command: () => {SetDonors(true);SetPurchases(false);SetDocuments(false);SetRaffle(false);SetGifts(false)}},
        { label: <span style={{ color: '#E89D3D' }}>Purchases</span>,icon: <i className="pi pi-cart-minus" style={{ color: '#E89D3D' }}></i>,command: () => {SetPurchases(true);SetGifts(false);SetDocuments(false);SetRaffle(false);SetDonors(false)} },
        { label: <span style={{ color: '#E89D3D' }}>Documents</span>, icon: <i className="pi pi-file-check" style={{ color: '#E89D3D' }}></i> ,command: () => {SetDocuments(true);SetPurchases(false);SetGifts(false);SetRaffle(false);SetDonors(false)}},
        { label: <span style={{ color: '#E89D3D' }}>1/7/2024 Raffle</span>, icon: <i className="pi pi-clock" style={{ color: '#E89D3D' }}></i> ,command: () => {SetRaffle(true);SetPurchases(false);SetDocuments(false);SetGifts(false);SetDonors(false)}}

    ];
    return(<>
        <div className="main-page-container">
        <Image
          src="images/logo.png"
          alt="Image"
          height="65%"
          className="logo"
        />
          <div className="blue-line" style={{backgroundColor:"black"}}>
          <TabMenu model={items} style={{color:'red'}}/>
          </div>
        
      </div>
               {gifts&&<Gifts></Gifts>}
              {donors&&<Donors></Donors>}
              {purchases&&<Purchases></Purchases>}
              {raffle&&<Raffle></Raffle>}
              {documents&&<Documents></Documents>}</>

    )
}
export default Manager