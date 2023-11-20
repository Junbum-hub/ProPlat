import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileModify from "./jsx/ProfileModify";
import ProjectMain from "./jsx/ProjectMain";
import ClubMain from "./jsx/ClubMain";
import Collect from "./jsx/Collect";
import ProjectContent from "./jsx/ProjectContent";
import Login from "./jsx/Login";
import SignUp from "./jsx/SignUp";
import Profile from "./jsx/Profile";
import Clock from "./jsx/Clock";

function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ClubMain />} />  {/*동아리 소개*/}
                    <Route path="/ProfileModify" element={<ProfileModify />} />  {/*마이페이지 수정*/}
                    <Route path="/Profile" element={<Profile />} />   {/*마이페이지*/}
                    <Route path="/Collect" element={<Collect />} />   {/*프로젝트 지원*/}
                    <Route path="/ProjectContent/:id" element={<ProjectContent />} />   {/*프로젝트 모집글가서 댓글*/}
                    <Route path="/ProjectMain" element={<ProjectMain />} />   {/*프로젝트 메인창*/}
                    <Route path="/Login" element={<Login />} />
                    <Route path="/SignUp" element={<SignUp />} />

                    <Route path="/Clock" element={<Clock />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;