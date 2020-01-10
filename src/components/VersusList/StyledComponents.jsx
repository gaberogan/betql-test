import React, { useRef } from 'react'
import styled from 'styled-components'
import { Icon } from '../../components'

// Outer component container

export const OuterContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
`

// CSS for the list of matches/scores

export const ScoreList = styled.div`
    min-width: 330px;
    border: 1px solid #eee;
    border-left: 0px;
    padding: 25px 20px;
    display: grid;
    grid-template-columns: 6fr 2.5fr 12fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 7px;
    grid-row-gap: 7px;
    & > div:nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
    & > div:nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
    & > div:nth-child(3) { grid-area: 1 / 3 / 2 / 4; text-align: right; }
    & > div:nth-child(4) { grid-area: 2 / 1 / 3 / 2; }
    & > div:nth-child(5) { grid-area: 2 / 2 / 3 / 3; }
    & > div:nth-child(6) { grid-area: 2 / 3 / 3 / 4; text-align: right; }
`

// A box for each item

export const ScoreListItem = styled.div`
    background: #fff;
    white-space: nowrap;
    overflow: hidden;
`

// Horizontal scroll

const HorizontalScrollDiv = styled.div`
    display: flex;
    flex-direction: row;
    overflow: scroll;
    margin-right: 50px;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: -ms-autohiding-scrollbar;
`

const HorizontalScrollArrow = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border: 1px solid #eee;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 15px;
    cursor: pointer;
`

export const HorizontalScroll = ({ children }) => {
    const scrollDivRef = useRef()

    const scrollRight = () => {
        scrollDivRef.current.scrollBy({ 
            left: 330, 
            behavior: 'smooth',
        })
    }

    return (
        <HorizontalScrollDiv ref={scrollDivRef}>
            {children}
            <HorizontalScrollArrow onClick={scrollRight}>
                <Icon icon="chevron-right" size={30} color="#666" />
            </HorizontalScrollArrow>
        </HorizontalScrollDiv>
    )
}

// "LIVE" icon

const LiveIconDiv = styled.div`
    display: flex;
    background: #d55a56;
    align-items: center;
    padding: 10px;
    color: white;
    font-weight: bold;
`

export const LiveIcon = () => <LiveIconDiv>LIVE</LiveIconDiv>