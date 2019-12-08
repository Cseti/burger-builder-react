import React from 'react';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

const App: React.FC = () => {
  return (
      <Layout>
          <BurgerBuilder />
      </Layout>
  );
}

export default App;
