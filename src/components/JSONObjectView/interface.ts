export enum EEditJSONObjectType {
    delete = 'delete',
    parse = 'parse',
    copy = 'copy'
}

export interface IEditJSONObjectParams {
    key: string;
    value?: any;
    type: EEditJSONObjectType;
}
export interface IViewBlockProps<T> {
    valueKey: string;
    baseKey: string;
    viewData: T;
    isLast: boolean;
    selectedKey: string | undefined;
    setSelectedKey: (selectedKey: string) => void;
    editJSONObject: (params: IEditJSONObjectParams) => void;
}