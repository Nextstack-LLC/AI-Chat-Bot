import React, { useState } from "react";
import CONSTANTS from "./constants";
import { faq } from "./faq";
import axios from "axios";
import "./index.css";
import Avatar from "./icons/avatar.svg";
import Close from "./icons/close.svg";
import Hand from "./icons/hand.svg";
import LetsTalk from "./icons/lets_talk.svg";
import Send from "./icons/send.svg";
import SendActive from "./icons/send_active.svg";

const base_url = "https://chat-api.nextstack.org/api/v1";

export default function MyChatBot(props) {
  const [isSelected, setIsSelected] = useState(false);
  const [chatHistory, setChatHistory] = useState([CONSTANTS.DEFAULT_MESSAGE]);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSendMessage = async (msg) => {
    setLoading(true);
    try {
      const prompt = message || msg
      if (prompt) {
        setChatHistory((prev) => [...prev, {
          message: prompt,
          response: "",
        }]);
        setMessage("");
        let str = "";
        if (chatHistory.length > CONSTANTS.CHAT_HISTORY_MIN_LENGTH) {
          chatHistory.forEach((el, i) => {
            if (i) {
              str = `${str} ${CONSTANTS.MY_QUESTION} "${el.message}", ${CONSTANTS.YOUR_ANSWER} "${el.response}"`
            }
          })
        }
        
        const summery = str && await axios.post(`${base_url}/summarize`, {
          message: str
        });

        const response = await axios.post(`${base_url}/send`, {
          id: props.companyId,
          message: prompt,
          summery: summery?.data?.message,
        }).finally(() => setLoading(false));
        
        const data = chatHistory;
        data.slice(-1, 1);
        
        setChatHistory([...data, {
          message: prompt,
          response: response.data.message,
        }]);

        if (props.analitics) {
          props.analitics({
            question: prompt,
            answer: response.data.message,
          });
        }
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
    
  };

  const selectQuestion = (text) => {
    handleSendMessage(text);
    setIsSelected(true);
  };

  const handleTrackImpression = (status) => {
    if (props.trackImpression) {
      props.trackImpression(status);
    }
  }

  return (
    <>
      {isOpen ? (
        <div className="chat-container">
          <div className="chat-header">
            <div>
              <img className="avatar" src={Avatar} alt="Avatar" />
              <p className="company-name">{CONSTANTS.NEXTSTACK_LLC}</p>
            </div>
            <div
              onClick={() => {
                setIsOpen(false)
                handleTrackImpression(false)
              }}
              className="close-container"
            >
              <img
                className="close"
                src={Close} alt="Close"
              />
            </div>
          </div>
          {(!isSelected && chatHistory.length === CONSTANTS.CHAT_HISTORY_MIN_LENGTH) && (
            <div className="faq-container">
              {faq.map((item) => (
                <div 
                  onClick={() => selectQuestion(item.label)}
                  className="user-message" key={item.id}
                >
                  <p className="faq-text">{item.label}</p>
                </div>
              ))}
            </div>
          )}
          <div className="chat-body">
            <ul>
                {chatHistory.map((item, index) => (
                  <li key={index}>
                    {item.message && (
                      <div className="user-message">
                        <p>{item.message}</p>
                      </div>
                    )}
                    {item.response && (
                      <div className="bot-answer">
                        <p>{item.response}</p>
                        {chatHistory.length === CONSTANTS.CHAT_HISTORY_MIN_LENGTH && (
                          <img src={Hand} alt="Hand" />
                        )}
                      </div>
                    )}
                  </li>
                ))}
            </ul>
            {loading && (
              <div className="loading">
                <div className="dot-flashing" />
              </div>
            )}
          </div>
          <div className="form">
            <span className="line" />
            <div className="input-container">
              <textarea
                disabled={loading}
                rows={6} 
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                } }
              />
              <button 
                disabled={loading}
                onClick={handleSendMessage}
                className={`send-button ${message && 'send-button-red'}`}
              >
                <img src={message ? SendActive : Send} alt="Send" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div 
          className="chat-bot-icon" 
          onClick={() => {
            setIsOpen(true)
            handleTrackImpression(true)
          }}
        >
          <img src={LetsTalk} alt="Let's Talk" />
          <p className="lets-talk-txt">{CONSTANTS.LETS_TALK}</p>
        </div>
      )}
    </>
  );
}
