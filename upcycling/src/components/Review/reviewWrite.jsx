import React, { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CSS/reviewWrite.module.css'

//🍎 Review를 작성하는 페이지

const ReviewWrite = ({createAndUpdateReview , userId}) => {
    const formRef = useRef();
    const reviewCategoryRef = useRef();
    const reviewTitleRef = useRef();
    const reviewHashtagsRef = useRef();
    const reviewDescriptionRef = useRef();
    const reviewIMGRef = useRef();
    const [user] = useState(userId)

    //🍎user의 uid를 user에 저장함 -> 이후에 user가 닉넴이랑 userPhoto받아오게하기
    //일단은 GREEN 관리자로 사용할것!
    // const [user] = useState(userId)
    // console.log(userId)
    const navigate = useNavigate();

    const onSubmit = event => {
        event.preventDefault();

        const review = {
            id  : 'R' + Date.now(),
            nickname : 'GREEN 관리자',
            profileIMG : 'https://image.shutterstock.com/image-vector/default-avatar-profile-icon-social-260nw-1677509740.jpg',
            reviewIMG : 'https://dnvefa72aowie.cloudfront.net/origin/article/202206/aab8f307bc7c31a2a6016cd1cec6f585cae06bfe99398f8fe26de5633f85a980.webp?q=82&s=300x300&t=crop',
            reviewTitle : reviewTitleRef.current.value,
            reviewDescription : reviewDescriptionRef.current.value,
            reviewHashtags : reviewHashtagsRef.current.value,
            reviewCategory : reviewCategoryRef.current.value,
        }; 
        formRef.current.reset();
        createAndUpdateReview(review,user)
        navigate('/reviews');
    }

    return (
            <form className={styles.form} ref={formRef}>
                <select ref={reviewCategoryRef} name="reviewCategory" id="">
                    <option value="">말머리1</option>
                    <option value="">말머리2</option>
                    <option value="">말머리3</option>
                </select>
                
                    <label htmlFor="reviewTitle">
                        <input ref={reviewTitleRef} name='reviewTitle' type="text" placeholder='제목' />
                    </label>
                    <br/>
                    <label htmlFor="reviewHashtags">
                        <input ref={reviewHashtagsRef} name='reviewHashtags' type="text" placeholder='해시태그' />
                    </label>
                    
                    <br/>
                    <textarea 
                        ref={reviewDescriptionRef} 
                        name="" 
                        id="" 
                        cols="30" 
                        rows="10"
                        className={styles.reviewDescription}
                        >

                    </textarea>
                    <br/>
                    <input 
                        ref={reviewIMGRef}
                        type="file"
                        accept='image/*'
                        name='reviewIMG'
                    />
                    <br/>
                    <button onClick={onSubmit}>작성완료</button>
            </form>
        
    );
};

export default ReviewWrite;