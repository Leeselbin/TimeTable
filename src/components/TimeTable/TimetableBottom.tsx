import React from 'react';
import styled from 'styled-components';

const BottomTimeRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: flex-start;
`;

const TimeRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 319px;
    margin-left: 17px;
`;

const TimeRow = styled.div`
    width: 105px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid grey;
`;

const TimetableBottom = () => {
    return (
        <BottomTimeRow>
            <TimeRowContainer>
                <p>점심</p>
                <TimeRow>
                    <p>{'12:00'}</p>
                </TimeRow>
                <p>{' - '}</p>
                <TimeRow>
                    <p>{'13:00'}</p>
                </TimeRow>
            </TimeRowContainer>

            <TimeRowContainer>
                <p>저녁</p>
                <TimeRow>
                    <p>{'18:00'}</p>
                </TimeRow>
                <p>{' - '}</p>
                <TimeRow>
                    <p>{'19:00'}</p>
                </TimeRow>
            </TimeRowContainer>
        </BottomTimeRow>
    );
};

export default TimetableBottom;
