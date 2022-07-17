import React, { useCallback, useEffect, useState } from 'react';
import JSONParseErrorBlock from './JSONParseErrorBlock';
import ObjectViewBlock from './ObjectViewBlock';
import { EEditJSONObjectType, IEditJSONObjectParams } from './interface';
import produce from "immer";
import { get, set } from 'lodash';
import { safeParse } from '../../utils';
import copy from 'copy-to-clipboard';
import './index.css';

export interface IJSONObjectViewProps {
    jsonStr: string;
}

const JSONObjectView = React.memo((props: IJSONObjectViewProps) => {
    const { jsonStr } = props;
    const [jsonObj, setJsonObj] = useState<Record<string, unknown>>({});
    const [parseError, setParseError] = useState<string|undefined>(undefined);
    const [selectedKey, setSelectedKey] = useState<string|undefined>(undefined);

    const handleSetSelectedKey = useCallback((selectedKey: string) => {
        setSelectedKey(selectedKey);
    }, []);

    const handleEditJSONObject: (params: IEditJSONObjectParams) => void = useCallback((params) => {
        const { key, type } = params;
        if (type === EEditJSONObjectType.parse) {
            setJsonObj(produce(draft => {
                const jsonStr = get(draft, key) as string;
                set(draft, key, safeParse(jsonStr));
            }))
        } else if(type === EEditJSONObjectType.copy) {
            console.log('copy value: ');
            const value = get(jsonObj, key);
            console.log(typeof JSON.stringify(value));
            copy(JSON.stringify(value), {debug: true, message: 'Copy'});
        }
    }, [jsonObj]);

    useEffect(() => {
        try {
            let res = JSON.parse(jsonStr);
            setJsonObj(res);
        } catch (error) {
            setParseError(JSON.stringify(error));
        }
    }, [])
    return (
        <div className="json-object-view">
            <div className="json-object-view-content">
                {
                    parseError && <JSONParseErrorBlock errorMessage={parseError} />
                }
                {
                    !parseError && <ObjectViewBlock editJSONObject={handleEditJSONObject} isLast={true} valueKey='' baseKey='' viewData={jsonObj} selectedKey={selectedKey} setSelectedKey={handleSetSelectedKey} />
                }
            </div>
            <div className="json-object-view-selected-key">{selectedKey}</div>
        </div>
    )
});

export default JSONObjectView;