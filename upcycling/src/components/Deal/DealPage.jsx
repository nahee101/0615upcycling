/* π₯ deal κ²μν λͺ©λ‘ */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DealItem from "./DealItem";
import Nav from "../Nav/Nav";
import styles from './CSS/dealPage.module.css';

const DealPage = ({deals}) => {
    // title λλ₯΄λ©΄ κ²μκΈ λ΄μ© λ³Ό μ μλλ‘
    const navigate = useNavigate();

    const onClick = () => {
        navigate('/deals/write');
    };

    return (
        <div>
            <Nav/>
            <section className={styles.dealPage}>
                <h1>Deals</h1>
                
                <div className={styles.header}>
                    <div className={styles.search}>
                        <input type="text" />
                        <button>Search</button>
                    </div>
                    <button
                    className={styles.button_write}
                    onClick={onClick}>κΈ μμ±</button>
                </div>

                <ul className={styles.list}>
                    {
                        deals.map(deal => (
                            <li key={deal.createdAt}>
                                <DealItem deal={deal} />
                            </li>
                        ))
                    }
                </ul>
            </section>
        </div>
    );
};

export default DealPage;