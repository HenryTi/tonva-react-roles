import * as React from 'react';
export interface ResUploaderProps {
    className?: string;
    label?: string;
    multiple?: boolean;
    maxSize?: number;
    onFilesChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare class ResUploader extends React.Component<ResUploaderProps> {
    private fileInput;
    private fileName;
    buildFormData(): FormData;
    getFile0(): File;
    upload: (formData?: FormData) => Promise<string | {
        error: any;
    }>;
    private onFilesChange;
    render(): JSX.Element;
}
interface ImageUploaderProps {
    id?: string;
    label?: string;
    size?: 'sm' | 'lg';
    onSaved?: (imageId: string) => Promise<void>;
}
export declare class ImageUploader extends React.Component<ImageUploaderProps> {
    private imgBaseSize;
    private file;
    private suffix;
    private resUploader;
    private isChanged;
    private resId;
    private enableUploadButton;
    private srcImage;
    private desImage;
    private fileError;
    constructor(props: ImageUploaderProps);
    private onFileChange;
    private compress;
    private convertBase64UrlToBlob;
    private upload;
    private onSaved;
    render(): JSX.Element;
}
export {};
