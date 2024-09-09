import dayjs from 'dayjs';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ClassData, ClassTime, ClassType } from '../../pages/TimetablePage';
import _ from 'lodash';

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
    width: 400px;
    height: 250px;
    border-radius: 8px;
    background-color: #fdfeff;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 100px;
`;

const SelectBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 200px;
    margin-top: 10px;
    justify-content: space-between;
`;

const ButtonContainer = styled.div`
    width: 250px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 40px;
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

const Select = styled.select<{ isError: boolean }>`
    border: 1px solid ${(props) => (props.isError ? 'red' : '#ccc')};
    padding: 8px;
    border-radius: 4px;
`;

// 시간 생성
const generateHours = (addClassType: string) => {
    let start: number, end: number;

    switch (addClassType) {
        case 'morning':
            start = 0;
            end = 11;
            break;
        case 'afternoon':
            start = 13;
            end = 17;
            break;
        case 'evening':
            start = 19;
            end = 23;
            break;
        default:
            start = 0;
            end = 23;
            break;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString().padStart(2, '0'));
};

// 분 생성
const generateMinutes = () => {
    return Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
};

type Props = {
    addClassType: ClassType;
    setIsVisibleAddClassModal: Dispatch<SetStateAction<boolean>>;
    classInfo: ClassData[];
    setClassInfo: Dispatch<SetStateAction<ClassData[]>>;
};

const AddClassModal = ({ addClassType, setIsVisibleAddClassModal, classInfo, setClassInfo }: Props) => {
    const [startHour, setStartHour] = useState(
        addClassType === 'morning' ? '00' : addClassType === 'afternoon' ? '13' : '19'
    );
    const [startMinute, setStartMinute] = useState('00');
    const [endHour, setEndHour] = useState(
        addClassType === 'morning' ? '00' : addClassType === 'afternoon' ? '13' : '19'
    );
    const [endMinute, setEndMinute] = useState('00');

    const [isError, setIsError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const hours = generateHours(addClassType);
    const minutes = generateMinutes();

    const today = dayjs().format('YYYY-MM-DD');

    const handleStartHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStartHour(event.target.value);
    };

    const handleStartMinuteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStartMinute(event.target.value);
    };

    const handleEndHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEndHour(event.target.value);
    };

    const handleEndMinuteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEndMinute(event.target.value);
    };

    const getStartDateTime = () => {
        return dayjs(`${today} ${startHour}:${startMinute}`).format('YYYY-MM-DD HH:mm');
    };

    const getEndDateTime = () => {
        return dayjs(`${today} ${endHour}:${endMinute}`).format('YYYY-MM-DD HH:mm');
    };

    const handleError = () => {
        setIsError(true);
        setTimeout(() => {
            setIsError(false);
        }, 2000);
    };

    const isExistDuplicateTime = (startTime: string, endTime: string, classList: ClassTime[]): boolean => {
        const newStart = dayjs(startTime);
        const newEnd = dayjs(endTime);

        return classList.some(({ startTime, endTime }) => {
            const existingStart = dayjs(startTime);
            const existingEnd = dayjs(endTime);

            // Check if the new range overlaps with any existing range
            return newStart.isBefore(existingEnd) && newEnd.isAfter(existingStart);
        });
    };

    // 유효성 검증
    const saveValidationCheck = () => {
        const startTime = getStartDateTime();
        const endTime = getEndDateTime();

        if (dayjs(startTime).isAfter(dayjs(endTime))) {
            handleError();
            setErrorMsg('시작시간이 종료시간보다 클수 없습니다');
            return;
        }

        if (dayjs(startTime).isSame(dayjs(endTime))) {
            handleError();
            setErrorMsg('시작시간과 종료시간이 같습니다');
            return;
        }

        const cloneClassInfo = _.cloneDeep(classInfo);
        const findIndex = cloneClassInfo.findIndex((item) => item.isActive === true);
        if (cloneClassInfo[findIndex]) {
            if (isExistDuplicateTime(startTime, endTime, cloneClassInfo[findIndex].classList)) {
                handleError();
                setErrorMsg('시간이 중복된 수업이 존재합니다');
                return;
            } else {
                cloneClassInfo[findIndex].classList.push({
                    startTime,
                    endTime,
                });
                setClassInfo(cloneClassInfo);
            }
        }

        setIsVisibleAddClassModal(false);
    };

    return (
        <ModalOverLay>
            <ModalInner>
                <p>{addClassType === 'morning' ? '오전' : addClassType === 'afternoon' ? '오후' : '저녁'} 시간추가</p>
                <SelectContainer>
                    <SelectBox>
                        <label>시작 시간:</label>
                        <Select isError={isError} value={startHour} onChange={handleStartHourChange}>
                            {hours.map((hour) => (
                                <option key={hour} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </Select>
                        :
                        <Select isError={isError} value={startMinute} onChange={handleStartMinuteChange}>
                            {minutes.map((minute) => (
                                <option key={minute} value={minute}>
                                    {minute}
                                </option>
                            ))}
                        </Select>
                    </SelectBox>
                    <SelectBox>
                        <label>종료 시간:</label>
                        <Select isError={isError} value={endHour} onChange={handleEndHourChange}>
                            {hours.map((hour) => (
                                <option key={hour} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </Select>
                        :
                        <Select isError={isError} value={endMinute} onChange={handleEndMinuteChange}>
                            {minutes.map((minute) => (
                                <option key={minute} value={minute}>
                                    {minute}
                                </option>
                            ))}
                        </Select>
                    </SelectBox>

                    {isError && errorMsg && <p style={{ fontSize: 14, color: 'red' }}>{errorMsg}</p>}
                </SelectContainer>

                <ButtonContainer>
                    <CancelButton onClick={() => setIsVisibleAddClassModal(false)}>
                        <p>취소</p>
                    </CancelButton>
                    <ConfirmButton onClick={saveValidationCheck}>
                        <p>저장</p>
                    </ConfirmButton>
                </ButtonContainer>
            </ModalInner>
        </ModalOverLay>
    );
};

export default AddClassModal;
