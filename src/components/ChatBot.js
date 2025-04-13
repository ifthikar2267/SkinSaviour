import React, { useContext, useState } from "react";
import axios from "axios";
import { Button, Form, Card, Container, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { ShopContext } from "../contexts/ShopContext";


const ChatBot = () => {
  const { backendUrl } = useContext(ShopContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState("en-IN"); // Default English

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const newMessages = [...messages, { sender: "user", text: message }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(backendUrl + "/chat", {
        message,
        language, // Send selected language to backend
      });

      setMessages([...newMessages, { sender: "bot", text: response.data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { sender: "bot", text: "Sorry, I couldn't understand that." }]);
    }
  };

  const startVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support voice search. Try using Chrome.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language; // Use selected language
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };

    recognition.onerror = () => {
      alert("Voice recognition failed. Please try again.");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <Container className="mt-3" style={{scrollbarWidth:"none", overflowY:"hidden"}}>
      <div className="text-center">
        <img
          src="./assets/images/robo1.gif"
          alt="Chatbot"
          className="rounded-circle"
          style={{ width: "180px", height: "180px", cursor: "pointer", marginRight: "-68px" , marginBottom:"-42px"}}
          onClick={() => setShowChat(true)}
        />
      </div>

      <Modal show={showChat} onHide={() => setShowChat(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>AI Chatbot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="chatbot-container p-3 shadow-sm" style={{margin:"12px",width:"82vw"}}>
            <Card.Body style={{ height: "40vh", overflowY: "auto" }}>
              {messages.map((msg, index) => (
                <div key={index} className={`p-2 my-1 ${msg.sender === "user" ? "text-end" : "text-start"}`}>
                  <b>{msg.sender === "user" ? "You: " : "Bot: "}</b>
                  {msg.text}
                </div>
              ))}
            </Card.Body>
            {/* Language Selector */}
            <Form.Select className="mb-2" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en-IN">English</option>
              <option value="ta-IN">தமிழ் (Tamil)</option>
            </Form.Select>
            <Form.Control
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <div className="d-flex justify-content-between mt-2">
              <Button variant="secondary" onClick={startVoiceSearch} disabled={listening}>
                <FontAwesomeIcon icon={faMicrophone} className={listening ? "text-danger" : ""} /> Voice
              </Button>
              <Button onClick={() => sendMessage(input)}>Send</Button>
            </div>
          </Card>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ChatBot;
