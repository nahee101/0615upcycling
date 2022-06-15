import {  useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";
import Hamburger from 'hamburger-react'
import './Nav.css'
//nav바 

const Nav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setOpen] = useState(false)
    //scroll 30 기준으로 trun fasle 
    useEffect(()=>{
        const handleScroll = ()=>{
            if(!scrolled && window.scrollY >30){
                setScrolled(true);
            }else if(scrolled && window.scrollY <=30){
                setScrolled(false);
            }
        };
        window.addEventListener('scroll',handleScroll);
        return()=>{
            window.removeEventListener('scroll', handleScroll);
        };
    },[scrolled]);
    useEffect(()=>{
        const clickb = ()=>{
            if(!isOpen){
                setOpen(true);
            }else if(isOpen){
                setOpen(false);
            }
        };
        window.addEventListener('click',clickb);
        return()=>{
            window.removeEventListener('click', clickb);
        };
    },[isOpen]);
    // useNavigate를 사용하여 원하는 주소로 이동할수 있다.
    const navigate = useNavigate();
    
    //navicate를 사용하여 mypage로 이동하세요
    const goHome = () => {
        navigate("/home");
    };
    const goIntro = () => {
        navigate("/intro");
    };
    const goEvent = () => {
        navigate("/event");
    };
    const goReview = () => {
        navigate("/reviews");
    };
    const goDeal = () => {
        navigate("/deals");
    };

    return (
        <div>
            <header className={scrolled ? 'fix-container scrolled' : 'fix-container'}>
                <nav className="navbar">
                    <div className="navbar_logo" onClick={goHome}>
                        <span className="logo_text">: UPTOWN</span>
                    </div>
                    <ul className={isOpen ? 'navbar_menu active' : 'navbar_menu'}>
                        <li onClick={goIntro}>Information</li>
                        <li onClick={goEvent}>Event</li>
                        <li onClick={goReview}>Review</li>
                        <li onClick={goDeal}>Sale</li>
                    </ul>
                    <ul className="navbar_property">
                        <li>MyPage</li>
                        <li>Logout</li>
                    </ul>
                    <div className="Hamburger">
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                </nav>
            </header>
    </div>
    );
};

export default Nav;
