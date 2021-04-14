
import { useState, useEffect } from 'react'

import { Button, Input, TextField } from '@material-ui/core';

import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer'


import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});



const  RestockPrinter = (invoice) => {

  const [invoices, setInvoice] = useState({other: 'dab'})


    
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{invoices.other}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  )

    // useEffect = (() =>{
    //     setTimeout(_exportPdf(),10000)
    // }, [])

    return (
        <div>
        <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            
            <PDFViewer>
                <MyDocument />
            </PDFViewer>
            <br/>
            <br/>
            <br/>
            <br/>

            <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
        </div>
    )
}

export default RestockPrinter
