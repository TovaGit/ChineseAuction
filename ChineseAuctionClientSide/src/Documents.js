import {
    Document,
    Page,
    Text,
    View,
    DataTableCell,
    StyleSheet,
    PDFViewer,
  } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import axios from "axios";


const Documents=()=>
    {
        const [winners, setWinners] = useState([]);
        const [total,setTotal]=useState(null)
        const styles = StyleSheet.create({
            page: {
                backgroundColor: "white",
                color: "black",
                display: "flex",
                justifyContent: "center",
                height: '100%',
                fontSize:14,
            },
            section: {
                marginBottom:10, 
                marginRight:50
            },
            viewer: {
              width: window.innerWidth, 
              height: window.innerHeight,
            }

          });
useEffect(()=>{
  const Total =async()=>
    {
        try{
            axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
            const response = await axios.get(`http://localhost:5015/Purchases/TotalIncomeForChineseauction`)
            if(response.status===200)
                setTotal(response.data)
        }
        catch (error) {
            console.error('Error fetching total:', error);
        }
 }
 const Winners=async()=>
    {
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem('token').substr(1,(sessionStorage.getItem('token')).length-2)}`
            const response = await axios.get(`http://localhost:5015/Reffle/AllWinners`)
            if (response.status === 200) {
                setWinners(response.data)
            } 
            }
         catch (error) {
            console.error('Error fetching gifts:', error);
        }
       
    }
    Winners()
 Total() } )
        return(
            <>
            <PDFViewer style={styles.viewer}>
            <Document>
              {/*render a single page*/}
              <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                  <Text>The Total Income Of Auction {total}</Text>
                </View>
              </Page>
              <Page size="A4" style={styles.page}>
              {winners.map(e => (
                <View key={e.id} style={styles.section}>
                    <Text>winningNumber: {e.winningNumber}</Text>
                    <Text>winningGift: {e.winningGift}</Text>
                    <Text>Email: {e.email}</Text>
                    <Text>PhoneNumber: {e.phone}</Text>
                    <Text>-------------------------------------------------------------------------</Text>
                </View>
))}
              </Page>
            </Document>
            
          </PDFViewer>
         
          {/* //<Button onClick={downloadPdf} style={{backgroundColor:"red"}}>Download PDF</Button> */}
          </>
        )
    }
    export default Documents