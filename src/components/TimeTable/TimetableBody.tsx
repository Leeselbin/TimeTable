import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ClassData, ClassTime, ClassType } from '../../pages/TimetablePage';
import dayjs from 'dayjs';
import ScheduleItem from './ScheduleItem';
import _ from 'lodash';

const Body = styled.div`
    display: flex;
    width: 994px;
    justify-content: space-between;
    margin-top: 20px;
`;

type CategorizedClassData = {
    morning: ClassTime[];
    afternoon: ClassTime[];
    evening: ClassTime[];
};

type Props = {
    classInfo: ClassData[];
    onClickDeleteModal: (startTime: string) => void;
    onClickAddClassModal: (classType: ClassType) => void;
};

const TimetableBody = ({ classInfo, onClickDeleteModal, onClickAddClassModal }: Props) => {
    const [classList, setClassList] = useState<ClassTime[]>([]);

    // 오전 오후 저녁 분류
    const categorizeByTime = (classList: ClassTime[]): CategorizedClassData => {
        const morning: ClassTime[] = [];
        const afternoon: ClassTime[] = [];
        const evening: ClassTime[] = [];

        classList.forEach(({ startTime, endTime, id }) => {
            const start = dayjs(startTime);
            const hour = start.hour();

            if (hour < 12) {
                morning.push({ startTime, endTime, id });
            } else if (hour >= 13 && hour < 19) {
                afternoon.push({ startTime, endTime, id });
            } else {
                evening.push({ startTime, endTime, id });
            }
        });

        return { morning, afternoon, evening };
    };

    // 몇교시인지 id값 부여 (시간이 순차적으로 내려온다는 가정하에 그렇지않다면 정렬필요 )
    const reassignIds = (classList: ClassTime[]): ClassTime[] => {
        return classList.map((item, index) => ({
            ...item,
            id: index + 1,
        }));
    };

    const sortClassListByTime = (list: ClassTime[]): ClassTime[] => {
        return list.sort((a, b) => {
            const timeA = dayjs(a.startTime).valueOf();
            const timeB = dayjs(b.startTime).valueOf();
            return timeA - timeB;
        });
    };

    // 최상단에 classInfo에서 교실선택시마다 isActive가 true것을 filter
    useEffect(() => {
        if (classInfo) {
            const findClickItem = classInfo.find((item) => item.isActive === true);
            if (findClickItem) {
                const findClassList: ClassTime[] = sortClassListByTime(findClickItem.classList);
                const addIdsList = reassignIds(findClassList);
                setClassList(addIdsList);
            }
        }
    }, [classInfo]);

    const categorizedData: CategorizedClassData = categorizeByTime(classList);

    return (
        <Body>
            {categorizedData && (
                <>
                    <ScheduleItem
                        headerText="오전(~12:00)"
                        buttonText="+오전 교시 추가"
                        classList={categorizedData.morning}
                        onClickDelete={onClickDeleteModal}
                        onClickAddClass={() => {
                            onClickAddClassModal('morning');
                        }}
                        isDisabled={categorizedData.morning.length > 4}
                    />

                    <ScheduleItem
                        headerText="오후(13:00~)"
                        buttonText="+오후 교시 추가"
                        classList={categorizedData.afternoon}
                        onClickDelete={onClickDeleteModal}
                        onClickAddClass={() => {
                            onClickAddClassModal('afternoon');
                        }}
                        isDisabled={categorizedData.afternoon.length > 4}
                    />

                    <ScheduleItem
                        headerText="저녁(19:00~)"
                        buttonText="+저녁 교시 추가"
                        classList={categorizedData.evening}
                        onClickDelete={onClickDeleteModal}
                        onClickAddClass={() => {
                            onClickAddClassModal('evening');
                        }}
                        isDisabled={categorizedData.evening.length > 4}
                    />
                </>
            )}
        </Body>
    );
};

export default TimetableBody;
