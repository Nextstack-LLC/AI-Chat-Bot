import React from "react";
import Chat from "./chat";
import ErrorBoundary from "./ErrorBoudary";

function ChatBot(props) {
  if (process.env.IS_BROWSER) {
    return ( 
      <ErrorBoundary chatchError={props.chatchError}>
        <Chat
          companyId={props.companyId}
          analitics={props.analitics}
          trackImpression={props.trackImpression}
        />
      </ErrorBoundary>
    )
  }
}

export default ChatBot;