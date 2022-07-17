import React, { useCallback } from 'react';
import './index.css';

export interface IOriginTextProps {
    onTextChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    value?: string;
}

const OriginText = React.memo((props: IOriginTextProps) => {
    const { onTextChange, value } = props;
    return <div className="origin-text">
        <textarea
          value={value}
          className='origin-text-area-input'
          placeholder="Please copy orign JSON to here"
          onChange={onTextChange}
        />
    </div>
})

export default OriginText;