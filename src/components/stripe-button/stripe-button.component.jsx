import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  // Stripe takes in price values in cents. Therefore $50 is equal to 5000
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_51HnRGICDJmtV1wUme9deOxF99SWVjMl7YtYCmoHpr6EBlxSvsw4WrRddAZERtxQ7dvHr4QtQMMmBdLbJqGgJiLMx00CuzwBa7A";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      // the token is the onSuccess callback that triggers when we submit
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
