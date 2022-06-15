import { useNavigate } from 'react-router-dom';
import ReviewItem from './reviewItem';
import styles from './CSS/reviewPage.module.css'
import { useState } from 'react';


//🍎전체 Review를 보여주는 페이지

const ReviewPage = ({reviews}) => {

    const navigator = useNavigate()
    const [onReviews] = useState(Object.values(reviews))

    // console.log(reviews)

    return (
        <section className={styles.reviewPage}>
            <h1>Reviews</h1>
            <div className={styles.header}>
                <div className={styles.search}>
                    <input type="text" />
                    <button>search</button> 
                </div>
                <button className={styles.button_write}
                        onClick={()=>{
                            navigator('/reviews/write')
                        }}>글쓰기
                </button>
            </div>

            <ul className={styles.list}>
                {
                    onReviews.map(review => (
                    <li key={review.id}>
                        <ReviewItem review={review}/>
                    </li>))
                }
            </ul>
        </section>
    );
};

export default ReviewPage;