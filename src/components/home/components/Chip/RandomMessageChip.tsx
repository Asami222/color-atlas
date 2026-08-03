"use client";

import { useState } from "react";
import { messages, icons } from "../../constants/messages";
import { MessageChip } from "./MessageChip";

export function RandomMessageChip() {

  const [{message, icon}] = useState(() => ({
    message: messages[Math.floor(Math.random() * messages.length)],
    icon: icons[Math.floor(Math.random() * icons.length)]
  }));
  return <MessageChip message={message} icon={icon}/>;
}