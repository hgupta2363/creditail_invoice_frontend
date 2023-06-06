import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import { fetchInvoiceData } from '../../apiCall';
const screenWidth = Dimensions.get('window').width;

/* SINGLE INVOICE TILE*/

const InvoiceTile = ({ invoiceData, navigation }) => (
  <TouchableOpacity
    onPress={() =>
      navigation.push('InvoiceDetails', {
        billNo: invoiceData?.bill_no,
        retailerName: invoiceData?.retailer_name,
        pendingAmount: invoiceData?.pending_amount,
        invoice_id: invoiceData?._id,
      })
    }
    style={{
      paddingVertical: 12,
      paddingHorizontal: 24,
      display: 'flex',
      flexDirection: 'row',
      width: screenWidth,
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
    }}
  >
    <View>
      <Text style={styles.brand_name_text}>{invoiceData?.bill_no}</Text>
      <Text style={styles.store_name}>{invoiceData?.retailer_name}</Text>
    </View>

    <Text style={styles.pending_price}>
      {`\u20B9 ${invoiceData?.pending_amount ?? ''} `}
    </Text>
  </TouchableOpacity>
);
const InvoiceList = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [invoiceListData, setInvoiceListData] = useState([]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const invoiceListData = await fetchInvoiceData();

      setInvoiceListData(invoiceListData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <View style={styles.container}>
      {/* APP HEADER */}
      <View style={styles.header}>
        <Image
          style={styles.back_icon}
          source={require('../../assets/backIcons.png')}
        />
        <Text style={styles.header_text}>Invoices </Text>
      </View>

      {/* INVOICE LIST*/}
      <FlatList
        data={invoiceListData}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => {
          return (
            <View>
              <InvoiceTile invoiceData={item} navigation={navigation} />
            </View>
          );
        }}
        onRefresh={fetchInvoices}
        refreshing={loading}
        numColumns={1}
      />
    </View>
  );
};

/* STYLES */
export default InvoiceList;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    width: '100%',
    backgroundColor: '#2A2D31',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  back_icon: {
    width: 16,
    height: 16,
  },
  header_text: {
    /* Title/Regular/16 */

    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24,
    /* identical to box height, or 150% */

    color: '#ECECEC',
  },
  invoice_tile_container: {},
  brand_name_text: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 21,
    /* identical to box height, or 150% */

    color: '#646464',
  },
  store_name: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 18,
    /* identical to box height, or 150% */

    color: '#727272',
  },
  pending_price: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 18,
    paddingRight: 10,
    /* identical to box height, or 150% */

    color: 'black',
    paddingTop: 10,
  },
});
