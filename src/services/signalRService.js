import * as signalR from "@microsoft/signalr";

const hubUrl = "http://localhost:3209/messenger/hub"; // Убедись, что тут правильный URL

let connection = null;

export const createConnection = () => {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl,{transport: signalR.HttpTransportType.WebSockets,skipNegotiation: true,})
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Debug)
      .build();

    connection.start()
      .then(() => console.log("SignalR Connected"))
      .catch(err => console.error("SignalR Connection Error:", err));
  }

  return connection;
};

export const getConnection = () => connection;
