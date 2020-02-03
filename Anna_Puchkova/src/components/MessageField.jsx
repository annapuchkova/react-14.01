
import React from 'react';
import PropTypes from "prop-types";
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';
import Message from './Message';
import '../styles/styles.css';

export default class MessageField extends React.Component {
   static propTypes = {
       chatId: PropTypes.number.isRequired,
       messages: PropTypes.object.isRequired,
       chats: PropTypes.object.isRequired,
       sendMessage: PropTypes.func.isRequired,
   };

   state = {
        input: '',
    };

    handleSendMessage = (message, sender) => {
        if (this.state.input.length > 0 || sender === 'bot') {
            this.props.sendMessage(message, sender);
        }
        if (sender === 'me') {
            this.setState({ input: '' });
        }
    };

   handleChange = (event) => {
       this.setState({ [event.target.name]: event.target.value });
   };

   handleKeyUp = (event) => {
       if (event.keyCode === 13) { // Enter
           this.handleSendMessage(this.state.input, 'me')
       }
   };

   render() {
      const { chatId, messages, chats } = this.props;

       const messageElements = chats[chatId].messageList.map(messageId => (
           <Message
               key={ messageId }
               text={ messages[messageId].text }
               sender={ messages[messageId].sender }
           />));

       return [
           <div key='messageElements' className="message-field">
               { messageElements }
           </div>,
           <div key='textInput' className='txt-field'>
               <TextField
                   name="input"
                   fullWidth={ true }
                   hintText="Enter your message"
                   style={ { fontSize: '22px' } }
                   onChange={ this.handleChange }
                   value={ this.state.input }
                   onKeyUp={ this.handleKeyUp }
               />
               <FloatingActionButton
                   onClick={ () => this.handleSendMessage(this.state.input, 'me') }>
                   <SendIcon />
               </FloatingActionButton>
           </div>
       ]
   }
}
