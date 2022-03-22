import { useContext, useEffect } from "react";
import { MessageContext } from "~/helpers/contexts";
import { Message } from "~/sessions";

export const useMessage = (message: Message | null) => {
  const { setMessage } = useContext(MessageContext);

  useEffect(() => {
    if (!message) return;
    setMessage(message);
  }, [message]);

  return [message, setMessage];
};
