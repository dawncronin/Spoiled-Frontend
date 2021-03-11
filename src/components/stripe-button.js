import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price, onToken }) => {
    const priceInCents = price * 100
    const publishableKey = 'pk_test_51ITZdkLWX0QryHcQ3n5wziauHiF0wLZNkngXeUGBG1iuQbS9hkqlrg8kdDQv3ljR6h3n53mjWqfKTT4Si27a4avV00hmSPtYEI'


    return (
        <StripeCheckout
            label='Purchase Gift Using Stripe'
            name='Payment to Spoiled'
            billingAddress
            description={`Your Total is $${price}`}
            amount={priceInCents}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton