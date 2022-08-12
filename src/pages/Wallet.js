import React from 'react';
import Header from '../components/Header';
import Form from '../components/Form';
import WalletTable from '../components/WalletTable';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div id="pricipal-div-wallet">
        <Header />
        <Form />
        <WalletTable />
      </div>
    );
  }
}

export default Wallet;
