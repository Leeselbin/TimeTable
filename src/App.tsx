import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TimetablePage from './pages/TimetablePage';
import styled from 'styled-components';

const AppWrap = styled.div`
    display: flex;
    justify-content: center;
`;

function App() {
    return (
        <AppWrap>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/timetable" />} />
                    <Route path="/timetable" element={<TimetablePage />} />
                </Routes>
            </BrowserRouter>
        </AppWrap>
    );
}

export default App;
