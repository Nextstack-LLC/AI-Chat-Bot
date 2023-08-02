import React from 'react';
import ChatBot from "components/chat";
import ErrorBoundary from './ErrorBoundary';
import "./styles/main.scss";

function App(props) {
  return ( 
    <ErrorBoundary chatchError={props.chatchError}>
      <ChatBot
        companyId={props.companyId}
        analitics={props.analitics}
        trackImpression={props.trackImpression}
      />
    </ErrorBoundary>
  )
}

export default App;
