import React from "react";
import Chat from "./chat";
import ErrorBoundary from "./ErrorBoudary";
import chatBotStyles from '!!raw-loader!ns-bot/dist/styles/index.css';

function ChatBot(props) {
  return ( 
    <ErrorBoundary chatchError={props.chatchError}>
      <style dangerouslySetInnerHTML={{ __html: chatBotStyles }} />
      <Chat
        companyId={props.companyId}
        analitics={props.analitics}
        trackImpression={props.trackImpression}
      />
    </ErrorBoundary>
  )
}

export default ChatBot;