import styled from 'styled-components';

const ToggleWrap = styled.div<{ isActive: boolean }>`
    width: 60px;
    height: 30px;
    background-color: ${(props) => (props.isActive ? '#4caf50' : '#ccc')};
    border-radius: 40px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
`;

// 핸들 스타일
const Handle = styled.div<{ isActive: boolean }>`
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: ${(props) => (props.isActive ? 'calc(100% - 29px  )' : '4px')}; // 여백을 포함하여 핸들 위치 조정
    transition: left 0.3s ease-in-out;
`;

type Props = {
    isActive: boolean;
    toggleSwitch: () => void;
};

const ToggleButton = ({ isActive, toggleSwitch }: Props) => {
    return (
        <ToggleWrap isActive={isActive} onClick={toggleSwitch}>
            <Handle isActive={isActive} />
        </ToggleWrap>
    );
};

export default ToggleButton;
