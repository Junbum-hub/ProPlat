import React from 'react';
import {useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Header} from './Header';
import {banner} from './Banner';
import '../css/Login.css';
import '../css/ProjectPost.css'
import axios from "axios";

function Collect(){
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem('accessToken');
    const [projectTitle, setTitle] = useState('');
    const [projectContents, setContents] = useState('');
    const [projectMonth, setMonth] = useState('');
    const [projectDay, setDay] = useState('');
    const [postInfo, setPostInfo] = useState({
        title:"",
        content:"",
        complete:"false",
        stackList:[]
    }
    )

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

    const [tech, setTech] = useState([]);
    const [tempTech, setTempTech] = useState([]);
    const handleTitleChange = (e) =>{
        postInfo.title = (e.target.value);
    }
    const handleContentsChange = (e) => {
        postInfo.content = (e.target.value);
    };
    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };
    const handleDayChange = (e) => {
        setDay(e.target.value);
    };
    //--------------------------- 작성 완료 관리 ------------------------------
    const handleSubmitClick = (e) =>{
        //입력된 값 확인
        e.preventDefault();

        postInfo.stackList = tempTech;

        axios.post('http://43.202.247.199:8080/post/save', postInfo, {headers: {
                Authorization : `Bearer ${jwtToken}`,
            }, withCredentials: true})
            .then(response => {
                alert("작성이 완료되었습니다")
                navigate('/ProjectMain');
            })
            .catch(error => {
                console.log("fail");
            });
            };


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

    return(
        <div>
            {Header()}
            <main>
                <div className='projectpost_img_center'>
                    <img src='images/proplat_long_logo.svg' className='projectpost_proplat-img'/>   {/*proplat 사진*/}
                </div>
                <div className='projectpost_main'>

                    <form className='projectpost_form'>

                        <div className='projectpost_step-num'>STEP 1</div>
                        <div className='projectpost_form_input-block'>
                            <div className='projectpost_form_input-block'>
                                <label className='projectpost_form_label'>역할</label>
                                <div className='projectpost_whitebox_long'>
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
                        </div>

                        <div className='projectpost_form_input-block'>
                            <div className='projectpost_form_input-block'>
                                <label className='projectpost_form_label'>환경</label>
                                <div className='projectpost_whitebox_long'>
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
                        </div>




                        <div className='projectpost_white-line'></div> {/*흰색 줄*/}

                        <div className='projectpost_step-num'>STEP 2</div>
                        <div className='projectpost_form_input-block'>
                            <div className='projectpost_form_input-block'>
                                <label className='projectpost_form_label'>모집글 제목</label>
                                <div className='projectpost_whitebox_long'>
                                    <input className='projectpost_input'
                                           type='text'
                                           defaultValue={projectTitle}
                                           placeholder='제목을 입력해주세요.'
                                           onChange={handleTitleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='projectpost_form_input-block'>
                            <div className='projectpost_form_input-block' style={{alignItems: 'flex-start'}}>
                                <label className='projectpost_form_label' style={{marginTop:'10px'}}>모집 내용</label>
                                <div className='projectpost_whitebox_big'>
                                    <textarea className='projectpost_textarea'
                                              defaultValue={projectContents}
                                              onChange={handleContentsChange}
                                              maxLength={1500}
                                              rows={17}
                                              placeholder='중요 내용 및 기술스택 등 자세한 내용을 작성해주세요.'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='projectpost_form_input-block'>
                            <div className='projectpost_form_input-block'>
                                <label className='projectpost_form_label'>모집 일정</label>
                                <div className='projectpost_whitebox_long' style={{width: '300px', marginRight: '230px'}}>
                                    <input className='projectpost_month'
                                           type='text'
                                           value={projectMonth}
                                           onChange={handleMonthChange}
                                    />
                                    <span className='projectpost_left'>월</span>
                                    <input className='projectpost_day'
                                           type='text'
                                           value={projectDay}
                                           onChange={handleDayChange}
                                    />
                                    <span className='projectpost_left'>일 까지</span>
                                    <span></span>
                                </div>
                            </div>
                        </div>

                        <div className='projectpost_white-line'></div> {/*흰색 줄*/}
                        {/*<div className='projectpost_step-num'>STEP 3</div>*/}
                        {/*<div className='projectpost_form_input-block'>*/}
                        {/*    <label className='projectpost_form_label' htmlFor="imgFile">사진 추가</label>*/}
                        {/*    <input className='projectpost_form_file-upload'*/}
                        {/*        type="file"*/}
                        {/*        accept="image/*"*/}
                        {/*        value={projectImage}*/}
                        {/*        onChange={handleImageUpload}*/}
                        {/*    />*/}
                        {/*    <button className='projectpost_whitebox_long' style={{border: 'none'}} id="profileImg">사진 추가</button>*/}
                        {/*    /!*이미지 미리보기*!/*/}
                        {/*    <div className="image-preview">*/}
                        {/*        {projectImage.map((image, index) => (*/}
                        {/*            <img key={index} src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} />*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <button className='projectpost_form_post'
                                onClick={handleSubmitClick}>
                            작성 완료
                        </button>
                    </form>

                </div>
            </main>
            {banner()}
        </div>
    );
}
export default Collect;