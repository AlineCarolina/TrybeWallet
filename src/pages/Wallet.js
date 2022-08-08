import React from 'react';
import Header from '../components/Header';
import Form from '../components/Form';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Form />
        <WalletTable />
      </>
    );
  }
}

export default Wallet;
