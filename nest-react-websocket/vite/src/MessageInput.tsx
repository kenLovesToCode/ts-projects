import React, { useState } from 'react';

const MessageInput = ({ send }: { send: (val: string) => void }) => {
    const [value, setValue] = useState('');

    return (
        <>
            <input
                type="text"
                placeholder="message here"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={() => send(value)}>send</button>
        </>
    );
};

export default MessageInput;
