import styled from "styled-components";

interface ButtonProps {
    $width?: string; 
}
export const Button = styled.button<ButtonProps>`
    background-color: #e9334e;
    width: ${props => props.$width || 'fit-content'};
    padding: 15px 10px;
    color: #FFF;
    font-weight: bold;
    border-radius: 10px;
    border: none;
    transition: ease-in-out opacity 0.2s;
    
    
    &:hover {
        opacity: 0.8;
    }
`