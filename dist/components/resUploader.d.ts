import * as React from 'react';
export interface ResUploaderProps {
    className?: string;
    multiple?: boolean;
    maxSize?: number;
    onFilesChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare class ResUploader extends React.Component<ResUploaderProps> {
    private fileInput;
    upload: () => Promise<string>;
    render(): JSX.Element;
}
interface ImageUploaderProps {
    id?: string | number;
    label?: string;
    onSaved?: (imageId: string) => Promise<void>;
}
export declare class ImageUploader extends React.Component<ImageUploaderProps> {
    private resUploader;
    private isChanged;
    private resId;
    private overSize;
    private upload;
    private onSaved;
    render(): JSX.Element;
}
export {};
