// import { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';
// import './App.css';

// function App() {
//     const socket = io('http://localhost:8002');
//     const [todos, setTodos] = useState<string[]>([]);
//     const [todo, setTodo] = useState('');
//     const inputRef = useRef<any>(null);

//     useEffect(() => {
//         inputRef.current.focus();
//         socket.on('receiveTodo', (todo: any) => {
//             alert('received');
//             receiveTodo(todo);
//         });

//         getIntialTodos();
//     }, []);

//     const getIntialTodos = () => {
//         fetch('http://localhost:5099/api/todos')
//             .then((res: any) => res.json())
//             .then((data: any) => {
//                 setTodos(data);
//             });
//     };

//     const receiveTodo = (todo: any) => {
//         const newTodos = [...todos, todo];
//         setTodos(newTodos);
//     };

//     const sendTodo = () => {
//         console.log('sending todo ', todo);
//         socket.emit('sendTodo', todo);
//         setTodo('');
//     };

//     const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
//         event
//     ) => {
//         if (event.key === 'Enter') {
//             // setTodos((prevTodos) => [todo, ...prevTodos]);
//             // setTodo('');
//             sendTodo();
//         }
//     };

//     const handleInputChange =
//         (setState: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
//             setState(event.target.value);
//         };

//     return (
//         <div className="container">
//             <input
//                 type="text"
//                 placeholder="Add todo"
//                 value={todo}
//                 onChange={handleInputChange(setTodo)}
//                 onKeyDown={handleKeyPress}
//                 ref={inputRef}
//             />
//             <div className="content">
//                 {todos.map((todo: string, key: number) => (
//                     <p key={key} className="content__item">
//                         {todo}
//                     </p>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default App;

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import MessageInput from './MessageInput';
import Messages from './Messages';

function App() {
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<string[]>([]);

    const send = (value: string) => {
        socket?.emit('message', value);
    };

    const messageListener = (message: string) => {
        setMessages([...messages, message]);
    };

    useEffect(() => {
        const newSocket = io('http://localhost:8001');
        setSocket(newSocket);
    }, [setSocket]);

    useEffect(() => {
        socket?.on('message', messageListener);

        return () => {
            socket?.off('message', messageListener);
        };
    }, [messageListener]);

    return (
        <>
            <MessageInput send={send} />
            <Messages messages={messages} />
        </>
    );
}
export default App;
