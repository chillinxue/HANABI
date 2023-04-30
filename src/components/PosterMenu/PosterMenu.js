import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import BookMark from './bookmark.png';
import Planning from './planning.png';
import ProfileUser from './profile-user.png';
import BlogPhoto from './BlogPhoto.png';

const Icon = styled.img`
    width: 30px;
    height: 30px;
`;

const AllContainer = styled.div`
    /* display: flex; */
    display: grid;
    /* justify-content: center; */
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    box-sizing: border-box;
    padding: 30px 50px;
    gap: 50px;
`;
const BlogContainer = styled.div`
    /* width: 300px; */
    padding: 5px 20px;
    border: 3px solid white;
    box-sizing: border-box;
    border-radius: 20px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
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

    color: #fafafa;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    /* border: 1px solid white; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;
const PlanContainer = styled.div`
    /* width: 300px; */
    padding: 5px 20px;
    border: 3px solid white;
    box-sizing: border-box;
    border-radius: 20px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Plan = styled.div`
    /* width: 300px; */
    height: 36px;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 35px;
    text-align: center;

    color: #fafafa;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    /* border: 1px solid white; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;
const FavContainer = styled.div`
    /* width: 300px; */
    padding: 5px 20px;
    border: 3px solid white;
    box-sizing: border-box;
    border-radius: 20px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Fav = styled.div`
    /* width: 300px; */
    height: 36px;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 35px;
    text-align: center;

    color: #fafafa;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    /* border: 1px solid white; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;
const ProfileContainer = styled.div`
    /* width: 300px; */
    padding: 5px 20px;
    border: 3px solid white;
    box-sizing: border-box;
    border-radius: 20px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Profile = styled.div`
    /* width: 300px; */
    height: 36px;

    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 35px;
    text-align: center;

    color: #fafafa;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    /* border: 1px solid white; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;

export default function PosterMenu() {
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
                <Link to='/Profile' style={{ textDecoration: 'none' }}>
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
