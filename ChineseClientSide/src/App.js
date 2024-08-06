// import Register from './Register'
// import Login from './login';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import MainPage from './MainPage';
// import SendEmail from './SendEmail';
// import UpdatePwd from './UpdatePassword';
import DonorList from './ViewingDonors';
import GetDonorsDetails from './GetDonorsDetails';
import GiftDisplay from './GetAllGifts';
import SortingGiftBy from './SortingGiftBy';
import GetAllCategories from './GetAllCategories';
import ViewPuchases from './ViewAllPurchases';
import SendEmail from './SendEmail';
import MainPage from './MainPage';
import Login from './login';

function App() {
  return (
    <Login></Login>
    //<SendEmail></SendEmail>//
    //<SortingGiftBy></SortingGiftBy>//!!!works fix refreshing
    //<GiftDisplay></GiftDisplay>//!!!works fix refreshing
    //<GetAllCategories></GetAllCategories>//!!works fix refreshing
   // <DonorList></DonorList>//works
   // <GetDonorsDetails></GetDonorsDetails>
  // <ViewPuchases/>
 // <MainPage></MainPage>
  //  <>    
  //      <BrowserRouter>
  //      <Routes>

  //       {/* <Route path="/" element={<MainPage/>} /> */}
  //       <Route path="/MainPage/:status/:id" element={<MainPage/>} />
  //       <Route path="/Register" element={<Register/>} />
  //       <Route path="/SendEmail" element={<SendEmail/>} />
  //       <Route path="/Login" element={<Login/>} />
  //       <Route path="/UpdatePassword" element={<UpdatePwd/>} />


  //     </Routes>
  //   </BrowserRouter>
  //   </>
    
  )
}

export default App;
