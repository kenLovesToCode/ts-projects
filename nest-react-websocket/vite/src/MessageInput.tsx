import React, { useRef, useState } from 'react';

const MessageInput = ({
    handleKeyPress,
}: {
    handleKeyPress: (e: any, val: any) => any;
}) => {
    const [value, setValue] = useState('');

    return (
        <>
            <input
                type="text"
                placeholder="message here"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, value)}
            />
            <button onClick={(e) => handleKeyPress(e, value)}>send</button>
        </>
    );
};

export default MessageInput;
