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
    fileName: string;
    constructor(props: ResUploaderProps);
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
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'raw';
    onSaved?: (imageId: string) => Promise<void>;
    imageTypes?: string[];
}
export declare class ImageUploader extends React.Component<ImageUploaderProps> {
    private static imageTypes;
    private imgBaseSize;
    private imageTypes;
    private suffix;
    private resUploader;
    file: File;
    desImgWidth: number;
    desImgHeight: number;
    desImgSize: number;
    srcImgWidth: number;
    srcImgHeight: number;
    isChanged: boolean;
    resId: string;
    enableUploadButton: boolean;
    srcImage: string;
    desImage: string;
    fileError: string;
    uploaded: boolean;
    constructor(props: ImageUploaderProps);
    private onFileChange;
    private setSize;
    private compress;
    private convertBase64UrlToBlob;
    private upload;
    private onSaved;
    private showOrgImage;
    private levelDiv;
    render(): JSX.Element;
}
interface AudioUploaderProps {
    id?: string;
    label?: string;
    onSaved?: (imageId: string) => Promise<void>;
}
export declare class AudioUploader extends React.Component<AudioUploaderProps> {
    private static audioTypes;
    private suffix;
    private resUploader;
    content: string;
    file: File;
    fileSize: number;
    isChanged: boolean;
    resId: string;
    enableUploadButton: boolean;
    fileError: string;
    uploaded: boolean;
    uploading: boolean;
    constructor(props: AudioUploaderProps);
    private onFileChange;
    private convertBase64UrlToBlob;
    private upload;
    private onSaved;
    render(): JSX.Element;
}
export {};
