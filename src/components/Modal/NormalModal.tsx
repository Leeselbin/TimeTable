import React from 'react';
import styled from 'styled-components';

const ModalOverLay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00000047;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
`;

const ModalInner = styled.div`
    background: #f5f9ff;
    width: 300px;
    height: 200px;
    border-radius: 8px;
    background-color: #fdfeff;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const TextContainer = styled.div`
    width: 200px;
    height: 100px;
    text-align: center;
`;

const ButtonContainer = styled.div`
    width: 250px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 50px;
    justify-content: space-between;
`;

const CancelButton = styled.button`
    width: 100px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid gray;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        background-color: #e0e0e0;
    }

    &:active {
        background-color: #d0d0d0;
    }
`;

const ConfirmButton = styled.button`
    width: 100px;
    height: 30px;
    background-color: red;
    border-radius: 10px;
    border: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        background-color: #e57373;
    }

    &:active {
        background-color: #c62828;
    }
`;

type Props = {
    title: string;
    content: string;
    cancelCallBack: () => void;
    confirmCallBack: () => void;
};

const NormalModal = ({ title, content, cancelCallBack, confirmCallBack }: Props) => {
    return (
        <ModalOverLay>
            <ModalInner>
                <TextContainer>
                    <p>{title}</p>
                    <p>{content}</p>
                </TextContainer>

                <ButtonContainer>
                    <CancelButton onClick={cancelCallBack}>
                        <p>취소</p>
                    </CancelButton>
                    <ConfirmButton onClick={confirmCallBack}>
                        <p>삭제</p>
                    </ConfirmButton>
                </ButtonContainer>
            </ModalInner>
        </ModalOverLay>
    );
};

export default NormalModal;
