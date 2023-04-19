import React, { useState } from 'react';
import styled from 'styled-components';
import AllSearch from '../SearchBar/MenuSearchBar';

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 1.5px 3px rgba(0, 0, 0, 0.5);
    width: 900px;
    height: 500px;
    padding: 0;
    margin: 0;
    border: none;
    z-index: 2;
`;

const ModalOverlay = styled.div`
    background-color: rgba(255, 255, 255, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
`;

export default function MenuPopUpModal({ modalIsOpen, setModalIsOpen }) {
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (
        <div>
            <ModalOverlay onClick={closeModal} />
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <AllSearch></AllSearch>
            </ModalContainer>
        </div>
    );
}
