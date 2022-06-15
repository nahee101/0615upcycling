/* 🥑 거래글 자세히! */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";

import { firestore } from "../../firebase";

import styles from './CSS/dealDetail.module.css'

import CommentWrite from "./CommentWrite";

const DealDetail = () => {
    /* 유저 정보, 작성 날짜, 작성한 댓글 firestroe에 저장 */
    const [dComments, setdComments] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const dealState = location.state.deal;

    /* 사용 함수 */
    // 글 삭제
    const onDeleteClick = async () => {
        const ok = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
            if (ok) {
                    //해당하는 게시글 파이어스토어에서 삭제
                    await deleteDoc(doc(firestore, `/dbDeals/${dealState.id}`));
                    // 삭제 버튼 누르면 /거래(테이블게시판)로 넘어감
                    // 첨부파일 삭제 기능 다시 만들어야 함 ㅠ
                    navigate('/deals');
                }
            };
    
    // 글 수정
    const onReviseClick = (deal) => {
        navigate(`/deals/revise/${deal.createdAt}`, {state: {deal}})
    }

    return (
        <section>
            <div className={styles.header}>
                <div className={styles.userInfo}>
                    <p>프로필 이미지</p>
                    <h3>닉네임</h3>
                </div>

                <div className={styles.searchInput}>
                    <input type="text" />
                    <button>Search</button>
                </div>
            </div>

            <div className={styles.content}>
                <p>이미지</p>
                <div className={styles.container}>
                    <select Classname="" id="">
                        <option value="">숨기기</option>
                        <option value="">신고하기</option>
                        <option value="">삭제</option>
                        <option value="">수정</option>
                    </select>
                    <div className={styles.title}>
                        <h3>{dealState.title}</h3>
                        <p>{dealState.hashtag}</p>
                    </div>
                    <p className={styles.description}>{dealState.content}</p>
                </div>
            </div>

            <hr />
            <div className={styles.icon_container}>
                <div className={styles.icon_container_left}>
                    <p className={styles.heart}>🧡좋아요온클릭</p>
                    <p className={styles.comment}>💌댓글개수</p>
                </div>
                <div className={styles.icon_container_right}>
                    <button onClick={() => onReviseClick(dealState)}>수정</button>
                    <button onClick={onDeleteClick}>삭제</button>
                </div>
            </div>
            
            <div>
                <CommentWrite />
            </div>
            
        </section>
    );

};

export default DealDetail;