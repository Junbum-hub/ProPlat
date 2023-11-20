import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Header} from './Header';
import {banner} from './Banner';
import '../css/SignUp.css';
import axios from "axios";
import Pagination from "./Pagination";
import styled from "styled-components";
import '../css/Header.css';

const cellStyle = {
    width:'600px',
    borderRadius: '10px',
    border: '1px solid #ccc', // 열 구분선 스타일 설정
    padding: '10px', // 셀 내부 여백 설정
    marginTop:'20px',
    marginBottom:'20px'
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

function ProjectMain(){
    const [tempTech, setTempTech] = useState([]);
    const [tech, setTech] = useState([]);
    const [posts, setPosts] = useState([]);
    const [reversePosts, setReversePosts] = useState([]);
    const [postsTech, setPostsTech] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const navigate = useNavigate();
    const [items, setItems] = useState([]); // 배열 상태 초기화
    const [isBold, setIsBold] = useState(false);
    const [num, setNum] = useState('');
    const phoneRef = useRef();


    useEffect(() => {
        const profileInfo = async () => {

            axios.get('http://43.202.247.199:8080/post/list')
                .then(response => {
                    setPosts(response.data.content);
                    setReversePosts(response.data.content.reverse());
                    // setPostsTech(response.data.content.postStackList);
                })
                .catch(error => {
                    console.log("fail");
                });
        };
        profileInfo();
    }, []);


    const postDetail = (e) => {
        navigate('/ProjectContent/' + e.target.id);
    }

    const writePost = (e) => {
        e.preventDefault();
        navigate('/collect');
    }

    return (
        <div>
            <main>
                <Layout>
                    {Header()}
                    <main>
                        <div className='signup_main' style={{justifyContent:'center',alignItems:'center'}}>
                            <div style={{ display:'flex', justifyContent:'right',alignItems:'right'}}>
                                <p  onClick={writePost} style={{
                                    display: "inline-block",
                                    width: '240px',
                                    height: '30px',
                                    lineHeight: '30px',  /*글자 가운데 정렬 시키기 위해 높이 설정*/
                                    margin: '30px',
                                    cursor : 'pointer',
                                    borderRadius: '20px',
                                    textAlign: 'center',
                                    fontSize: '13px',
                                    backgroundColor: '#CCDDBB',
                                    boxShadow: '0px 2px 3px #c2c2c2' }}>글쓰기</p>
                            </div>
                            <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                                <span style={{fontSize: '20px', fontWeight: 'bold'}}> 게시물 목록 </span>
                            </div>



                            <div className='signup_txt-lineProjectMain'/> {/*회원가입 아래 줄*/}

                            <div style={{flex:'1',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}}>
                                <div style={tableStyle}>
                                    {reversePosts.slice(offset, offset + limit).map(({postId,title,content,complete, postingTime,postStackList}) => {
                                        if(complete === true){
                                            return <article style={cellStyle}>
                                                <div style={{flexDirection:'row', display:'flex'}}>
                                                    <div>
                                                        <p style={{flex:'1', borderRadius: '20px', border: '1px solid #ccc', color:'white',backgroundColor:'gray'}}>모집완료</p>
                                                    </div>
                                                    <p onClick={postDetail} id={postId}  style={{flex:'3',fontWeight:'bold'}}>{title}</p>
                                                </div>
                                                <p style={{marginTop:'10px', textAlign:'left',alignItems:'left'}}>{content}</p>
                                                {tech.map(itemTech => {
                                                    return <p style={{marginTop:'10px'}}>{itemTech.name}</p>
                                                })}
                                                <p style={{marginTop:'10px'}}>stack</p>
                                                <p style={{marginTop:'10px'}}>{postingTime}</p>
                                            </article>
                                        }
                                        else{
                                            return <article style={cellStyle}>
                                                <div style={{flexDirection:'row', display:'flex'}}>
                                                    <div>
                                                        <p style={{flex:'1', borderRadius: '20px', border: '1px solid #ccc',color:'white',backgroundColor:'gray'}}>모집중</p>
                                                    </div>
                                                    <p onClick={postDetail} id={postId} style={{flex:'3',fontWeight:'bold'}}>{title}</p>
                                                </div>
                                                <p style={{marginTop:'10px', textAlign:'left',alignItems:'left'}}>{content}</p>
                                                <div style={{display:'flex', flexDirection:'row'}}>
                                                    {postStackList.map(itemTech => {
                                                        return <p style={{marginTop:'10px', marginLeft:'10px'}}>{itemTech.name}</p>
                                                    })}
                                                </div>

                                                <p style={{marginTop:'10px'}}>{postingTime}</p>
                                            </article>
                                        }
                                    })}
                                </div>
                            </div>
                            <footer>
                                <Pagination
                                    total={posts.length}
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
    );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;
export default ProjectMain;