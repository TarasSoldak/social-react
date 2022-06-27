import React, { FC, useEffect, useState } from 'react';

type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
const Chat: FC = () => {
    return <div> <ChatContainer /></div>;
};
export default Chat


const ChatContainer: FC = () => {
    const [ws, setWs] = useState<WebSocket | null>(null)
    useEffect(() => {
        let wsChanel: WebSocket
        const handlerWs = () => {
            console.log('Close chanel')
            setTimeout(CreateChanel, 3000)
        }
        const CreateChanel = () => {
            wsChanel?.addEventListener('close', handlerWs)
            wsChanel?.close()
            wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            wsChanel?.addEventListener('close', handlerWs)
            setWs(wsChanel)

        }
        CreateChanel()
        return () => {
            wsChanel?.removeEventListener('close', handlerWs)
            wsChanel.close()
        }
    }, []);

    return <div>
        <Messages ws={ws} />
        <AddMessageChat ws={ws} />
    </div>;
};


const Messages: FC<{ ws: WebSocket | null }> = ({ ws }) => {
    const [wsData, setWsData] = useState<ChatMessageType[]>([]);

    useEffect(() => {
        const messageHandler=(e:MessageEvent)=>{
            let newData = JSON.parse(e.data)
            setWsData((prevData) => [...prevData, ...newData]);
        }
        ws?.addEventListener('message', messageHandler )
        return ()=>{
            ws?.removeEventListener('message', messageHandler)

        }
    }, [ws]);

    return <div style={{ height: '300px', overflow: 'auto', padding: '15px' }}>
        {wsData.map((m, i) => <Message key={i} message={m} />)}

    </div>;
};

const Message: FC<{ message: ChatMessageType }> = ({ message }) => {

    return <div>
        <img src={message.photo} alt="/" style={{ width: '50px' }} />
        <b>{message.userName}</b>
        <div>
            <b>{message.message}</b>
        </div>
        <hr />
    </div>;
};

const AddMessageChat: FC<{ ws: WebSocket | null }> = ({ ws }) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'ready' | 'padding'>('padding')

    useEffect(() => {
        const openHandler=()=>{
            setReadyStatus('ready')
        }
        ws?.addEventListener('open', openHandler )

        return () => {
            ws?.removeEventListener('open', openHandler)
        }
    }, [ws]);


    const sendMessage = () => {
        if (!message) {
            return
        }
        ws?.send(message)
        setMessage('')
    }
    return <div style={{ padding: '15px' }}>
        <div>
            <textarea onChange={e => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={ws === null || readyStatus !== 'ready'} onClick={sendMessage}>Send Message</button>
        </div>
    </div>;
};
