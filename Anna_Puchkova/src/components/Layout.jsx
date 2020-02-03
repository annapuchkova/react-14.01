import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import MessageField from './MessageField';
import ChatList from './ChatList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import { sendMessage } from "../actions/messageActions";


class Layout extends React.Component {
  static propTypes = {
      chatId: PropTypes.number,
      sendMessage: PropTypes.func.isRequired,
  };

  static defaultProps = {
      chatId: 1,
  };

  state = {
  /*  chats: {
        1: {title: 'Chat 1', messageList: [1]},
        2: {title: 'Chat 2', messageList: [2]},
        3: {title: 'Chat 3', messageList: []},
    },*/
    messages: {
        1: { text: 'Hello!', sender: 'bot' },
        2: { text: "Good Day!", sender: 'bot' },
    },
};

componentDidUpdate(prevProps, prevState) {
    const { messages } = this.state;
    if (Object.keys(prevState.messages).length < Object.keys(messages).length &&
        Object.values(messages)[Object.values(messages).length - 1].sender === 'me') {
        setTimeout(() =>
            this.sendMessage('Не приставай ко мне, я робот!', 'bot'), 1000);
    }
}

sendMessage = (message, sender) => {
    const { messages } = this.state;
    const { chatId } = this.props;

    const messageId = Object.keys(messages).length + 1;
    this.setState({
        messages: {...messages,
            [messageId]: {text: message, sender: sender}},
    });
    this.props.sendMessage(messageId, message, sender, chatId);
};
/*
addChat = (title) => {
    const { chats } = this.state;
    const chatId = Object.keys(chats).length + 1;
    this.setState({
        chats: {...chats,
            [chatId]: {title: title, messageList: []}},
    })
};*/
  render() {
      return (
          <div className="layout">
              <Header chatId={ this.props.chatId } />
              <div className="layout-canvas">
                  <div className="layout-left-side">
                      <ChatList 
                    /*  chats={ this.state.chats }
                      addChat={ this.addChat }*/
                      />
                  </div>
                  <div className="layout-right-side">
                      <MessageField 
                        chatId={ this.props.chatId } 
                        //chats={ this.state.chats }
                        messages={ this.state.messages }
                        sendMessage={ this.sendMessage }
                      />
                  </div>
              </div>
          </div>
      )
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);