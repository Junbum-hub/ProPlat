import {Header} from './Header';
import {banner} from './Banner';
import React from 'react';
import {useEffect,useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../css/SignUp.css';
import Pagination from "./Pagination";
import styled from "styled-components";


const cellStyle = {
    width:'600px',
    border: '1px solid #ccc', // 열 구분선 스타일 설정
    padding: '10px', // 셀 내부 여백 설정
    marginTop:'20px',
    marginBottom:'20px',
    borderRadius:'10px'
};

const tableStyle = {
    marginTop:'20px',
    align:'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '800px', // 테이블 전체 너비 설정 (원하는 값으로 조정)
    border: '1px solid #ccc', // 테두리 스타일 설정
    background:'#f0f0ff',
    borderRadius: '20px'
};

function ClubMain() {

    const navigate = useNavigate();

    // const dateString = "2023-12-01T01:01:01";
    // const currentDate = new Date(dateString);
    // console.log(currentDate);
    const [club, setClub] = useState([]);
    const [clubInfo, setClubInfo] = useState([]); //content
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [targetDate, setTargetDate] = useState(new Date(''));
    const [daysLeft1, setDaysLeft1] = useState(0);
    const [daysLeft2, setDaysLeft2] = useState(0);
    const [daysLeft3, setDaysLeft3] = useState(0);
    const [daysLeft4, setDaysLeft4] = useState(0);

    const imageurl = '../images/ogu.jpg';

    useEffect(() => {
        const clubInfo = async () => {
            try {
                const res = await axios.get('http://43.202.247.199:8080/main' , {
                    headers: {
                        Accept: "application/json"
                    }
                });
                setClub(res.data);
                setClubInfo(res.data.content);
                // const newTargetDate = new Date(); // 현재 날짜와 시간으로 새로운 날짜 생성
            } catch (err) {
                console.log(err);
            }
        };
        clubInfo();
    }, []);

    const timer1 = (e) => {

        const intervalId = setInterval(() => {
            const targetDate = new Date(e); // 목표 날짜 설정
            const currentDate = new Date();
            const timeDiff = targetDate - currentDate;
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 밀리초(ms)를 일(day)로 변환
            setDaysLeft1(days);
        }, 1000); // 1초마다 갱신

        return () => {
            clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 클리어
        };
    }
    const timer2 = (e) => {

        const intervalId = setInterval(() => {
            const targetDate = new Date(e); // 목표 날짜 설정
            const currentDate = new Date();
            const timeDiff = targetDate - currentDate;
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 밀리초(ms)를 일(day)로 변환
            setDaysLeft2(days);
        }, 1000); // 1초마다 갱신

        return () => {
            clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 클리어
        };
    }
    const timer3 = (e) => {

        const intervalId = setInterval(() => {
            const targetDate = new Date(e); // 목표 날짜 설정
            const currentDate = new Date();
            const timeDiff = targetDate - currentDate;
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 밀리초(ms)를 일(day)로 변환
            setDaysLeft3(days);
        }, 1000); // 1초마다 갱신

        return () => {
            clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 클리어
        };
    }
    const timer4 = (e) => {

        const intervalId = setInterval(() => {
            const targetDate = new Date(e); // 목표 날짜 설정
            const currentDate = new Date();
            const timeDiff = targetDate - currentDate;
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 밀리초(ms)를 일(day)로 변환
            setDaysLeft4(days);
        }, 1000); // 1초마다 갱신

        return () => {
            clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 클리어
        };
    }


    return (

        <div>
            <main>
                <Layout>
                    {Header()}
                    <main>
                        <div className='signup_main3' style={{justifyContent:'center',alignItems:'center'}}>

                            <span style={{fontSize: '20px', fontWeight: 'bold'}}> 동아리 목록 </span>

                            <div className='signup_txt-lineProjectMain'/> {/*회원가입 아래 줄*/}

                            <div style={{flex:'1',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px', flexDirection:'column'}}>
                                <div className="test2" style={tableStyle}>
                                    {clubInfo.slice(offset, offset + limit).map(({title, content,nextDday},index) => {
                                        if(index === 0)
                                        {
                                            return <article style={cellStyle}>
                                                <div style={{display:'flex', flexDirection:'row'}}>
                                                    <div>
                                                        {timer1(nextDday)}
                                                        <p>  D-{daysLeft1}</p>
                                                        <img src='../images/ogu.jpg' alt='' style={{height:'100px', }}/>
                                                    </div>
                                                    <div style={{width:'500px', display:'flex',justifyContent:'right',alignItems:'right', flexDirection:'column',marginLeft:'20px'}}>

                                                        <p style={{borderRadius: '20px', border: '1px solid #ccc'}}>{title}</p>

                                                        <div style={{display:'flex', flexDirection:'column', textAlign:'center',justifyContent:'center'}}>
                                                            <p style={{marginTop:'10px'}}>{content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        }

                                    })}
                                </div>

                                <div className="test2" style={tableStyle}>
                                    {clubInfo.slice(offset, offset + limit).map(({title, content,nextDday},index) => {
                                        if(index === 1)
                                        {
                                            return <article style={cellStyle}>
                                                <div style={{display:'flex', flexDirection:'row'}}>
                                                    <div>
                                                        {timer2(nextDday)}
                                                        <p>  D-{daysLeft2}</p>
                                                        <img src='../images/ogu.jpg' alt='' style={{height:'100px', }}/>
                                                    </div>
                                                    <div style={{width:'500px', display:'flex',justifyContent:'right',alignItems:'right', flexDirection:'column',marginLeft:'20px'}}>

                                                        <p style={{borderRadius: '20px', border: '1px solid #ccc'}}>{title}</p>

                                                        <div style={{display:'flex', flexDirection:'column', textAlign:'center',justifyContent:'center'}}>
                                                            <p style={{marginTop:'10px'}}>{content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        }

                                    })}
                                </div>

                                <div className="test2" style={tableStyle}>
                                    {clubInfo.slice(offset, offset + limit).map(({title, content,nextDday},index) => {
                                        if(index === 2)
                                        {
                                            return <article style={cellStyle}>
                                                <div style={{display:'flex', flexDirection:'row'}}>
                                                    <div>
                                                        {timer3(nextDday)}
                                                        <p>  D-{daysLeft3}</p>
                                                        <img src='../images/ogu.jpg' alt='' style={{height:'100px', }}/>
                                                    </div>
                                                    <div style={{width:'500px', display:'flex',justifyContent:'right',alignItems:'right', flexDirection:'column',marginLeft:'20px'}}>

                                                        <p style={{borderRadius: '20px', border: '1px solid #ccc'}}>{title}</p>

                                                        <div style={{display:'flex', flexDirection:'column', textAlign:'center',justifyContent:'center'}}>
                                                            <p style={{marginTop:'10px'}}>{content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        }

                                    })}
                                </div>

                                <div className="test2" style={tableStyle}>
                                    {clubInfo.slice(offset, offset + limit).map(({title, content,nextDday},index) => {
                                        if(index === 3)
                                        {
                                            return <article style={cellStyle}>
                                                <div style={{display:'flex', flexDirection:'row'}}>
                                                    <div>
                                                        {timer4(nextDday)}
                                                        <p>  D-{daysLeft4}</p>
                                                        <img src='../images/ogu.jpg' alt='' style={{height:'100px', }}/>
                                                    </div>
                                                    <div style={{width:'500px', display:'flex',justifyContent:'right',alignItems:'right', flexDirection:'column',marginLeft:'20px'}}>

                                                        <p style={{borderRadius: '20px', border: '1px solid #ccc'}}>{title}</p>

                                                        <div style={{display:'flex', flexDirection:'column', textAlign:'center',justifyContent:'center'}}>
                                                            <p style={{marginTop:'10px'}}>{content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        }

                                    })}
                                </div>

                            </div>
                            <footer>
                                <Pagination
                                    total={clubInfo.length}
                                    limit={limit}
                                    page={page}
                                    setPage={setPage}
                                />
                            </footer>
                        </div>
                    </main>
                </Layout>
            </main>
            {banner()}
        </div>

        // <div>
        //     {Header()}
        //
        //     <div className = "test1" style={{flex:'1',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px'}}>
        //
        //         <div className="test2" style={tableStyle}>
        //             <div style={rowStyle}>
        //                 {(clubInfo).map(item => {
        //                     return (
        //                         <div style={cellStyle}>
        //                             <div style={{display:'flex', alignItems:'center',justifyContent:'center', flexDirection:'column'}}>
        //
        //                                 <img src='../images/ogu.jpg' alt='' style={{height:'100px', width:'100px'}}/>
        //
        //                                 <div style={{borderRadius:'10px', border: '1px solid #ccc', marginTop:'10px', paddingLeft:'10px', paddingRight:'10px'}}>
        //                                     <p >{item.name}</p>
        //                                 </div>
        //
        //                                 <div style={{borderRadius:'10px', border: '1px solid #ccc', marginTop:'10px', paddingLeft:'10px', paddingRight:'10px'}}>
        //                                     <p>{item.content}</p>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     );
        //                 })}
        //
        //                 <div style={cellStyle}>셀 1-3</div>
        //             </div>
        //
        //             {/* 테이블 행 2 */}
        //             <div style={rowStyle}>
        //                 <div style={cellStyle}>셀 2-1</div>
        //                 <div style={cellStyle}>셀 2-2</div>
        //                 <div style={cellStyle}>셀 2-3</div>
        //             </div>
        //
        //             {/* 테이블 행 3 */}
        //             <div style={rowStyle}>
        //                 <div style={cellStyle}>셀 3-1</div>
        //                 <div style={cellStyle}>셀 3-2</div>
        //                 <div style={cellStyle}>셀 3-3</div>
        //             </div>
        //
        //             <footer>
        //                 <Pagination
        //                     total={clubInfo.length}
        //                     limit={limit}
        //                     page={page}
        //                     setPage={setPage}
        //                 />
        //             </footer>
        //         </div>
        //     </div>
        //
        //     {banner()}
        // </div>
    );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;
export default ClubMain;
