/* ๐ฅ ๋๊ธ ์์ฑ */

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { doc, setDoc, collection, getDocs,
        onSnapshot, query, orderBy } from "firebase/firestore";

import { firestore } from "../../firebase";

import styles from './CSS/dealDetail.module.css'

import CommentItem from './CommentItem';

const CommentWrite = () => {
    /* ์ ์  ์ ๋ณด, ์์ฑ ๋ ์ง, ์์ฑํ ๋๊ธ firestroe์ ์ ์ฅ */
    const [dComment, setDComment] = useState('');
    /* fitestore์ ์ ์ฅํ ๋๊ธ ๊ฐ์ ธ์ค๊ธฐ */
    const [dComments, setDComments] = useState([]);

    const location = useLocation();
    const dealState = location.state.deal;

    useEffect(() => {

        const subColRef = collection(firestore, "dbDeals", `${dealState.id}`, "dComments");

        onSnapshot(subColRef, (querySnapshot) => {
            const commentArray = querySnapshot.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }));
            setDComments(commentArray);
        });    
    }, []);

    /* ์ฌ์ฉ ํจ์ */
    // ๋๊ธ ์์ฑ
    const onSubmit = async(e) => {
        e.preventDefault();

        //submitํ๋ฉด ์ถ๊ฐํ  ๋ฐ์ดํฐ
        const commentObj = {
            content: dComment, // ๋๊ธ
            //creatorId: userObj.uid,
            //creatorName: userObj.displayName, // ์์ฑํ ์ฌ๋ ๋ ํ์
            createdAt: Date.now()
        };

        // Date.now()๋ฅผ ๊ธฐ์ค์ผ๋ก ๋๊ธ ๋ฌธ์ ์์ฑ
        await setDoc(doc(collection(firestore, "dbDeals"), `/${dealState.id}`, `dComments/${Date.now()}`), commentObj)

        setDComment("");
    };

    const onChange = (e) => {
        setDComment(e.target.value);
    };

    return (
        <section>
            <div className="styles.comments_container">
                <form onSubmit={onSubmit}>
                    <textarea 
                    onChange={onChange}
                    value={dComment} cols="80" rows="5"></textarea>
                    <input type="submit" value="๋๊ธ ์์ฑ"/>
                </form>
            </div>
            <div>
                { 
                    dComments.map((dComment) => (
                        <CommentItem 
                        key={dComment.createdAt}
                        commentObj={dComment} />
                    ))
                }
            </div>
        </section>
    );

};

export default CommentWrite;