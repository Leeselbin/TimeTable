import React, { useState } from 'react';
import styled from 'styled-components';
import TimetableHeader from '../components/TimeTable/TimetableHeader';
import TimetableBody from '../components/TimeTable/TimetableBody';
import _ from 'lodash';
import NormalModal from '../components/Modal/NormalModal';
import AddClassModal from '../components/Modal/AddClassModal';
import TimetableBottom from '../components/TimeTable/TimetableBottom';

const PageWrap = styled.div`
    width: 1024px;
    margin-top: 100px;
    padding-top: 20px;
    padding-bottom: 20px;
    border: 1px solid grey;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export type ClassTime = {
    startTime: string;
    endTime: string;
    id?: number;
};

export type ClassData = {
    className: string;
    isActive: boolean;
    classList: ClassTime[];
};

export type ClassType = 'morning' | 'afternoon' | 'evening';

// 더미데이터
let ClassDataArr: ClassData[] = [
    {
        className: '2A-1 (201~)',
        isActive: true,
        classList: [
            { startTime: '2024-09-09 08:00', endTime: '2024-09-09 08:50' },
            { startTime: '2024-09-09 09:00', endTime: '2024-09-09 09:50' },
            { startTime: '2024-09-09 13:00', endTime: '2024-09-09 13:50' },
            { startTime: '2024-09-09 14:00', endTime: '2024-09-09 14:50' },
            { startTime: '2024-09-09 19:10', endTime: '2024-09-09 19:50' },
            { startTime: '2024-09-09 20:00', endTime: '2024-09-09 20:50' },
        ],
    },
    {
        className: '3B-1 (301~)',
        isActive: false,
        classList: [{ startTime: '2024-09-09 08:00', endTime: '2024-09-09 08:50' }],
    },
    {
        className: '2A-2 (401~)',
        isActive: false,
        classList: [{ startTime: '2024-09-09 08:00', endTime: '2024-09-09 08:50' }],
    },
];

const TimetablePage = () => {
    const [classInfo, setClassInfo] = useState<ClassData[]>(ClassDataArr);
    const [unifyAllSchedulesButton, setUnifyAllSchedulesButton] = useState<boolean>(false);

    const [deleteStartTime, setDeleteStartTime] = useState<string>('');
    const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState<boolean>(false);

    const [addClassType, setAddClassType] = useState<ClassType>('morning');
    const [isVisibleAddClassModal, setIsVisibleAddClassModal] = useState<boolean>(false);

    // 상단 교실버튼 클릭이벤트
    const onClickClassButton = (className: string) => {
        const cloneClassInfo = _.cloneDeep(classInfo);
        if (cloneClassInfo && cloneClassInfo.length > 0) {
            const findIndex = cloneClassInfo.findIndex((item) => item.className === className);
            for (let i = 0; i < cloneClassInfo.length; i++) {
                cloneClassInfo[i].isActive = false;
            }

            cloneClassInfo[findIndex].isActive = true;

            setClassInfo(cloneClassInfo);
        }
    };

    // 토글버튼 클릭이벤트
    const onClickToggleButton = () => {
        setUnifyAllSchedulesButton(!unifyAllSchedulesButton);
    };

    // 현재는 임시로 startTime으로 찾아서 삭제하지만 특정 key값이 필요 백앤드에서 줄것으로 기대
    const DeleteClass = () => {
        const cloneClassInfo = _.cloneDeep(classInfo);
        const findIndex = cloneClassInfo.findIndex((item) => item.isActive === true);

        if (cloneClassInfo[findIndex]) {
            const findClassList: ClassTime[] = cloneClassInfo[findIndex].classList;

            const filterClassList = findClassList.filter((item) => item.startTime !== deleteStartTime);
            cloneClassInfo[findIndex].classList = filterClassList;
            setClassInfo(cloneClassInfo);
        }
    };

    // 삭제버튼 클릭 이벤트
    const onClickDeleteModal = (startTime: string) => {
        setDeleteStartTime(startTime);
        setIsVisibleDeleteModal(true);
    };

    // 교시 추가 버튼 클릭이벤트
    const onClickAddClassModal = (classType: ClassType) => {
        setAddClassType(classType);
        setIsVisibleAddClassModal(true);
    };

    return (
        <PageWrap>
            <TimetableHeader
                classInfo={classInfo}
                onClickClassButton={onClickClassButton}
                unifyAllSchedulesButton={unifyAllSchedulesButton}
                onClickToggleButton={onClickToggleButton}
            />
            <TimetableBody
                classInfo={classInfo}
                onClickDeleteModal={onClickDeleteModal}
                onClickAddClassModal={onClickAddClassModal}
            />
            <TimetableBottom />

            {isVisibleDeleteModal && (
                <NormalModal
                    title={'삭제'}
                    content={'해당 수업을 삭제하시겠습니까?'}
                    cancelCallBack={() => {
                        setIsVisibleDeleteModal(false);
                        setDeleteStartTime('');
                    }}
                    confirmCallBack={() => {
                        DeleteClass();
                        setIsVisibleDeleteModal(false);
                        setDeleteStartTime('');
                    }}
                />
            )}

            {isVisibleAddClassModal && (
                <AddClassModal
                    addClassType={addClassType}
                    setIsVisibleAddClassModal={setIsVisibleAddClassModal}
                    classInfo={classInfo}
                    setClassInfo={setClassInfo}
                />
            )}
        </PageWrap>
    );
};

export default TimetablePage;
