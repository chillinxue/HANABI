import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BookMark from './bookmark.png';
import Planning from './planning.png';
import ProfileUser from './profile-user.png';
import BlogPhoto from './BlogPhoto.png';

const Icon = styled.img`
    width: 20px;
    height: 20px;
`;

const AllContainer = styled.div`
    /* display: flex; */
    display: grid;
    /* justify-content: center; */
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    box-sizing: border-box;
    padding: 40px 70px;
    gap: 40px;
    box-sizing: border-box;
`;
const BlogContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 20px;
    background-color: #fafafa;
    border: 5px solid #fafafa;
`;
const Blog = styled.div`
    /* width: 100%; */
    height: 36px;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 35px;
    text-align: center;

    color: #2d2d2d;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    /* border: 1px solid white; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;
const PlanContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 20px;
    background-color: #fafafa;
    border: 5px solid #fafafa;
`;
const Plan = styled.div`
    /* width: 100%; */
    height: 36px;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 35px;
    text-align: center;

    color: #2d2d2d;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    /* border: 1px solid white; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;
const FavContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 20px;
    background-color: #fafafa;
    border: 5px solid #fafafa;
`;
const Fav = styled.div`
    /* width: 100%; */
    height: 36px;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 35px;
    text-align: center;

    color: #2d2d2d;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    /* border: 1px solid white; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;
const ProfileContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 20px;
    background-color: #fafafa;
    border: 5px solid #fafafa;
`;
const Profile = styled.div`
    /* width: 100%; */
    height: 36px;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 35px;
    text-align: center;

    color: #2d2d2d;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    /* border: 1px solid white; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;

export default function PosterMenuBlack() {
    return (
        <>
            <AllContainer>
                <Link to='/Blog' style={{ textDecoration: 'none' }}>
                    <BlogContainer>
                        <Blog>
                            BLOG ブログ
                            <Icon src={BlogPhoto}></Icon>
                        </Blog>
                    </BlogContainer>
                </Link>
                <Link to='/Trips' style={{ textDecoration: 'none' }}>
                    <PlanContainer>
                        <Plan>
                            PLAN 旅程を計画
                            <Icon src={Planning}></Icon>
                        </Plan>
                    </PlanContainer>
                </Link>
                <Link to='/Favorites' style={{ textDecoration: 'none' }}>
                    <FavContainer>
                        <Fav>
                            FAVORITES 好き
                            <Icon src={BookMark}></Icon>
                        </Fav>
                    </FavContainer>
                </Link>
                <Link to='/Profile' style={{ textDecoration: 'none' }}>
                    <ProfileContainer>
                        <Profile>
                            PROFILE 会员
                            <Icon src={ProfileUser}></Icon>
                        </Profile>
                    </ProfileContainer>
                </Link>
            </AllContainer>
        </>
    );
}
