import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import './App.css';

function App() {
    const [todos, setTodos] = useState<string[]>([]);
    const [todo, setTodo] = useState('');
    const [socket, setSocket] = useState<Socket>();
    const inputRef = useRef<any>(null);

    const getIntialTodos = () => {
        fetch('http://localhost:4000/api/todos')
            .then((res: any) => res.json())
            .then((data: any) => {
                setTodos(data);
            });
    };

    const receiveTodo = (newTodo: string) => {
        setTodos([newTodo, ...todos]);
    };

    const sendTodo = () => {
        socket?.emit('sendTodo', todo);
        setTodo('');
    };

    const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
        event
    ) => {
        if (event.key === 'Enter') {
            sendTodo();
        }
    };

    const handleInputChange =
        (setState: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setState(event.target.value);
        };

    //socket connection
    useEffect(() => {
        const newSocket = io('http://192.168.1.59:6000');
        setSocket(newSocket);
    }, [setSocket]);

    //listen todos
    useEffect(() => {
        inputRef.current.focus();
        socket?.on('receiveTodo', (todo: string) => {
            receiveTodo(todo);
        });

        return () => {
            socket?.off('receiveTodo', receiveTodo);
        };
    }, [receiveTodo]);

    //initial todos
    // useEffect(() => {
    //     getIntialTodos();
    // }, []);

    return (
        <div className="container">
            <input
                type="text"
                placeholder="Add todo"
                value={todo}
                onChange={handleInputChange(setTodo)}
                onKeyDown={handleKeyPress}
                ref={inputRef}
            />
            <div className="content">
                {todos.map((todo: string, key: number) => (
                    <p key={key} className="content__item">
                        {todo}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default App;

// import { useEffect, useRef, useState } from 'react';
// import io, { Socket } from 'socket.io-client';
// import MessageInput from './MessageInput';
// import Messages from './Messages';

// function App() {
//     const [socket, setSocket] = useState<Socket>();
//     const [messages, setMessages] = useState<string[]>([]);

//     const send = (value: string) => {
//         socket?.emit('message', value);
//     };

//     const messageListener = (message: string) => {
//         console.log(message);
//         setMessages([...messages, message]);
//     };

//     const handleKeyPress = (
//         event: React.KeyboardEvent<HTMLInputElement>,
//         val: any
//     ) => {
//         if (event.key === 'Enter') {
//             send(val);
//         }
//     };

//     useEffect(() => {
//         const newSocket = io('http://localhost:8003');
//         setSocket(newSocket);
//     }, [setSocket]);

//     useEffect(() => {
//         socket?.on('response', messageListener);

//         return () => {
//             socket?.off('response', messageListener);
//         };
//     }, [messageListener]);

//     return (
//         <>
//             <MessageInput handleKeyPress={handleKeyPress} />
//             <Messages messages={messages} />
//         </>
//     );
// }
// export default App;
