import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Loader from 'react-native-three-dots-loader';
import { processInvoicePayment } from '../../apiCall';
export default function InvoiceDetails({ route, navigation }) {
  const [payAmount, setPayAmount] = useState(route?.params?.pendingAmount);

  const [selectedPaymentMode, setSelectedPaymentMode] = useState('');
  const [processing, setProcessing] = useState(false);
  const [isValidAmount, setIsValidAmount] = useState(true);
  const billNo = route?.params?.billNo;
  const retailerName = route?.params?.retailerName;

  const makePayment = async () => {
    setProcessing(true);
    try {
      const reqParam = {
        invoice_id: route?.params?.invoice_id,
        paid_amount: Number(payAmount),
        payment_mode: selectedPaymentMode,
        paymnent_date: new Date().toDateString(),
      };
      const response = await processInvoicePayment(reqParam);
      if (response.status === 200) {
        navigation.push('PaymentSuccessFull', {
          payAmount,
          selectedPaymentMode,
          billNo,
          retailerName,
        });
      }
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setProcessing(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* SCREEN HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image
            style={styles.back_icon}
            source={require('../../assets/backIcons.png')}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.brand_name_text}>{billNo}</Text>
          <Text style={styles.store_name}>{retailerName}</Text>
        </View>
      </View>

      {/* AMOUNT INPUT BOX*/}
      <View style={styles.price_input_wrapper}>
        <Text style={styles.amount}>Amount</Text>
        <View style={styles.price_input}>
          <Text style={styles.rupeeSign}>₹</Text>
          <TextInput
            value={payAmount.toString()}
            onChangeText={(value) => {
              if (!value || Number(value) > route?.params?.pendingAmount) {
                setIsValidAmount(false);
              } else {
                setIsValidAmount(true);
              }
              setPayAmount(value);
            }}
            keyboardType='numeric'
            style={{
              fontStyle: 'normal',
              // fontWeight: 400,
              fontSize: 24,
              // lineHeight: 30,
              color: '#C8C8C8',
              width: '100%',
            }}
            autoFocus={true}
          />
        </View>
        {!isValidAmount ? (
          <Text style={styles.amount}>please enter a valid amount</Text>
        ) : null}
      </View>

      {/* CHOOSE PAYMENT MODE */}
      <View style={{ marginTop: 113, display: 'flex', alignItems: 'center' }}>
        <Text style={styles.payment_mode_type}>Choose Payment Mode</Text>
      </View>
      <View style={styles.payment_mode}>
        <FlatList
          data={['Online', 'Cash', 'Cheque']}
          keyExtractor={(item) => item}
          horizontal={true}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.payment_mode_box,
                  {
                    backgroundColor:
                      selectedPaymentMode === item ? '#DFE8F4' : '#dddddd',
                    borderWidth: selectedPaymentMode === item ? 1 : 0,
                    borderColor: selectedPaymentMode === item ? '#2760B6' : '',
                  },
                ]}
                onPress={() => setSelectedPaymentMode(item)}
              >
                <Text style={styles.payment_mode_text}>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* CONFIRM BUTTON */}
      <TouchableOpacity
        style={[
          styles.confirm_button,
          {
            backgroundColor:
              selectedPaymentMode && isValidAmount ? '#2760B6' : '#dddddd',
            opacity: processing ? 0.7 : 1,
          },
        ]}
        onPress={makePayment}
        disabled={!selectedPaymentMode || !isValidAmount}
      >
        <Text
          style={{
            color: selectedPaymentMode && isValidAmount ? '#ffffff' : '#5F5F5F',
            fontSize: 16,
            width: '100%',
            textAlign: 'center',
          }}
        >
          {processing ? '...Processing' : 'Confirm'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  header: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    backgroundColor: '#2A2D31',
    borderBottomColor: '#3A3A3A',
    borderBottomWidth: 1,
    width: '100%',
  },
  back_icon: {
    width: 16,
    height: 16,
  },
  brand_name_text: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24,

    color: '#ECECEC',
  },
  store_name: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 16,
    paddingTop: 2,
    /* identical to box height, or 150% */

    color: '#ECECEC',
  },
  price_input_wrapper: {
    paddingTop: 35,
    paddingLeft: 27,
    paddingRight: 25,
    paddingBottom: 59,
    backgroundColor: '#2A2D31',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  price_input: {
    width: '100%',
    height: 50,
    backgroundColor: '#24262A',
    borderRadius: 6,
    marginTop: 1,

    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 16,
    paddingTop: 2,
    /* identical to box height, or 150% */

    color: '#C4C4C4',
    paddingLeft: 5,
    marginBottom: 5,
  },
  payment_mode_type: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 17,
    alignContent: 'center',
  },
  payment_mode: {
    marginTop: 51,
  },
  payment_mode_box: {
    width: 116,
    height: 151,

    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 11,
  },
  payment_mode_text: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24,
    color: '#2F2F2F',
  },
  rupeeSign: {
    fontStyle: 'normal',
    fontSize: 24,
    // lineHeight: 30,
    color: '#C8C8C8',
  },
  confirm_button: {
    width: '100%',
    height: 56,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#EFEFEF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
