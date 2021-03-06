import React, { Component } from 'react';
import CheckoutSummary from './CheckoutSummary';
import { reduxForm } from 'redux-form';
import * as api from '../../moltin';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
// import { connect as connectMQTT } from 'mqtt'
import { SUBMIT_PAYMENT, PAYMENT_COMPLETE } from '../../ducks/payments';
import { FETCH_CART_SEND } from '../../ducks/cart';

// const client = connectMQTT('ws://192.168.1.19:9001/mqtt')

function mapStateToProps(state) {
  return { push: state.push };
}

var CheckoutTemplate = {
  customer: {
    name: 'John Doe',
    email: 'john@doe.co'
  },
  shipping_address: {
    first_name: 'John',
    last_name: 'Doe',
    line_1: '2nd Floor British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle Upon Tyne',
    postcode: 'NE1 6UF',
    county: 'Tyne & Wear',
    country: 'United Kingdom'
  },
  billing_address: {
    first_name: 'John',
    last_name: 'Doe',
    line_1: '2nd Floor British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle Upon Tyne',
    postcode: 'NE1 6UF',
    county: 'Tyne & Wear',
    country: 'United Kingdom'
  }
};
class CheckoutForm extends Component {
  handleKeyDown = function(e) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
    }
  };

  mySubmit = values => {
    CheckoutTemplate.customer.name = values.name;
    CheckoutTemplate.customer.email = values.email;

    CheckoutTemplate.billing_address.first_name = values.billing_firstname;
    CheckoutTemplate.billing_address.last_name = values.billing_lastname;
    CheckoutTemplate.billing_address.line_1 = values.billing_address_1;
    CheckoutTemplate.billing_address.line_2 = values.billing_address_2;
    CheckoutTemplate.billing_address.city = values.billing_state;
    CheckoutTemplate.billing_address.county = values.billing_postcode;
    CheckoutTemplate.billing_address.country = values.billing_country;

    CheckoutTemplate.shipping_address.first_name = values.shipping_firstname;
    CheckoutTemplate.shipping_address.last_name = values.shipping_lastname;
    CheckoutTemplate.shipping_address.line_1 = values.shipping_address_1;
    CheckoutTemplate.shipping_address.line_2 = values.shipping_address_2;
    CheckoutTemplate.shipping_address.city = values.shipping_state;
    CheckoutTemplate.shipping_address.county = values.shipping_postcode;
    CheckoutTemplate.shipping_address.country = values.shipping_country;

    console.log('CHECKED_OUT');

    this.props.dispatch(dispatch => {
      dispatch({ type: SUBMIT_PAYMENT });
      dispatch({ type: FETCH_CART_SEND });
    });

    this.props.dispatch(dispatch => {
      dispatch({ type: PAYMENT_COMPLETE });
      api.DeleteCart();
      dispatch(push('/order-confirmation'));
    });
  };

  render() {
    return (
      <main role="main" id="container" className="main-container push">
        <section className="checkout">
          <div className="content">
            <CheckoutSummary />
            <form
              className="checkout-form"
              onKeyDown={e => {
                this.handleKeyDown(e);
              }}
              noValidate
              onSubmit={this.props.handleSubmit(this.mySubmit)}>
              <button type="submit" className="pay">
                SUBMIT
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }
}

CheckoutForm = reduxForm({
  form: 'CheckoutForm'
})(CheckoutForm);

// export const Subscribed = subscribe({ topic: 'dev/test'})(CheckoutForm)
export default connect(mapStateToProps)(CheckoutForm);
