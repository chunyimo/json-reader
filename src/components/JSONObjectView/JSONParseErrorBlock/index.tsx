import React from 'react';

export interface IJSONParseErrorBlockProps {
    errorMessage: string;
}


const JSONParseErrorBlock = React.memo((props: IJSONParseErrorBlockProps) => {
    const { errorMessage } = props;
    return (
        <div>{errorMessage}</div>
    )
})

export default JSONParseErrorBlock;