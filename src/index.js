import React from "react";
import Chat from "./chat";
import ErrorBoundary from "./ErrorBoudary";

function ChatBot(props) {
  return ( 
    <ErrorBoundary chatchError={props.chatchError}>
      <Chat
        companyId={props.companyId}
        analitics={props.analitics}
        trackImpression={props.trackImpression}
        avatar={props.avatar}
        title={props.title}
      />
    </ErrorBoundary>
  )
}

export default ChatBot;