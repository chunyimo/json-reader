import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { EEditJSONObjectType, IEditJSONObjectParams } from '../interface';
import clsx from 'clsx';
import { ReactComponent as DownSvg } from '../../../assets/down.svg';
import './index.css';

export interface IViewBlockBoxProps {
    valueKey: string;
    baseKey: string;
    selectedKey: string | undefined;
    setSelectedKey: (selectedKey: string) => void;
    children: ReactElement;
    editJSONObject: (params: IEditJSONObjectParams) => void;
    useFold?: boolean;
    viewData: any
}

const ViewBlockBox: React.FC<IViewBlockBoxProps> = React.memo((props) => {
    const { children, valueKey, baseKey, selectedKey, setSelectedKey, editJSONObject, useFold, viewData } = props;
    const [showBoxBorder, setShowBoxBorder] = useState(false);
    const [fold, setFold] = useState(false);

    const handleMouseOver: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        e.stopPropagation();
        setShowBoxBorder(true);
    }, [])

    const handleMouseOut: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        e.stopPropagation();
        setShowBoxBorder(false)
    }, [])

    const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        e.stopPropagation();
        setSelectedKey(baseKey);
    }, [valueKey, baseKey])

    const handleParse = useCallback(() => {
        editJSONObject({ key: `${baseKey}`, type: EEditJSONObjectType.parse })
    }, []);

    const handleCopy = useCallback(() => {
        editJSONObject({ key: `${baseKey}`, type: EEditJSONObjectType.copy })
    }, []);


    const dataType = useMemo(() => {
        return Object.prototype.toString.call(viewData).slice(8,-1);
    }, [])

   
    return (
        <div
            className={clsx('view-block-box', { 'view-block-box__border-show': showBoxBorder }, { 'view-block-box__selected': selectedKey === baseKey })}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}

        >
            {
                useFold && <DownSvg onClick={() => setFold(v => !v)} className={clsx('view-block-box-fold-icon', { 'view-block-box-fold-icon__fold': fold})} />
            }
            {
                selectedKey === baseKey && (
                    <div className='view-block-box-tools'>
                        <button onClick={handleCopy}>Copy</button>
                        <button onClick={handleParse}>Parse</button>
                    </div>
                )
            }
            {fold && <div>{dataType === 'Array' ? `[...]${viewData.length} items` : '{...}'}</div>}
            {!fold && children}
        </div>
    )
})

export default ViewBlockBox;