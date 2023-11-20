import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Header} from './Header';
import {banner} from './Banner';
import '../css/SignUp.css';
import axios from "axios";
import {TextField} from "@material-ui/core";


function SignUp(){
    const navigate = useNavigate();
    const [sign, setSign] = useState(
        {
            name: "",
            loginId: "",
            loginPassword: "",
            authority:"ROLE_USER",
            nickname: "",
            phoneNumber: "",
            introduce: "",
            techList: [
            ]
        }
    )
    const [tech, setTech] = useState([]);
    const [tempTech, setTempTech] = useState([]);
    // 초기값 세팅 - 이메일, 비밀번호, 비밀번호확인, 전화번호, 닉네임, 약관 동의
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [phone, setPhone] = useState('');
    const phoneRef = useRef();
    const [nickname, setNickname] = useState("");
    const [allAgreed, setAllAgreed] = useState(false);  //전체 동의
    const [agreements, setAgreements] = useState({  // 개별 약관 동의
        termsAgreed : false,
        financeAgreed : false,
        personalInfoAgreed : false,
        provisionAgreed : false,
        smsAgreed : false
    })

    // 유효성 검사 및 확인용
    const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);
    const [isEmail, setIsEmail] = React.useState(false);
    const [isName, setIsName] = React.useState(false);

    const [passwordConfirmMessage, setPasswordConfirmMessage] = React.useState("");
    const [emailMessage, setEmailMessage] = React.useState("");
    const [nameMessage, setNameMessage] = React.useState("");

    //----------------------------------------이름 확인-----------------------------------------
    const handleName = (e) => {
        sign.name = e.target.value;
    }

    //--------------------------------------- 이메일 유효성 ---------------------------------------------
    const handleEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail); // 입력값 저장

        // 이메일 입력 형식
        const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{3}$/;

        if (!emailRegExp.test(currentEmail)) {
            setEmailMessage("이메일의 형식이 올바르지 않습니다");
            setIsEmail(false);
        } else {
            setEmailMessage("사용 가능한 이메일 입니다");
            setIsEmail(true);
            sign.loginId = currentEmail
        }
    }
    //-----------------------------비밀번호 입력-----------------------
    const handlePW = (e) => {
        setPassword(e.target.value);
        sign.loginPassword = e.target.value;
    }
    //-------------------------------------- 비밀번호 일치 확인 -----------------------------------------
    const handlePassword = (e) => {
        const currentPwConfirm = e.target.value;
        setPasswordConfirm(currentPwConfirm);   // 입력값 저장
        sign.loginPassword = currentPwConfirm;

        setIsPasswordConfirm((prevIsPasswordConfirm) => {
            const isMatch = password === currentPwConfirm;
            setPasswordConfirmMessage(isMatch ? '비밀번호가 일치합니다' : '비밀번호가 일치하지 않습니다');
            console.log(isMatch)
            return isMatch;
        });
    }
    //---------------------------------------- 닉네임 입력 확인 -----------------------------------------
    const handleNickName = (e) =>{
        const currentName = e.target.value;
        setNickname(currentName);

        if (currentName.length < 2 || currentName.length > 5) {
            setNameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요");
            setIsName(false);
        } else {
            setNameMessage("사용 가능한 닉네임 입니다");
            setIsName(true);
            sign.nickname = currentName;
        }
    }

    //-----------------------------------소개-------------------------------------
    const handleIntroduce = (e) => {
        sign.introduce = e.target.value;
    }
    //---------------------------------- 약관 동의 체크 상태 변경 함수 ------------------------------------
    // 전체체크 활성화
    const handleAgreement = (e) =>{
        const {name, checked} = e.target;   //name과 checked 속성을 기반으로 상태 업데이트
        setAgreements((prevAgreements) => ({...prevAgreements, [name]: checked}));

        //전체 동의 시 모든 항목에 체크
        const allChecked = Object.values({...agreements, [name]: checked}).every(
            (value) => value === true
        );
        setAllAgreed(allChecked)    //상태 적용
    }
    // 전체 체크 비활성화
    const handleAllAgreement = (e) => {
        const {checked} = e.target; //name과 checked 속성을 기반으로 상태 업데이트
        setAgreements((prevAgreements)=>
            Object.keys(prevAgreements).reduce(
                (newAgreements, agreementKey) => ({
                    ...newAgreements,
                    [agreementKey]: checked,
                }),
                {}
            )
        );
        setAllAgreed(checked);
    }
    //-------------------------------- 회원 가입 버튼 활성화 설정 -------------------------------------

    const SignUpButton = async (e) => {
        try {

            const res = await axios.post('http://43.202.247.199:8080/auth/signup', sign).then(response => {
            });
        } catch (err) {
            console.log(err);
        }

    }

    const isRequiredAgreed = () => {
        // 필수 항목들이 모두 체크되어 있으면 true를 반환
        return agreements.termsAgreed && agreements.financeAgreed && agreements.personalInfoAgreed;
    };

    // 회원가입 버튼 클릭 시 동작하는 함수
    const handleSignup = (event) => {
        // 버튼만 누르면 리로드 되는것을 막아줌
        event.preventDefault();

        if (!isRequiredAgreed()) {
            //case1 : 필수 항목 동의가 안 됨
            alert('필수 항목에 동의해주세요.');
            return false;
        } else if (!isPasswordConfirm) {
            // Case 2: 비밀번호 불일치
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        } else if (!isEmail) {
            // Case 3: 이메일 형식
            alert('이메일의 형식이 올바르지 않습니다.');
            return false;
        } else if (!isName) {
            // Case 4: 닉네임 형식
            alert('닉네임의 형식이 올바르지 않습니다.');
            return false;
        }else {
            // Case 5: 필수 동의, 비밀번호 일치
            alert('회원가입 성공!');
            sign.techList= tempTech;
            SignUpButton();
            navigate('/login'); // 로그인 화면으로 이동
            return true;
        }
    };

    // 휴대폰 번호 입력 함수
    const addHyphen = (e) => {
        const value = phoneRef.current.value.replace(/\D+/g, "");
        const numberLength = 11;
        let result;
        result = "";
        //자동으로 000-0000-0000 형식으로 만들어준다
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
        setPhone(e.target.value);
        sign.phoneNumber = e.target.value;
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


    const toggleBold = (e) => {
        const isNameMatched = tempTech.some(item => item === (e.target.id).toString());

        //검->흰
        if (isNameMatched) {
            //console.log("yes");
            // 아이템이 이미 배열에 있는 경우 제거
            if(tempTech.length === 0){
                setTempTech([]);
            }
            else{
                const updatedItems = tempTech.filter(item => item !== (e.target.id).toString());
                setTempTech(updatedItems);
            }

        }
        //흰->검
        else {
            // const array = [...nameTech, e.target.id.toString()];
            // setNameTech(array);
            setTempTech([...tempTech, e.target.id.toString()]);
        }
    };

    return (
        <div>
            {Header()}
            <main>
                <div className='signup_main'>
                    <span style={{fontSize: '20px', fontWeight: 'bold'}}> 회원가입 </span>
                    <div className='signup_txt-line'/> {/*회원가입 아래 줄*/}

                    <form className='signup_form'>

                        {/*이름*/}
                        <div className='signup_form_input-block'>
                            <label htmlFor='signup_form_email_txt' className='signup_form_label'>이름</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                <input className='signup_input'
                                       type='text'
                                       placeholder='name'
                                       onChange={handleName}
                                />
                                <p className='signup_message'>{emailMessage}</p>
                            </div>
                        </div>
                        {/* 이메일 */}
                        <div className='signup_form_input-block'>
                            <label htmlFor='signup_form_email_txt' className='signup_form_label'>이메일</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                <input className='signup_input'
                                       type='text'
                                       name='email'
                                       placeholder='Email'
                                       value={email}
                                       onChange={handleEmail}
                                />
                                <p className='signup_message'>{emailMessage}</p>
                            </div>
                        </div>
                        {/* 비밀번호 */}
                        <div className='signup_form_input-block'>
                            <label htmlFor='password' className='signup_form_label'>비밀번호</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                <input className='signup_input'
                                       type='password'
                                       id='password'
                                       placeholder='Password'
                                       value={password}
                                       onChange={handlePW}
                                />
                            </div>
                        </div>
                        {/* 비밀번호 확인 */}
                        <div className='signup_form_input-block'>
                            <label htmlFor='pwConfirm' className='signup_form_label'>비밀번호 확인</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                <input className='signup_input'
                                       type='password'
                                       id='pwConfirm'
                                       placeholder='Password'
                                       value={passwordConfirm}
                                       onChange={handlePassword}
                                />
                                <p className='signup_message'>{passwordConfirmMessage}</p>
                            </div>
                        </div>
                        {/* 휴대폰 번호 */}
                        <div className='signup_form_input-block'>
                            <label htmlFor='phone' className='signup_form_label'>휴대폰</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                <input className='signup_input'
                                       type='tel'
                                       id='phone'
                                       value={phone}  ref={phoneRef}  onChange={addHyphen}
                                       placeholder='Phone Number'
                                />
                            </div>
                        </div>
                        {/* 닉네임 */}
                        <div className='signup_form_input-block'>
                            <label htmlFor='nickname' className='signup_form_label'>닉네임</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                <input style={{width: 100}}
                                       className='signup_input'
                                       type='text'
                                       id='nickname'
                                       placeholder='Nickname'
                                       value={nickname}
                                       onChange={handleNickName}
                                />
                                <p className='signup_message'>{nameMessage}</p>
                            </div>
                        </div>
                        {/*소개*/}
                        <div className='signup_form_input-block'>
                            <label htmlFor='nickname' className='signup_form_label'>소개</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                <input style={{width: 100}}
                                       className='signup_input'
                                       type='text'
                                       id='introduce'
                                       placeholder='introduce'
                                       onChange={handleIntroduce}
                                />

                            </div>
                        </div>
                        {/* 파트 선택 */}

                        <div className='signup_form_input-block'>
                            <label className='signup_form_label'>역할</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                {tech.map(itemTech => {
                                    if (itemTech.type === 'ROLE') {
                                        for(let i = 0;i<tech.length;i++)
                                        {
                                            if(i === tempTech.length){
                                                return <p id={itemTech.name} className='signup_form_part' onClick={toggleBold}
                                                          style={{
                                                              cursor: 'pointer',
                                                              fontWeight: 'normal',
                                                              color: '#bababa'
                                                          }}>#{itemTech.name}</p>
                                            }
                                            else if (itemTech.name === tempTech[i]) {
                                                return <p id={itemTech.name} className='signup_form_part' onClick={toggleBold}
                                                          style={{
                                                              cursor: 'pointer',
                                                              fontWeight: 'bold',
                                                              color: '#000000'
                                                          }}>#{itemTech.name}</p>

                                            }
                                            else if(i === tempTech.length-1){
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

                        <div className='signup_form_input-block'>
                            <label className='signup_form_label'>환경</label>
                            <p className='signup_required'>*</p>
                            <div className='signup_form_input-whiteBox'>
                                {tech.map(itemTech => {
                                    if (itemTech.type === 'ENVIRONMENT') {
                                        for(let i = 0;i<tech.length;i++)
                                        {
                                            if(i === tempTech.length){
                                                return <p id={itemTech.name} className='signup_form_part' onClick={toggleBold}
                                                          style={{
                                                              cursor: 'pointer',
                                                              fontWeight: 'normal',
                                                              color: '#bababa'
                                                          }}>#{itemTech.name}</p>
                                            }
                                            else if (itemTech.name === tempTech[i]) {
                                                return <p id={itemTech.name} className='signup_form_part' onClick={toggleBold}
                                                          style={{
                                                              cursor: 'pointer',
                                                              fontWeight: 'bold',
                                                              color: '#000000'
                                                          }}>#{itemTech.name}</p>

                                            }
                                            else if(i === tempTech.length-1){
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


                        <div className='signup_white-line'></div> {/*흰색 줄*/}

                        <div className='signup_agreement'>
                            <div className='signup_line'/>
                            <p style={{display:'inline-block', color:'#666666'}}>이용약관동의</p>
                            <div className='signup_line'/>
                        </div>
                        {/* 약광 동의 */}
                        <div>
                            <div className='signup_form_agree-block'>
                                <input className='signup_checkbox'
                                       type='checkbox'
                                       name='agree_check_all'
                                       checked={allAgreed}
                                       onChange={handleAllAgreement}/>
                                <label className='signup_agree_label'>전체 동의</label>
                            </div>
                            <div className='signup_form_agree-block'>
                                <input className='signup_checkbox'
                                       type='checkbox'
                                       name='termsAgreed'
                                       checked={agreements.termsAgreed}
                                       onChange={handleAgreement}/>
                                <label className='signup_agree_label'>OOO 이용약관 동의(필수)</label>
                            </div>
                            <div className='signup_form_agree-block'>
                                <input className='signup_checkbox'
                                       type='checkbox'
                                       name='financeAgreed'
                                       checked={agreements.financeAgreed}
                                       onChange={handleAgreement}/>
                                <label className='signup_agree_label'>전자 금융거래 이용약관 동의 (필수)</label>
                            </div>
                            <div className='signup_form_agree-block'>
                                <input className='signup_checkbox'
                                       type='checkbox'
                                       name='personalInfoAgreed'
                                       checked={agreements.personalInfoAgreed}
                                       onChange={handleAgreement}/>
                                <label className='signup_agree_label'>개인정보 수집이용 동의 (필수)</label>
                            </div>
                            <div className='signup_form_agree-block'>
                                <input className='signup_checkbox'
                                       type='checkbox'
                                       name='provisionAgreed'
                                       checked={agreements.provisionAgreed}
                                       onChange={handleAgreement}/>
                                <label className='signup_agree_label'>개인정보 제3자 제공 동의 (선택)</label>
                            </div>
                            <div className='signup_form_agree-block'>
                                <input className='signup_checkbox'
                                       type='checkbox'
                                       name='smsAgreed'
                                       checked={agreements.smsAgreed}
                                       onChange={handleAgreement}/>
                                <label className='signup_agree_label'>마케팅 정보메일, SMS 수신 동의 (선택)</label>
                            </div>
                        </div>
                        {/* 약관 동의 끝*/}

                        <button className='signup_btn'
                                onClick={handleSignup}
                                disabled={!handleSignup}>
                            회원가입
                        </button>
                    </form>

                </div>
            </main>
            {banner()}
        </div>
    );
}

export default SignUp;