import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InvoiceList from './modules/invoice/InvoiceList';
import InvoideDetails from './modules/invoice/InvoideDetails';
import PaymentSuccessFull from './modules/invoice/PaymentSuccessFull';
const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='InvoiceList'
          component={InvoiceList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='InvoiceDetails'
          component={InvoideDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='PaymentSuccessFull'
          component={PaymentSuccessFull}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
