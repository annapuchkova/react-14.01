import React from 'react';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';
import DeleteIcon from '@material-ui/icons/Delete';
import Message from '../components/Message';
import { sendMessage } from '../actions/messageActions';
import '../styles/styles.css';

class MessageField extends React.Component {
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
        if (message.length > 0 || sender === 'bot') {
            this.sendMessage(message, sender);
        }
        if (sender === 'me') {
            this.setState({ input: '' })
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

    sendMessage = (message, sender) => {
        const { chatId, messages } = this.props;
        const messageId = Object.keys(messages).length + 1;
        this.props.sendMessage(messageId, message, sender, chatId);
    };

    //deleteMessage = () => {};

   render() {
      const { chatId, messages, chats } = this.props;

       const messageElements = chats[chatId].messageList.map(messageId => (

           <Message
               key={ messageId }
               text={ messages[messageId].text }
               sender={ messages[messageId].sender }
               //deleteButton={<DeleteIcon className={"deleteButton"} onClick={() => this.deleteMessage(messageId)}/>}
           />
          
           ));

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

const mapStateToProps = ({ chatReducer, messageReducer }) => ({
    chats: chatReducer.chats,
    messages: messageReducer.messages,
 });
 
 const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);
 
 export default connect(mapStateToProps, mapDispatchToProps)(MessageField);