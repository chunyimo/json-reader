import { toPairs } from 'lodash';
import React, { useCallback, useRef, useState } from 'react';
import { jsonReaderStyle } from '../../../configs';
import ArrayViewBlock from '../ArrayViewBlock';
import { IViewBlockProps } from '../interface';
import TextViewBlock from '../TextViewBlock';
import ViewBlockBox from '../ViewBlockBox';
import './index.css';

export interface IObjectViewBlockProps extends IViewBlockProps<Record<string, unknown>> {

}

const ObjectViewBlock = React.memo((props: IObjectViewBlockProps) => {
    const { valueKey, baseKey, viewData, isLast, selectedKey, setSelectedKey, editJSONObject } = props;

    return (
        <ViewBlockBox useFold editJSONObject={editJSONObject} valueKey={valueKey} baseKey={baseKey} viewData={viewData}  selectedKey={selectedKey} setSelectedKey={setSelectedKey}>
            <div className="object-view-block" >
                <div className="key-label">
                    {
                        valueKey && <div style={{ color: jsonReaderStyle.jsonObjectKeyColorLight }}>{`"${valueKey}":`}&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    }
                    <div className='left-brace'>{`{`}</div>
                </div>
                <div className='key-content'>
                    {
                        toPairs(viewData).map(([key, value], index, arr) => {
                            if (Object.prototype.toString.call(value) === "[object Array]") {
                                return <ArrayViewBlock editJSONObject={editJSONObject} selectedKey={selectedKey} setSelectedKey={setSelectedKey} valueKey={key} baseKey={baseKey ? `${baseKey}.${key}` : `${key}`} viewData={value as Array<unknown>} isLast={index === arr.length - 1} />
                            } else if (Object.prototype.toString.call(value) === "[object Object]") {
                                return <ObjectViewBlock editJSONObject={editJSONObject} selectedKey={selectedKey} setSelectedKey={setSelectedKey} valueKey={key} baseKey={baseKey ? `${baseKey}.${key}` : `${key}`} viewData={value as Record<string, unknown>} isLast={index === arr.length - 1} />
                            } else {
                                return <TextViewBlock editJSONObject={editJSONObject} selectedKey={selectedKey} setSelectedKey={setSelectedKey} valueKey={key} baseKey={baseKey ? `${baseKey}.${key}` : `${key}`} viewData={value} isLast={index === arr.length - 1} />
                            }
                        })
                    }
                </div>
                <div>
                    <div className='right-brace'>{`}`}{!isLast ? ',' : null}</div>
                </div>
            </div>
        </ViewBlockBox>

    )
})

export default ObjectViewBlock;