import React from 'react';
import styled from 'styled-components';
import { ClassTime } from '../../pages/TimetablePage';
import dayjs from 'dayjs';

const ScheduleItemWrap = styled.div`
    width: 319px;
    height: 450px;
    border: 1px solid grey;
`;

const Header = styled.div`
    width: 100%;
    height: 50px;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Body = styled.div`
    width: 319px;
    height: 350px;
    display: flex;
    flex-direction: column;
`;

const BodyItem = styled.div`
    height: 50px;
    display: flex;
    flex-direction: row;
    padding-right: 10px;
    padding-left: 10px;
    justify-content: space-between;
    align-items: center;
`;

const ClassName = styled.div`
    width: 40px;
`;

const TimeRow = styled.div`
    width: 60px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid grey;
`;

const DeleteButton = styled.button`
    width: 50px;
    height: 30px;
    border-radius: 10px;
    border: none;
    background-color: red;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #c62828;
    }

    &:active {
        background-color: #b71c1c;
        transform: scale(0.95);
    }
`;

const BottomButton = styled.button<{ isDisabled?: boolean }>`
    width: 100%;
    height: 50px;
    background-color: ${(props) => (props.isDisabled ? '#666666' : 'black')};
    color: ${(props) => (props.isDisabled ? '#cccccc' : 'white')};
    display: flex;
    align-items: center;
    border: none;
    justify-content: center;
    cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};
    opacity: ${(props) => (props.isDisabled ? 0.6 : 1)};
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) => (props.isDisabled ? '#666666' : '#333333')};
    }

    &:active {
        background-color: ${(props) => (props.isDisabled ? '#666666' : '#1a1a1a')};
    }

    &:disabled {
        background-color: #666666;
        color: #cccccc;
        cursor: not-allowed;
        opacity: 0.6;
    }
`;

type Props = {
    headerText: string;
    classList: any;
    buttonText: string;
    onClickDelete: (startTime: string) => void;
    onClickAddClass: () => void;
    isDisabled: boolean;
};

const ScheduleItem = ({ headerText, classList, buttonText, onClickDelete, onClickAddClass, isDisabled }: Props) => {
    return (
        <ScheduleItemWrap>
            <Header>
                <p>{headerText}</p>
            </Header>

            <Body>
                {classList &&
                    classList.map((item: ClassTime, index: number) => {
                        return (
                            <BodyItem key={index + item.endTime}>
                                <ClassName>
                                    <p>{`${item?.id}교시`}</p>
                                </ClassName>

                                <TimeRow>
                                    <p>{dayjs(item.startTime).format('HH:mm')}</p>
                                </TimeRow>
                                <p>{' - '}</p>
                                <TimeRow>
                                    <p>{dayjs(item.endTime).format('HH:mm')}</p>
                                </TimeRow>
                                <DeleteButton
                                    onClick={() => {
                                        onClickDelete(item.startTime);
                                    }}
                                >
                                    <p>삭제</p>
                                </DeleteButton>
                            </BodyItem>
                        );
                    })}
            </Body>

            <BottomButton disabled={isDisabled} onClick={() => onClickAddClass()}>
                <p>{buttonText}</p>
            </BottomButton>
        </ScheduleItemWrap>
    );
};

export default ScheduleItem;
