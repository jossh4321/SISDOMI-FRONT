import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
const connection = new HubConnectionBuilder()
  .withUrl('http://localhost:8080/notification-hub')
  .configureLogging(LogLevel.Information)
  .build()
 
connection.start()