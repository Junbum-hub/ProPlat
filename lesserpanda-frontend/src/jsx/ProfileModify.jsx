import React, {useState, useRef, useEffect} from 'react';
import {Header} from './Header';
import {banner} from './Banner';
import '../css/SignUp.css';
import {TextField} from '@material-ui/core';
import axios from "axios";
import {useNavigate} from "react-router-dom";

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

function ProfileModify(){

    const navigate = useNavigate();
    const [styles, setStyles] = useState({});
    const [isBold1, setIsBold1] = useState(false);
    const [isBold2, setIsBold2] = useState(false);
    const [isBold3, setIsBold3] = useState(false);
    const [isBold4, setIsBold4] = useState(false);
    const [isBold5, setIsBold5] = useState(false);

    const [items, setItems] = useState([]); // toggle stack
    const [tech, setTech] = useState([]);
    const jwtToken = localStorage.getItem('accessToken');
    const [info, setInfo] = useState([]);
    const [infoTech, setInfoTech] = useState([]);
    const [infoNew, setInfoNew] = useState({
        name: null,
        loginId: null,
        nickname: null,
        phoneNumber: null,
        introduce: null,
        userStackList: [
        ]
    });

    const [nameTech, setNameTech] = useState([]);

    const toggleBold = (e) => {
        const isNameMatched = infoTech.some(item => item.name === (e.target.id).toString());
        const tempForm = [{
            name:e.target.id,
            type:"ROLE"
        }]
        //검->흰
        if (isNameMatched) {
            //console.log("yes");
            // 아이템이 이미 배열에 있는 경우 제거
            if(infoTech.length === 0){
                setInfoTech([]);
            }
            else{

                const updatedItems = infoTech.filter(item => item.name !== (e.target.id).toString());
                setInfoTech(updatedItems);
            }

        }
        //흰->검
        else {
            // const array = [...nameTech, e.target.id.toString()];
            // setNameTech(array);
            setInfoTech((infoTech) => [...infoTech, ...tempForm]);
            console.log("length : " + infoTech.length);
        }
    };


    const [num, setNum] = useState('');
    const phoneRef = useRef();

    // 휴대폰 번호 입력 함수
    const handlePhone = (e) => {
        info.phoneNumber = e.target.value;
        // info.userStackList = infoChangeTech;
        // const value = phoneRef.current.value.replace(/\D+/g, "");
        // const numberLength = 11;
        // let result;
        // result = "";
        //
        // for (let i = 0; i < value.length && i < numberLength; i++) {
        //     switch (i) {
        //         case 3:
        //             result += "-";
        //             break;
        //         case 7:
        //             result += "-";
        //             break;
        //
        //         default:
        //             break;
        //     }
        //     result += value[i];
        // }
        // phoneRef.current.value = result;
        // setNum(e.target.value);
    };

    const handleNickName = (e) => {
        info.nickname = e.target.value;
    }

    const handleIntroduce = (e) => {
        info.introduce = e.target.value;
    }

    //스택 선택시 배열에 담기


    useEffect(() => {
        const profileInfo = async () => {
            axios.get('http://43.202.247.199:8080/member/my-page', {headers: {
                    // "Content-Type" : 'application/json',
                    Authorization : `Bearer ${jwtToken}`,
                }, withCredentials: true})
                .then(response => {
                    setInfo(response.data);
                    setInfoTech(response.data.userStackList);
                })
                .catch(error => {
                    console.log("fail");
                });
        };

        profileInfo();
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



    const ModifyProfile = (e) => {
        e.preventDefault();
        if(infoNew.name === null)
            infoNew.name = info.name;
        if(infoNew.loginId === null)
            infoNew.loginId = info.loginId;
        if(infoNew.nickname === null)
            infoNew.nickname = info.nickname;
        if(infoNew.phoneNumber === null)
            infoNew.phoneNumber = info.phoneNumber;
        if(infoNew.introduce === null)
            infoNew.introduce = info.introduce;


        // infoNew.userStackList = nameTech;
        const namesArray = infoTech.map(stack => stack.name);
        // setNameTech(namesArray);
        console.log("namesArray : " + namesArray);
        // 새로운 배열을 상태로 설정
        infoNew.userStackList = namesArray;

        const modify = async (e) => {
            axios.put('http://43.202.247.199:8080/member/update', infoNew, {headers: {
                    // "Content-Type" : 'application/json',
                    Authorization : `Bearer ${jwtToken}`,
                }, withCredentials: true})
                .then(response => {
                    console.log("success");
                    navigate('/Profile');
                })
                .catch(error => {
                    console.log("fail");
                });
        };
        modify();
    }

    return (
        <div>
            {Header()}
            <main>
                <div className='signup_main'>

                    <form className='signup_form'>
                        <div className='profile_square' style={{float: "center"}}>
                            <div style={{fontSize: '14px', fontWeight:'bold'}}>개인 정보 수정</div>
                        </div>

                        <div className='profile_form_input-block'>
                            <label className='profile_form_label'>역할</label>
                            <div className='signup_form_input-whiteBox'>
                                {tech.map(itemTech => {
                                    if (itemTech.type === 'ROLE') {
                                        for(let i = 0;i<tech.length;i++)
                                        {
                                            if(i === infoTech.length){
                                                return <p id={itemTech.name} className='signup_form_part' onClick={toggleBold}
                                                          style={{
                                                              cursor: 'pointer',
                                                              fontWeight: 'normal',
                                                              color: '#bababa'
                                                          }}>#{itemTech.name}</p>
                                            }
                                            else if (itemTech.name === infoTech[i].name) {
                                                return <p id={itemTech.name} className='signup_form_part' onClick={toggleBold}
                                                          style={{
                                                              cursor: 'pointer',
                                                              fontWeight: 'bold',
                                                              color: '#000000'
                                                          }}>#{itemTech.name}</p>

                                            }
                                            else if(i === infoTech.length-1){
                                                return <p id={itemTech.name} className='signup_form_part' onClick={toggleBold}
                                                          style={{
                                                              cursor: 'pointer',
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
                                                return <p id={itemTech.name} className='signup_form_part' onClick={toggleBold}
                                                          style={{
                                                              cursor: 'pointer',
                                                              fontWeight: 'normal',
                                                              color: '#bababa'
                                                          }}>#{itemTech.name}</p>
                                            }
                                            else if (itemTech.name === infoTech[i].name) {
                                                return <p id={itemTech.name} className='signup_form_part' onClick={toggleBold}
                                                          style={{
                                                              cursor: 'pointer',
                                                              fontWeight: 'bold',
                                                              color: '#000000'
                                                          }}>#{itemTech.name}</p>

                                            }
                                            else if(i === infoTech.length-1){
                                                return <p id={itemTech.name} className='signup_form_part' onClick={toggleBold}
                                                          style={{
                                                              cursor: 'pointer',
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
                            <div className='signup_form_input-whiteBox'>
                                <input className='profile_edit_input'
                                    type='text'
                                    placeholder='Nickname'
                                    defaultValue={info.nickname}
                                    onChange={handleNickName}
                                />
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
                            <div className='signup_form_input-whiteBox'>
                                <input className={'profile_edit_input'}
                                    type='tel'
                                    defaultValue={info.phoneNumber}  ref={phoneRef}  onChange={handlePhone}
                                    placeholder='Phone Number'
                                />
                            </div>
                        </div>

                        <div className='profile_square'>
                            <div style={{fontSize: '14px', fontWeight:'bold'}}>소개</div>
                        </div>
                        <div className='profile_form_input-block'>
                            <div className='profile_form_input-boxIntro'>
                                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <TextField
                                        variant='outlined'
                                        multiline
                                        rows={2}
                                        defaultValue={info.introduce}
                                        style={{width:'600px'}}
                                        onChange={handleIntroduce}
                                    />
                                </div>
                            </div>
                        </div>



                        <div className='profile_square' style={{marginBottom: '40px'}}>
                            <div style={{fontSize: '14px', fontWeight:'bold'}}>내가 쓴 글</div>
                        </div>
                        <div style={rowStyle}>
                            <div style={cellStyle}>셀 1-1</div>
                            <div style={cellStyle}>셀 1-2</div>
                            <div style={cellStyle}>셀 1-3</div>
                        </div>

                        <div style={{marginTop: '80px'}}>
                            <button className='profile_form_edit-btn' onClick={ModifyProfile}>저장</button>
                        </div>

                    </form>

                </div>
            </main>
            {banner()}
        </div>
    );
}

export default ProfileModify;