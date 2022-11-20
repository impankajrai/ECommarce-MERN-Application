export const Orders = [
  {
    productId: "",
    orderId: "",
    billingName: "",
    address: "",
    invoiceURL: "",
    purchasePrice: "",
    payment: {
      status: "true/false",
      method: "UPI/COD/Internet banking",
    },
    tracking:{
        currentStatus:"",
        expectedDelivery:"Date",
    }
  },
];
