import { json } from "remix";
import { Message, messageSession } from "~/sessions";

export const getMessage = async (request: Request) => {
  const { getSession } = messageSession;
  const session = await getSession(request.headers.get("cookie"));
  const message = session.get("message") as Message;

  if (!message) return null;

  if (!message.severity) {
    throw json("Message should have a severity", {
      status: 401,
    });
  }

  return message;
};
