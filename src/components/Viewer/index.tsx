import React, { useCallback, useEffect, useRef, useState } from 'react';
import { jsonReaderStyle } from '../../configs';
import JSONObjectView from '../JSONObjectView';
import OriginText from '../OriginJson';
import './index.css';

const Viewer = React.memo(() => {
    const [middleDividerOffset, setMiddleDividerOffset] = useState(`calc(50% - ${jsonReaderStyle.middleDividerHotWidth / 2}px)`);
    const [viewerState, setViewerState] = useState<'default' | 'move_middle_divider'>('default');
    const [jsonText, setJsonText] = useState<string|undefined>(undefined);
    const leftViewRef = useRef<HTMLDivElement>(null);
    const cacheBofortMoveMiddleDividerInfoRef = useRef<any>({});

    const handleMouseDown = (e: React.DragEvent<HTMLDivElement>) => {
        cacheBofortMoveMiddleDividerInfoRef.current = {
            pageX: e.pageX,
            leftViewWidth: leftViewRef.current?.getBoundingClientRect().width || 0,
            mouseDown: true,
        }
    }

    const handleMouseMove = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        if (cacheBofortMoveMiddleDividerInfoRef.current.mouseDown) {
            const diff = e.pageX - cacheBofortMoveMiddleDividerInfoRef.current.pageX;
            setMiddleDividerOffset(cacheBofortMoveMiddleDividerInfoRef.current.leftViewWidth + diff);
        }
    }, []);



    const handleMouseUp = (e: React.DragEvent<HTMLDivElement>) => {
        cacheBofortMoveMiddleDividerInfoRef.current = {
            pageX: e.pageX,
            mouseDown: false,
        }
    }

    const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
        setJsonText(e.target.value);
    }, [])


    return <div className="viewer" onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp} style={{userSelect: 'none', cursor: viewerState === 'move_middle_divider' ? 'col-resize' : 'default'}}>
        <div className="left-view" style={{ width: middleDividerOffset }} ref={leftViewRef}>
            <OriginText value={jsonText} onTextChange={handleTextChange} />
        </div>
        <div
            className="middle-divider"
            style={{ width: jsonReaderStyle.middleDividerHotWidth }}
            onMouseDown={handleMouseDown}

        >
            <div className="middle-divider-line" style={{ width: jsonReaderStyle.middleDividerLineWidth }} />
        </div>
        <div className="right-view">
            {jsonText && <JSONObjectView jsonStr={jsonText} /> }
        </div>
    </div>
});

export default Viewer;

