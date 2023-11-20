import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Header} from './Header';
import {banner} from './Banner';
import '../css/SignUp.css';
import '../css/Profile.css'
import {TextField} from '@material-ui/core';
import axios from "axios";


const cellStyle = {
    // width:'200px',
    // height:'300px',
    flex:'1',
    border: '1px solid #ccc', // 열 구분선 스타일 설정
    padding: '10px', // 셀 내부 여백 설정
    alignItems: 'center',
    justifyContent: 'center',
    display:'flex'
};

const rowStyle = {
    width:'650px',
    display: 'flex',
    marginTop:'10px',
    marginLeft: '20px',
    borderBottom: '1px solid #ccc', // 행 구분선 스타일 설정
};

function Profile(){
    const navigate = useNavigate();

    const [isBold, setIsBold] = useState(false);
    const [tech, setTech] = useState([]);

    const [info, setInfo] = useState([]);
    const [infoTech, setInfoTech] = useState([]);
    const [num, setNum] = useState('');
    const phoneRef = useRef();
    const [items, setItems] = useState([]); // 배열 상태 초기화
    const [envTech, setEnvTech] = useState([]);
    const [roleTech, setRoleTech] = useState([]);
    const jwtToken = localStorage.getItem('accessToken');
    const [profilePost, setProfilePost] = useState([]);
    const [profileId, setProfileId] = useState();
    const [isModify, setModify] = useState();

    const toggleBold = (e) => {
        setIsBold(!isBold);

        if (items.includes(e.target.textContent)) {
            // 아이템이 이미 배열에 있는 경우 제거
            const updatedItems = items.filter(item => item !== e.target.textContent);
            setItems(updatedItems);
        } else {
            // 아이템이 배열에 없는 경우 추가
            setItems([...items, e.target.textContent]);
        }
        console.log(items);
    };


    useEffect(() => {
        const techInfo = async () => {
            // const headers = {
            //     Authorization: localStorage.getItem('accessToken'),
            // };

            axios.get('http://43.202.247.199:8080/tech-list')
                .then(response => {
                    setTech(response.data);
                })
                .catch(error => {
                    console.log("fail");
                });
        };
        techInfo();
    }, []);
    // 휴대폰 번호 입력 함수
    const handlePhone = (e) => {
        const value = phoneRef.current.value.replace(/\D+/g, "");
        const numberLength = 11;
        let result;
        result = "";

        for (let i = 0; i < value.length && i < numberLength; i++) {
            switch (i) {
                case 3:
                    result += "-";
                    break;
                case 7:
                    result += "-";
                    break;

                default:
                    break;
            }
            result += value[i];
        }
        phoneRef.current.value = result;
        setNum(e.target.value);
    };

    const goToModify = (event) => {

        alert("수정화면으로 이동합니다.")
        navigate('/Profilemodify');
    }

    //스택 선택시 배열에 담기

    useEffect(() => {
        const profileInfo = async () => {
            // const headers = {
            //     Authorization: localStorage.getItem('accessToken'),
            // };

            axios.get('http://43.202.247.199:8080/member/my-page', {headers: {
                    // "Content-Type" : 'application/json',
                    Authorization : `Bearer ${jwtToken}`,
                }, withCredentials: true})
                .then(response => {
                    setInfo(response.data);
                    setInfoTech(response.data.userStackList);
                    setProfileId(response.data.loginId);
                })
                .catch(error => {
                    console.log("fail");
                });
        };
        profileInfo();
    }, []);

    useEffect(() => {
        const profilePost = async () => {
            // const headers = {
            //     Authorization: localStorage.getItem('accessToken'),
            // };

            axios.get('http://43.202.247.199:8080/post/list')
                .then(response => {
                    setProfilePost(response.data.content);
                })
                // .then(response => {
                //     {infoTech.map(item=>{
                //         setInfoTechName([...infoTechName, item.name]);
                //     })}
                // })
                .catch(error => {
                    console.log("fail");
                });
        };
        profilePost();
    }, []);

    useEffect(() => {
        const techInfo = async () => {
            // const headers = {
            //     Authorization: localStorage.getItem('accessToken'),
            // };

            axios.get('http://43.202.247.199:8080/tech-list')
                .then(response => {
                    setTech(response.data);
                })
                .catch(error => {
                    console.log("fail");
                });
        };
        techInfo();
    }, []);

    return (
        <div>
            {Header()}
            <main>
                <div className='signup_main'>

                    <form className='signup_form'>
                        <div className='profile_square' style={{float: "left"}}>
                            <div style={{fontSize: '14px', fontWeight:'bold'}}>{info.nickname}</div>  {/*닉네임으로 대체*/}
                            <div style={{fontSize: '14px', fontWeight:'bold'}}>님의 프로필</div>
                        </div>

                        <div className='profile_form_input-block'>
                            <label className='profile_form_label'>역할</label>
                            <div className='signup_form_input-whiteBox'>
                                {tech.map(itemTech => {
                                    if (itemTech.type === 'ROLE') {
                                        for(let i = 0;i<tech.length;i++)
                                        {
                                            if(i === infoTech.length){
                                                return <p id={itemTech.name} className='signup_form_part'
                                                          style={{
                                                              fontWeight: 'normal',
                                                              color: '#bababa'
                                                          }}>#{itemTech.name}</p>
                                            }
                                            else if (itemTech.name === infoTech[i].name) {
                                                return <p id={itemTech.name} className='signup_form_part'
                                                          style={{
                                                              fontWeight: 'bold',
                                                              color: '#000000'
                                                          }}>#{itemTech.name}</p>

                                            }
                                            else if(i === infoTech.length-1){
                                                return <p id={itemTech.name} className='signup_form_part'
                                                          style={{
                                                              fontWeight: 'normal',
                                                              color: '#bababa'
                                                          }}>#{itemTech.name}</p>
                                            }
                                        }


                                    }
                                })}
                            </div>
                        </div>

                        <div className='profile_form_input-block'>
                            <label className='profile_form_label'>환경</label>
                            <div className='signup_form_input-whiteBox'>
                                {tech.map(itemTech => {
                                    if (itemTech.type === 'ENVIRONMENT') {
                                        for(let i = 0;i<tech.length;i++)
                                        {
                                            if(i === infoTech.length){
                                                return <p id={itemTech.name} className='signup_form_part'
                                                          style={{
                                                              fontWeight: 'normal',
                                                              color: '#bababa'
                                                          }}>#{itemTech.name}</p>
                                            }
                                            else if (itemTech.name === infoTech[i].name) {
                                                return <p id={itemTech.name} className='signup_form_part'
                                                          style={{
                                                              fontWeight: 'bold',
                                                              color: '#000000'
                                                          }}>#{itemTech.name}</p>

                                            }
                                            else if(i === infoTech.length-1){
                                                return <p id={itemTech.name} className='signup_form_part'
                                                          style={{
                                                              fontWeight: 'normal',
                                                              color: '#bababa'
                                                          }}>#{itemTech.name}</p>
                                            }
                                        }


                                    }
                                })}
                            </div>
                        </div>

                        <div className='signup_white-line' style={{width: '700px'}}></div> {/*흰색 줄*/}

                        <div className='profile_form_input-block'>
                            <label className='profile_form_label'>닉네임</label>
                            <div className='signup_form_input-whiteBox' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                {/*{info.map(item=>{*/}
                                {/*    return <text*/}
                                {/*        type='text'*/}
                                {/*    >{info.nickname}</text>;*/}
                                {/*})}*/}
                                {info.nickname}
                            </div>
                        </div>

                        <div className='profile_form_input-block'>
                            <label htmlFor='email' className='profile_form_label'>이메일</label>
                            <div className='signup_form_input-whiteBox' id='signup_email'>
                                <text id='signup_form_email_txt'
                                      type='text'>
                                </text>

                                <text id='signup_form_email_txt'
                                      type='text'
                                >{info.loginId}</text>
                            </div>
                        </div>

                        <div className='profile_form_input-block'>
                            <label className='profile_form_label'>휴대폰</label>
                            <div className='signup_form_input-whiteBox' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <text
                                    type='tel'
                                    value={num}  ref={phoneRef}
                                    onChange={handlePhone}
                                >{info.phoneNumber}</text>
                            </div>
                        </div>

                        <div className='profile_square'>
                            <div style={{fontSize: '14px', fontWeight:'bold'}}>소개</div>
                        </div>
                        <div className='profile_form_input-block'>
                            <div className='profile_form_input-boxIntro'>
                                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <text
                                        style={{width:'350px'}}
                                    >{info.introduce}</text>
                                </div>
                            </div>
                        </div>

                        <div className='profile_square' style={{marginBottom: '40px'}}>
                            <div style={{fontSize: '14px', fontWeight:'bold'}}>내가 쓴 글</div>
                        </div>
                        <div style={{marginTop:'100px'}}>
                            {profilePost.map(item => {
                                if(profileId === item.loginId){
                                    return <div>
                                        <p>{item.title}</p>
                                        <p>{item.content}</p>
                                        <p>---------</p>
                                    </div>
                                }
                            })}
                        </div>

                        <div style={{marginTop: '80px'}}>
                            <button className='profile_form_edit-btn' onClick={goToModify}>마이페이지 수정</button>
                        </div>

                    </form>

                </div>
            </main>
            {banner()}
        </div>
    );
}

export default Profile;