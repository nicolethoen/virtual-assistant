// ============================================================================
// Chatbot Footer - Message Bar
// ============================================================================
import React from 'react';
import { TextAreaProps, Flex, FlexItem } from '@patternfly/react-core';
import { AutoTextArea } from 'react-textarea-auto-witdth-height';

// Import Chatbot components
import AttachButton from './AttachButton';
import MicrophoneButton from './MicrophoneButton';
import SendButton from './SendButton';

export interface MessageBarProps extends TextAreaProps {
  /** Callback to get the value of input message by user */
  onSendMessage: (message: string) => void;
  /** Class Name for the MessageBar component */
  className?: string;
  /** Flag to always to show the send button. By default send button is shown when there is a message in the input field */
  alwayShowSendButton?: boolean;
  /** Flag to enable the Attach button  */
  hasAttachButton?: boolean;
  /** Flag to enable the Microphone button  */
  hasMicrophoneButton?: boolean;
  /** Callback function for when attach button is clicked */
  handleAttach?: (event: React.MouseEvent | MouseEvent | KeyboardEvent) => void;
}

export const MessageBar: React.FunctionComponent<MessageBarProps> = ({
  onSendMessage,
  className,
  alwayShowSendButton,
  hasAttachButton,
  hasMicrophoneButton,
  handleAttach,
  ...props
}: MessageBarProps) => {
  // Text Input
  // --------------------------------------------------------------------------
  const [message, setMessage] = React.useState<string>('');
  const [isListeningMessage, setIsListeningMessage] = React.useState<boolean>(false);

  const textareaRef = React.useRef(null);

  const handleChange = React.useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  // Handle sending message
  const handleSend = React.useCallback(() => {
    setMessage((m) => {
      onSendMessage(m);
      return '';
    });
  }, [onSendMessage]);

  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <Flex
      className={`pf-chatbot__message-bar ${className ?? ''}`}
      alignItems={{ default: 'alignItemsCenter' }}
      justifyContent={{ default: 'justifyContentFlexEnd' }}
      flexWrap={{ default: 'wrap' }}
    >
      <FlexItem flex={{ default: 'flex_1' }} className="pf-chatbot__message-bar-input">
        <AutoTextArea
          ref={textareaRef}
          className="pf-chatbot__message-textarea"
          value={message as any} // Added any to make the third part TextArea component types happy. Remove when replced with PF TextArea
          onChange={handleChange as any} // Added any to make the third part TextArea component types happy. Remove when replced with PF TextArea
          onKeyDown={handleKeyDown}
          placeholder={isListeningMessage ? 'Listening' : 'Send a message...'}
          aria-label={isListeningMessage ? 'Listening' : 'Send a message...'}
          {...props}
        />
      </FlexItem>

      <FlexItem className="pf-chatbot__message-bar-actions">
        {hasAttachButton && <AttachButton onClick={handleAttach} isDisabled={isListeningMessage} />}
        {hasMicrophoneButton && (
          <MicrophoneButton
            isListening={isListeningMessage}
            onIsListeningChange={setIsListeningMessage}
            onSpeechRecognition={setMessage}
          />
        )}
        {(alwayShowSendButton || message) && <SendButton value={message} onClick={handleSend} />}
      </FlexItem>
    </Flex>
  // This is how I would structure the footer
  // Don't use a layout, rather apply all CSS to the component
  // The only addition to PF would be to .pf-v6-c-form-control__textarea
  //   <div class="pf-chatbot__footer ">
  //   <hr class="pf-v6-c-divider">
  //   <div class="pf-chatbot__message-bar">
  //     <div class="pf-chatbot__message-bar-input">
  //       <div role="textbox" contenteditable="true" class="pf-v6-c-form-control__textarea">Type in here...</div>
  //     </div>
  //     <div class="pf-chatbot__message-bar-actions">
  //       <button aria-describedby="pf-chatbot__tooltip--use-microphone" aria-disabled="false" aria-label="Microphone Button" class="pf-v6-c-button pf-m-plain pf-chatbot__button--microphone" type="button" data-ouia-component-type="PF6/Button" data-ouia-safe="true" data-ouia-component-id="OUIA-Generated-Button-plain-7">
  //         <span class="pf-v6-c-button__icon pf-m-start">
  //           <span class="pf-v6-c-icon pf-m-inline">
  //             <span class="pf-v6-c-icon__content pf-m-xl">
  //               <svg class="pf-v6-svg" viewBox="0 0 352 512" fill="currentColor" aria-hidden="true" role="img" width="1em" height="1em"><path d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z"></path></svg>
  //             </span>
  //           </span>
  //         </span>
  //       </button>
  //     </div>
  //   </div>
  //   <div class="pf-chatbot__footnote">
  //     <button aria-disabled="false" class="pf-v6-c-button pf-m-link pf-m-small" type="button" data-ouia-component-type="PF6/Button" data-ouia-safe="true" data-ouia-component-id="OUIA-Generated-Button-link-1">
  //       <span class="pf-v6-c-button__text">Lightspeed uses AI. Check for mistakes. <svg class="pf-v6-svg" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" role="img" width="1em" height="1em"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg></span>
  //     </button>
  //   </div>
  // </div>
  );
};

export default MessageBar;
