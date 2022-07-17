import React, { useState } from 'react';
import { jsonReaderStyle } from '../../../configs';
import { IViewBlockProps } from '../interface';
import ViewBlockBox from '../ViewBlockBox';
import './index.css';

export interface ITextViewBlockProps extends IViewBlockProps<unknown> {

}

const TextViewBlock = React.memo((props: ITextViewBlockProps) => {
    const { valueKey, baseKey, viewData, isLast, selectedKey, setSelectedKey, editJSONObject } = props;

    return (
        <ViewBlockBox editJSONObject={editJSONObject} valueKey={valueKey} baseKey={baseKey} viewData={viewData} selectedKey={selectedKey} setSelectedKey={setSelectedKey}>
            <div className="text-view-block" >
                {
                    valueKey && <div className='key-label' style={{ color: jsonReaderStyle.jsonObjectKeyColorLight }}>{`"${valueKey}":`}&nbsp;&nbsp;&nbsp;&nbsp;</div>
                }
                <div style={{ color: jsonReaderStyle.jsonObjectValueColorLight }}>{typeof viewData === 'string' ? `"${viewData}"` : viewData as any}{!isLast && ','}</div>
            </div>
        </ViewBlockBox>
    )
});

export default TextViewBlock;