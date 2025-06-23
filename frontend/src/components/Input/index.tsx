import React, { ChangeEvent, useState } from "react";
import {styled} from "styled-components";
import { InputContainer } from "../InputContainer";
import { Button } from "../Button";
import ProgressBar from '../ProgressBar';
import { UploadStatus } from '../../types/status';
import axios from "axios";

const FileInput = styled.input`
    width: 50%;
    border-radius: 10px;
    background-color: #fff;
    color: #000;
    font-weight: bold;
    margin: 5px;

    &::file-selector-button {
        border:none;
        padding: 5px 10px;
        background-color: #e9334e;
        color: #000;
        font-weight: bold;
        font-size: 16px;
    }
`

export default function Input({metricsResult, setMetricsResult}) {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const handleChange = async (element: ChangeEvent<HTMLInputElement>) => {
        const file:File = element.target.files?.[0];
        if (file) {
            if (file.type !== 'application/json') {
                alert('Please upload a JSON file');
                setFile(null);
            }

            setFile(file);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            alert('Please select a file first');
            return;
        }

        setStatus('uploading');
        setUploadProgress(0);

        const reader:FileReader = new FileReader();

        reader.onload = async (e) => {
            try {
                if (!e.target?.result) {
                    throw new Error('File reading failed');
                }

                const fileContent:string = e.target.result.toString();

                const jsonData = JSON.parse(fileContent);

                const response = await axios.post('http://localhost:3333/api', JSON.stringify(jsonData), {
                    headers: {
                        "Content-Type":"application/json"
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = progressEvent.total ? 
                        Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        : 0;
                        setUploadProgress(progress);
                    }
                });

                let responseStatus: UploadStatus;
                let uploadProgressFinal: number;
                if (response.status === 200) {
                     responseStatus = 'success';
                     setMetricsResult(response.data);
                     console.log(response.data);
                     uploadProgressFinal = 100;
                } else {
                    responseStatus = 'error';
                    uploadProgressFinal = 0;
                }

                setUploadProgress(uploadProgressFinal);
                setStatus(responseStatus);
            } catch (error: any) {
                console.error('error');
                setStatus('error');
            }
        }

        reader.readAsText(file)
        
    }
    return (
        <InputContainer>
            <FileInput 
                type="file" 
                onChange={handleChange}
            />
            {file && status !== 'uploading' && <Button type="submit" onClick={handleSubmit}>Submit</Button>}

            {status === 'success' && <p>Upload efetuado com sucesso</p>}
            {status === 'error' && <p>Erro no upload</p>}
            {status === 'uploading' && <ProgressBar progress={uploadProgress.toString()}/>}
        </InputContainer>
    );
}