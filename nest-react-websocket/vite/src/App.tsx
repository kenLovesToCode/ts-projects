import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
    const socket = io('http://localhost:5099');
    const [todos, setTodos] = useState<string[]>([]);
    const [todo, setTodo] = useState('');
    const inputRef = useRef<any>(null);

    useEffect(() => {
        inputRef.current.focus();
        socket.on('receiveTodo', (todo: any) => {
            receiveTodo(todo);
        });

        getIntialTodos();
    }, []);

    const getIntialTodos = () => {
        fetch('http://localhost:5099/todos')
            .then((res: any) => res.json())
            .then((data: any) => {
                setTodos(data);
            });
    };

    const receiveTodo = (todo: any) => {
        const newTodos = [...todos, todo];
        setTodos(newTodos);
    };

    const sendTodo = () => {
        socket.emit('sendTodo', todo);
        setTodo('');
    };

    const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
        event
    ) => {
        // if (event.key === 'Enter') {
        //     setTodos((prevTodos) => [todo, ...prevTodos]);
        //     setTodo('');
        // }
        sendTodo();
    };

    const handleInputChange =
        (setState: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setState(event.target.value);
        };

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
                {todos.map((todo: string) => (
                    <p className="content__item">{todo}</p>
                ))}
            </div>
        </div>
    );
}

export default App;
