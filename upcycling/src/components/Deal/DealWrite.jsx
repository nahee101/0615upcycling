/* ๐ฅ ๊ฑฐ๋๊ธ ์์ฑ! */
// 06-15 ์ฌ์ง ์๋ก๋ ๊ตฌํ ์ค

import React, { useState } from "react";
import { firestore, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid"; // ์ฌ์ง ๋๋ค ์์ด๋
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import { useContext } from "react";

const DealWrite = () => {
    const data = useContext(DataContext);
    /* ์์ฑํ ์ ๋ชฉ, ์นดํ๊ณ ๋ฆฌ, ๊ฐ๊ฒฉ, ๋ด์ฉ firestore์ ์ ์ฅ */
    const [dCategory, setDCategory] = useState(''); // ์นดํ๊ณ ๋ฆฌ
    const [dTitle, setDTitle] = useState(''); // ์ ๋ชฉ
    const [dHashtag, setDHashtag] = useState(''); // ํด์ํ๊ทธ
    const [dPrice, setDPrice] = useState(''); // ๊ฐ๊ฒฉ
    const [dContent, setDContent] = useState(''); // ๋ด์ฉ
    
    /* ์ฌ์ง์ storage */
    const [attachment, setAttachment] = useState('');
    let DAttachmentURL = '';

    const navigate = useNavigate();

    /* ์ฌ์ฉ ํจ์ */
    // submit
    const onSubmit = async(e) => {
        e.preventDefault();

        // 06-15 ํ์ผ ์กด์ฌํ  ๋, ์กด์ฌํ์ง ์์ ๋ if
        if (attachment !== '') {
            // 1. ํ์ผ ๊ฒฝ๋ก ์ฐธ์กฐ ๋ง๋ค๊ธฐ
            const DAttachmentURL = ref(storage, `${data.state.user.uid}/${uuidv4()}`);
            // 2. ํ์ผ ๊ฒฝ๋ก ์ฐธ์กฐ์ ํ์ผ ์๋ก๋
            // 3. ์ฐธ์กฐ ํ์ผ 
        }
        console.log(data.state.user)
        const userItem = data.state.user[0].id

        // submitํ๋ฉด ์ถ๊ฐํ  ๋ฐ์ดํฐ
        const dealObj = {
            category: dCategory, // ์นดํ๊ณ ๋ฆฌ
            title: dTitle, // ์ ๋ชฉ 
            hashtag: dHashtag,
            price: dPrice, // ๊ฐ๊ฒฉ
            content: dContent, // ๋ด์ฉ
            createdAt: Date.now(), // ์์ฑ๋ ์ง
            creatorId: userItem
            //creatorName: userItem.displayName, // ์์ฑํ ์ฌ๋ ๋ ํ์
            //attachmentUrl
        };

        console.log(dealObj)
        // dbDeals์ dealObj ํ์์ผ๋ก ์ถ๊ฐ
        await addDoc(collection(firestore, "dbDeals"), dealObj);

        // state๋ฅผ ๋น์์ form ๋น์ฐ๊ธฐ
        setDCategory("");
        setDTitle("");
        setDHashtag("");
        setDPrice("");
        setDContent("");

        // state๋ฅผ ๋น์์ ํ์ผ ๋ฏธ๋ฆฌ๋ณด๊ธฐ img src ๋น์ฐ๊ธฐ
        setAttachment("");

        navigate('/deals', {dealObj})
    }; // ํ์ด์ด๋ฒ ์ด์ค ์ ์ฅ ์

    const onChange = (e) => {
        const {target: {name, value}} = e;
        
        if(name === 'category') {
            setDCategory(value);
        } else if(name === 'title') {
            setDTitle(value);
        } else if(name === 'hashtag') {
            setDHashtag(value);
        } else if(name === 'price') {
            setDPrice(value);
        } else if(name === 'content') {
            setDContent(value);
        };
    };

    const onFileChange = (e) => {
        const {target: {files}} = e;
        // ํ ๋ฒ์ ํ ๊ฐ์ ํ์ผ ์๋ ฅํ๋๋ก ํ๋๋ฐ ์ฌ๋ฌ ์ฅ ๊ฐ๋ฅํ๊ฒ๋ ์์ ํด์ผ ํจ
        const theFile = files[0];
        // ํ์ผ ์ด๋ฆ ์ฝ๊ธฐ
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    // ์ด๋ฏธ์ง ์ฒจ๋ถ ์ทจ์
    const onClearAttatchment = () => setAttachment('');

    return (
        <div>
            <form
            onSubmit={onSubmit}>
                {/* ์นดํ๊ณ ๋ฆฌ ์์ฑ */}
                <label>์นดํ๊ณ ๋ฆฌ</label>
                <select>
                    <option name="category" value={dCategory}>์๋ฅ</option>
                    <option name="category" value={dCategory}>์กํ</option>
                    <option name="category" value={dCategory}>๋ทฐํฐ/๋ฏธ์ฉ</option>
                    <option name="category" value={dCategory}>๋ฐ๋ ค๋๋ฌผ</option>
                    <option name="category" value={dCategory}>๊ต์ก/์ฒดํ ํคํธ</option>
                    <option name="category" value={dCategory}>๊ธฐํ ์ค๊ณ ๋ฌผํ</option>
                </select> <br />

                {/* ์ ๋ชฉ ์์ฑ */}
                <label>์ ๋ชฉ</label>
                <input
                name="title"
                onChange={onChange}
                value={dTitle}
                type="text" 
                maxLength={80} /> <br />

                {/* ํด์ํ๊ทธ ์์ฑ */}
                <label>ํด์ํ๊ทธ</label>
                <input
                name="hashtag"
                onChange={onChange}
                value={dHashtag}
                type="text" 
                maxLength={80} /> <br />

                {/* ๊ฐ๊ฒฉ ์์ฑ */}
                <label>๊ฐ๊ฒฉ</label>
                <input
                name="price"
                onChange={onChange}
                value={dPrice}
                type="number" /> <br />

                {/* ๊ธ ์์ฑ */}
                <textarea
                name="content"
                onChange={onChange}
                value={dContent}
                cols="30" rows="10" /> <br />

                <input 
                onChange={onFileChange}
                type="file" 
                accept="image/*" />

                {/* ๊ฒ์๊ธ ์๋ก๋ */}
                <input 
                type="submit" 
                value="์์ฑ" />

                {/* ์๋ก๋ํ  ์ฌ์ง ๋ฏธ๋ฆฌ ๋ณด๊ธฐ */}
                {attachment && (
                    <div>
                        <img 
                        src={attachment} 
                        width="50px" height="50px" />

                        <button
                        onClick={onClearAttatchment}>Clear</button>
                    </div>
                )}
            </form>

        </div>
    );
};

export default DealWrite;