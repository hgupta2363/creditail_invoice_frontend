import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default function PaymentSuccessFull({ route }) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View
      style={[styles.container, { width: screenWidth, height: screenHeight }]}
    >
      {/* SUCCESSFULL TICK */}
      <View>
        <Image
          source={require('../../assets/green_tick.gif')}
          style={styles.tick_image}
        />
      </View>
      {/* BILL NO */}
      <View>
        <Text style={styles.bill_no}>{route?.params?.billNo}</Text>
      </View>
      {/* PAYMENT AMOUNT */}
      <Text style={styles.amount}>
        {' '}
        {`\u20B9 ${route?.params?.payAmount ?? ''} `}
      </Text>
      {/* RETAILER NAME */}
      <Text style={styles.retailer_name}>{route?.params?.retailerName}</Text>
      <View style={styles.dashed_line}></View>

      {/* PAYMENT MODE */}
      <Text style={styles.payment_mode}>
        {' '}
        {`Paid By ${route?.params?.selectedPaymentMode}`}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#188748',
    display: 'flex',
    alignItems: 'center',
  },
  tick_image: {
    width: 114,
    height: 114,
    marginTop: 143,
  },
  bill_no: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 16,
    color: '#EFEFEF',
    marginTop: 30,
  },
  amount: {
    fontFamily: 'Poppins',
    fontSize: 40,
    fontWeight: 400,
    lineHeight: 40,
    color: '#FFFFFF',
    marginTop: 20,
  },
  retailer_name: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    color: '#EFEFEF',
    marginTop: 30,
  },
  dashed_line: {
    height: 0,
    width: 274,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#F4F4F4',
    marginTop: 43,
  },
  payment_mode: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 24,
    color: '#FFFFFF',
    marginTop: 21,
  },
});
