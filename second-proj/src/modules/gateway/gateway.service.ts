import { OnModuleInit } from '@nestjs/common';
import {
    MessageBody,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*', // allow CORS
    },
})
export class GatewayService implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    // ✅ Correctly implemented lifecycle hook
    onModuleInit() {
        console.log('WebSocket server is initializing...');
        this.server.on('connection', (socket) => {
            console.log('New client connected:', socket.id);

            console.log('WebSocket server initialized');
        });
    }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any) {
        console.log('Received message:', body);
        this.server.emit('onMessage', {
            msg: 'New message received',
            content: body,
        });
    }
}
