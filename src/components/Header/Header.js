import React, { useState } from 'react';
import styled from 'styled-components';
// import Modal from 'react-modal';
// import MenuPopUpModal from '../PopUpModal/MenuPopUpModal';

// Modal.setAppElement('#root');

const OutSide = styled.div`
    width: 100%;
    border: 1px black;
`;
// const PosterContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     height: 200px;
// `;
const Nav = styled.div`
    width: 100%;
    height: 60px;
    border: 1px black;
    display: flex;
    justify-content: space-between;
`;
const BarContainer = styled.div`
    display: flex;
`;
const Logo = styled.div`
    height: 30px;
    border: 1px black;
`;
const TripsContainer = styled.div``;
const BlogContainer = styled.div``;
const FavoritesContainer = styled.div``;
const LoginContainer = styled.div``;

// const MenuContainer = styled.div`
//     display: flex;
//     justify-content: center;
//     gap: 50px;
// `;
// const HotelSearchContainer = styled.div``;
// const AttractionSearchContainer = styled.div``;
// const RestaurantSearchContainer = styled.div``;
// const BlogSearchContainer = styled.div``;
// const AirplaneSearchContainer = styled.div``;
// const RouteSearchContainer = styled.div``;
// const ModalContainer = styled.div`
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background-color: white;
//     border-radius: 5px;
//     box-shadow: 0px 1.5px 3px rgba(0, 0, 0, 0.5);
//     width: 900px;
//     height: 500px;
//     padding: 0;
//     margin: 0;
//     border: none;
//     z-index: 2;
// `;

// const ModalOverlay = styled.div`
//     background-color: rgba(255, 255, 255, 0.7);
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     z-index: 1;
// `;
export default function Header() {
    // const [modalIsOpen, setModalIsOpen] = useState(false);
    // const openModal = () => {
    //     setModalIsOpen(true);
    // };

    // const closeModal = () => {
    //     setModalIsOpen(false);
    // };

    return (
        <>
            <OutSide>
                {/* <PosterContainer> */}
                <Nav>
                    <Logo>HANABi🎇</Logo>
                    <BarContainer>
                        <TripsContainer>
                            <button>Trips</button>
                        </TripsContainer>
                        <BlogContainer>
                            <button>BLOG</button>
                        </BlogContainer>
                        <FavoritesContainer>
                            <button>Favorites</button>
                        </FavoritesContainer>
                        <LoginContainer to='/GoogleLogin'>
                            <button>Login</button>
                        </LoginContainer>
                    </BarContainer>
                </Nav>
                {/* <MenuContainer>
                        <HotelSearchContainer onClick={openModal}>飯店</HotelSearchContainer>
                        <AttractionSearchContainer onClick={openModal}>景點</AttractionSearchContainer>
                        <RestaurantSearchContainer onClick={openModal}>餐廳</RestaurantSearchContainer>
                        <BlogSearchContainer>旅遊故事</BlogSearchContainer>
                        <AirplaneSearchContainer>航班狀態</AirplaneSearchContainer>
                        <RouteSearchContainer>路線搜尋</RouteSearchContainer>
                    </MenuContainer>
                </PosterContainer> */}
            </OutSide>
            {/* {modalIsOpen ? (
                // <div>
                //     <ModalOverlay onClick={closeModal} />
                //     <ModalContainer onClick={(e) => e.stopPropagation()}></ModalContainer>
                // </div>
                <MenuPopUpModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}></MenuPopUpModal>
            ) : null} */}
        </>
    );
}
