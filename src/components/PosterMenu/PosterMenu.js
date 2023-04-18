import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import MenuPopUpModal from '../PopUpModal/MenuPopUpModal';

Modal.setAppElement('#root');

const OutSide = styled.div`
    width: 100%;
    border: 1px black;
`;
const PosterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px;
`;
const MenuContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
`;
const HotelSearchContainer = styled.div``;
const AttractionSearchContainer = styled.div``;
const RestaurantSearchContainer = styled.div``;
const BlogSearchContainer = styled.div``;
const AirplaneSearchContainer = styled.div``;
const RouteSearchContainer = styled.div``;
export default function PosterMenu() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (
        <>
            <OutSide>
                <PosterContainer>
                    <MenuContainer>
                        <HotelSearchContainer onClick={openModal}>飯店</HotelSearchContainer>
                        <AttractionSearchContainer onClick={openModal}>景點</AttractionSearchContainer>
                        <RestaurantSearchContainer onClick={openModal}>餐廳</RestaurantSearchContainer>
                        <BlogSearchContainer>旅遊故事</BlogSearchContainer>
                        <AirplaneSearchContainer>航班狀態</AirplaneSearchContainer>
                        <RouteSearchContainer>路線搜尋</RouteSearchContainer>
                    </MenuContainer>
                </PosterContainer>
            </OutSide>
            {modalIsOpen ? (
                // <div>
                //     <ModalOverlay onClick={closeModal} />
                //     <ModalContainer onClick={(e) => e.stopPropagation()}></ModalContainer>
                // </div>
                <MenuPopUpModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}></MenuPopUpModal>
            ) : null}
        </>
    );
}
