<h1 align="center">Schmooze Assign</h1>


## Technology Stack
* css:react native stylesheet
* Javascript: Primary programing language
* React Native: Js Library ti build cross platform app
* Express: create an api in node env
* Mongodb: As nosql database

## Mongodb Schema

* Invoice Schema:  storing invoice data
```json  
 brand: {
    type: String,
  },
  sales_rep_id: {
    type: String,
  },
  salesman_name: {
    type: String,
  },
  invoice_amount: {
    type: Number,
  },
  retailer_id: {
    type: String,
  },
  retailer_name: {
    type: String,
  },

  retailer_ph_no: {
    type: String,
  },
  invoice_date: {
    type: String,
  },
  bill_no: {
    type: String,
  },
  pending_amount: {
    type: Number,
  },
  collection_date: {
    type: String,
  },
  
  ```
  * InvoicePayment  Schema:  storing invoice payment data
  ```json  
invoice_id: {
    type: String,
    require,
  },
  paid_amount: {
    type: Number,
    require,
  },
  payment_mode: {
    type: String,
    require,
  },
  paymnent_date: {
    type: String,
    require,
  }
  
  ```
  
  ## Invoice Api
  
   * /invoices  <br>
      method:GET <br>
      response: give all available invoices <br>
      use: to fetch all available invoices <br>
      
   * /invoices <br>
     method:POST <br>
     request body :all invoice related data <br>
     response: inserted invoide id <br>
      use: inser a new invoice <br>
      
   * /invoicePayment <br>
   method:POST <br>
   request body: {invoice_id,paid_amount,payment_mode,paymnent_date} <br>
   use: settle partial or full payment of invoice <br>
   
         
  
  
