/* ๐ฅ ๊ฑฐ๋๊ธ ์์ธํ! */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";

import { firestore } from "../../firebase";

import styles from './CSS/dealDetail.module.css'

import CommentWrite from "./CommentWrite";

const DealDetail = () => {
    /* ์ ์  ์ ๋ณด, ์์ฑ ๋ ์ง, ์์ฑํ ๋๊ธ firestroe์ ์ ์ฅ */
    const [dComments, setdComments] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const dealState = location.state.deal;

    /* ์ฌ์ฉ ํจ์ */
    // ๊ธ ์ญ์ 
    const onDeleteClick = async () => {
        const ok = window.confirm("์ ๋ง ์ด ๊ฒ์๊ธ์ ์ญ์ ํ์๊ฒ ์ต๋๊น?");
            if (ok) {
                    //ํด๋นํ๋ ๊ฒ์๊ธ ํ์ด์ด์คํ ์ด์์ ์ญ์ 
                    await deleteDoc(doc(firestore, `/dbDeals/${dealState.id}`));
                    // ์ญ์  ๋ฒํผ ๋๋ฅด๋ฉด /๊ฑฐ๋(ํ์ด๋ธ๊ฒ์ํ)๋ก ๋์ด๊ฐ
                    // ์ฒจ๋ถํ์ผ ์ญ์  ๊ธฐ๋ฅ ๋ค์ ๋ง๋ค์ด์ผ ํจ ใ 
                    navigate('/deals');
                }
            };
    
    // ๊ธ ์์ 
    const onReviseClick = (deal) => {
        navigate(`/deals/revise/${deal.createdAt}`, {state: {deal}})
    }

    return (
        <section>
            <div className={styles.header}>
                <div className={styles.userInfo}>
                    <p>ํ๋กํ ์ด๋ฏธ์ง</p>
                    <h3>๋๋ค์</h3>
                </div>

                <div className={styles.searchInput}>
                    <input type="text" />
                    <button>Search</button>
                </div>
            </div>

            <div className={styles.content}>
                <p>์ด๋ฏธ์ง</p>
                <div className={styles.container}>
                    <select Classname="" id="">
                        <option value="">์จ๊ธฐ๊ธฐ</option>
                        <option value="">์ ๊ณ ํ๊ธฐ</option>
                        <option value="">์ญ์ </option>
                        <option value="">์์ </option>
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
                    <p className={styles.heart}>๐งก์ข์์์จํด๋ฆญ</p>
                    <p className={styles.comment}>๐๋๊ธ๊ฐ์</p>
                </div>
                <div className={styles.icon_container_right}>
                    <button onClick={() => onReviseClick(dealState)}>์์ </button>
                    <button onClick={onDeleteClick}>์ญ์ </button>
                </div>
            </div>
            
            <div>
                <CommentWrite />
            </div>
            
        </section>
    );

};

export default DealDetail;