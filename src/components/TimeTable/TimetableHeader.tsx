import React from 'react';
import styled from 'styled-components';
import TextButton from '../Button/TextButton';
import { ClassData } from '../../pages/TimetablePage';
import ToggleButton from '../Button/ToggleButton';

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    width: 994px;
    height: 40px;
    border-bottom: 0.5px solid grey;
    align-items: center;
`;

const LeftItems = styled.div`
    display: flex;
    align-items: center;
`;

const RightItems = styled.div`
    display: flex;
    align-items: center;
    width: 250px;
    justify-content: space-between;
`;

type Props = {
    classInfo: ClassData[];
    onClickClassButton: (className: string) => void;
    unifyAllSchedulesButton: boolean;
    onClickToggleButton: () => void;
};

const TimetableHeader = ({ classInfo, onClickClassButton, unifyAllSchedulesButton, onClickToggleButton }: Props) => {
    return (
        <Header>
            <LeftItems>
                {classInfo &&
                    classInfo.map((item, index) => {
                        return (
                            <TextButton
                                key={index + item.className}
                                isActive={item.isActive}
                                buttonText={item.className}
                                callBack={() => onClickClassButton(item.className)}
                            />
                        );
                    })}
            </LeftItems>
            <RightItems>
                <ToggleButton isActive={unifyAllSchedulesButton} toggleSwitch={onClickToggleButton} />
                <p>모든 교실 동일 시간표 적용</p>
            </RightItems>
        </Header>
    );
};

export default TimetableHeader;
