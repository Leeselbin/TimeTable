import React from 'react';
import styled from 'styled-components';

type ButtonWrapProps = {
    isActive: boolean;
};

const ButtonWrap = styled.button<ButtonWrapProps>`
    width: 120px;
    height: 40px;
    display: flex;
    border: none;
    font-size: 16px;
    background-color: white;
    color: ${(props) => (props.isActive ? 'red' : 'grey')};
    border-bottom: ${(props) => (props.isActive ? '1px solid red' : 'none')};
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        color: ${(props) => (props.isActive ? 'darkred' : 'black')};
    }
`;

type Props = {
    isActive: boolean;
    buttonText: string;
    callBack: () => void;
};

const TextButton = ({ isActive, buttonText, callBack }: Props) => {
    return (
        <ButtonWrap onClick={callBack} isActive={isActive}>
            <p>{buttonText}</p>
        </ButtonWrap>
    );
};

export default TextButton;
