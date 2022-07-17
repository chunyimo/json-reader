import React, { useState } from 'react';
import { jsonReaderStyle } from '../../../configs';
import { IViewBlockProps } from '../interface';
import ObjectViewBlock from '../ObjectViewBlock';
import TextViewBlock from '../TextViewBlock';
import ViewBlockBox from '../ViewBlockBox';
import './index.css';

export interface IArrayViewBlockProps extends IViewBlockProps<Array<unknown>> {

}

const ArrayViewBlock = React.memo((props: IArrayViewBlockProps) => {
    const { valueKey, baseKey, viewData, isLast, selectedKey, setSelectedKey, editJSONObject } = props;

    return (
        <ViewBlockBox useFold editJSONObject={editJSONObject} valueKey={valueKey} baseKey={baseKey} viewData={viewData}  selectedKey={selectedKey} setSelectedKey={setSelectedKey}>
            <div className="array-view-block" >
                <div className="key-label"><div style={{ color: jsonReaderStyle.jsonObjectKeyColorLight }}>{`"${valueKey}":`}&nbsp;&nbsp;&nbsp;&nbsp;</div><div className='left-square-bracket'>{`[`}</div></div>
                <div className='key-content'>
                    {
                        viewData.map((value, index, arr) => {
                            if (Object.prototype.toString.call(value) === "[object Array]") {
                                return <ArrayViewBlock key={baseKey ? `${baseKey}[${index}]` : `[${index}]`} editJSONObject={editJSONObject} selectedKey={selectedKey} setSelectedKey={setSelectedKey} valueKey={''} baseKey={baseKey ? `${baseKey}[${index}]` : `[${index}]`} viewData={value as Array<unknown>} isLast={index === arr.length - 1} />
                            } else if (Object.prototype.toString.call(value) === "[object Object]") {
                                return <ObjectViewBlock key={baseKey ? `${baseKey}[${index}]` : `[${index}]`} editJSONObject={editJSONObject} selectedKey={selectedKey} setSelectedKey={setSelectedKey} valueKey={''} baseKey={baseKey ? `${baseKey}[${index}]` : `[${index}]`} viewData={value as Record<string, unknown>} isLast={index === arr.length - 1} />
                            } else {
                                return <TextViewBlock key={baseKey ? `${baseKey}[${index}]` : `[${index}]`} editJSONObject={editJSONObject} selectedKey={selectedKey} setSelectedKey={setSelectedKey} valueKey={''} baseKey={baseKey ? `${baseKey}[${index}]` : `[${index}]`} viewData={value} isLast={index === arr.length - 1} />
                            }
                        })
                    }
                </div>
                <div>
                    <div className='left-square-bracket'>{`]`}{!isLast ? ',' : null}</div>
                </div>
            </div>
        </ViewBlockBox>
    )
});

export default ArrayViewBlock;