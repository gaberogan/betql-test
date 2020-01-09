import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import _ from 'lodash'
import moment from 'moment'
import { OuterContainer, ScoreBox, ScoreBoxItem, LiveIcon, HorizontalScroll } from './StyledComponents'
import { scoreApi } from '../../util'

// Top-level logic to load + display score data

export const VersusList = () => {
    const [scores, setScores] = useState(_.range(5).map(() => ({ loading: true })))

    // Fetch scores
    useAsyncEffect(async () => {
        setScores(await scoreApi.mockScoresRequest())
    }, [])

    return (
        <OuterContainer>
            <LiveIcon />
            <HorizontalScroll>
                {scores.map((item, i) => <VersusListItem item={item} key={i} />)}
            </HorizontalScroll>
        </OuterContainer>
    )
}

// Score item

const VersusListItem = ({ item }) => {
    const hasStarted = !item.loading && moment.utc(item.time).isBefore(moment())
    const t0ahead = !item.loading && item.teams[0].score > item.teams[1].score

    if (item.loading) return (
        <ScoreBox style={{ color: '#eee', userSelect: 'none' }}>
            <ScoreBoxItem>██████</ScoreBoxItem>
            <ScoreBoxItem></ScoreBoxItem>
            <ScoreBoxItem>███████</ScoreBoxItem>
            <ScoreBoxItem>█████</ScoreBoxItem>
            <ScoreBoxItem></ScoreBoxItem>
            <ScoreBoxItem>████████████</ScoreBoxItem>
        </ScoreBox>
    )

    if (item.isFinal) return (
        <ScoreBox>
            <ScoreBoxItem style={{ fontWeight: t0ahead ? 'bold' : '' }}>{item.teams[0].name}</ScoreBoxItem>
            <ScoreBoxItem style={{ fontWeight: t0ahead ? 'bold' : '' }}>{item.teams[0].score}</ScoreBoxItem>
            <ScoreBoxItem style={{ fontWeight: 'bold' }}>FINAL</ScoreBoxItem>
            <ScoreBoxItem style={{ fontWeight: t0ahead ? '' : 'bold' }}>{item.teams[1].name}</ScoreBoxItem>
            <ScoreBoxItem style={{ fontWeight: t0ahead ? '' : 'bold' }}>{item.teams[1].score}</ScoreBoxItem>
            <ScoreBoxItem style={{ fontWeight: 'bold' }}>{item.betInfo}</ScoreBoxItem>
        </ScoreBox>
    )

    if (hasStarted) return (
        <ScoreBox>
            <ScoreBoxItem>{item.teams[0].name}</ScoreBoxItem>
            <ScoreBoxItem>{item.teams[0].score}</ScoreBoxItem>
            <ScoreBoxItem>STARTED</ScoreBoxItem>
            <ScoreBoxItem>{item.teams[1].name}</ScoreBoxItem>
            <ScoreBoxItem>{item.teams[1].score}</ScoreBoxItem>
            <ScoreBoxItem>{item.betInfo}</ScoreBoxItem>
        </ScoreBox>
    )

    if (!hasStarted) return (
        <ScoreBox>
            <ScoreBoxItem>{item.teams[0].name}</ScoreBoxItem>
            <ScoreBoxItem></ScoreBoxItem>
            <ScoreBoxItem>{moment.utc(item.time).calendar()}</ScoreBoxItem>
            <ScoreBoxItem>{item.teams[1].name}</ScoreBoxItem>
            <ScoreBoxItem></ScoreBoxItem>
            <ScoreBoxItem>{item.betInfo}</ScoreBoxItem>
        </ScoreBox>
    )
}
