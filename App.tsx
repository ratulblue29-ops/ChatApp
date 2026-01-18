import React from 'react';
import {SocketProvider} from './src/contexts/SocketContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <SocketProvider>
      <AppNavigator />
    </SocketProvider>
  );
};

export default App;