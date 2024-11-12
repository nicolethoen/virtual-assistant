// ============================================================================
// Chatbot Footer
// ============================================================================

// Global footer component
// Supports:
// - Message bar
// - Footnote
// - Footnote popover

import React from 'react';

import { Divider } from '@patternfly/react-core';

export interface ChatbotFooterProps extends React.HTMLProps<HTMLDivElement> {
  /** Children for the Footer that supports MessageBar and FootNote components*/
  children?: React.ReactNode;
  /** Custom classname for the Footer component */
  className?: string;
}

export const ChatbotFooter: React.FunctionComponent<ChatbotFooterProps> = ({
  children,
  className,
  ...props
}: ChatbotFooterProps) => (
  <div className={`pf-chatbot__footer ${className ?? ''}`} {...props}>
    <Divider />
    <div className="pf-chatbot__footer-container">{children}</div>
  </div>
);

export default ChatbotFooter;
