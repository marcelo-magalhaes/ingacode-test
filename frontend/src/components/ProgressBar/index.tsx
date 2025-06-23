import React from 'react';
import styled from 'styled-components';

interface BarProps {
    $width: string;
}


const Bar = styled.div<BarProps>`
    width: ${(props) => props.$width || 0};
    height: 10px;
    border-radius: 10px;
    background-color:  ${(props) => props.color || '#FFF'};
`




export default function ProgressBar(params: {progress: string | null}) {
    return (
        <>
            <Bar $width={'50%'} >
                <Bar $width={`${params.progress}%`} color={"red"}>
                </Bar> 
            </Bar>
            <p>{params.progress}% uploaded</p>
        </>
    );
}