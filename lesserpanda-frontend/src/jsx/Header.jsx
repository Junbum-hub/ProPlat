import '../css/Header.css';
import React from 'react';
import {useNavigate} from "react-router-dom";
import { useState, useEffect} from 'react';
import {useCookies}from 'react-cookie'


export function Header() {
    const navigate = useNavigate();

    const naviClub = () => {
        navigate('/');
    }

    const naviProject = () => {
        navigate('/ProjectMain');
    }

    const naviProfile = () => {
        navigate('/Profile');
    }

    const naviLoginTest = () => {
        navigate('/Login');
    }

    const [token, setToken] = useState(localStorage.getItem('accessToken'));

    const clear = () => {
        navigate('/Login');
        window.location.reload();
        localStorage.clear();
    }

    const tokenCheck =  () => {
                if(token){
                    return <span className='header_text' onClick={clear}>로그아웃</span>
                }
                else{
                    return <span className='header_text' onClick={naviLoginTest}>로그인</span>
                }
            };

    const profileCheck = () => {
        if(token){
            return <span className='header_text' onClick={naviProfile}>마이페이지</span>
        }
        else{
            return <span></span>
        }
    }

    return (
        <div className="header">
            <header>
                <img src='images/header_logo.svg' style={{cursor:'pointer'}} onClick={naviClub}/>
                <nav>
                    <div className='header_round' onClick={naviClub}>IT 프로젝트 연합 동아리 소개</div>
                    <div className='header_round' onClick={naviProject}>모집글 보기</div>
                </nav>
                <nav>
                        {tokenCheck()}
                    {profileCheck()}
                </nav>
            </header>
        </div>
    );
}