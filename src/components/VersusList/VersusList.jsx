import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import _ from 'lodash'
import moment from 'moment'
import { OuterContainer, ScoreList, ScoreListItem, LiveIcon, HorizontalScroll } from './StyledComponents'
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
        <ScoreList style={{ color: '#eee', userSelect: 'none' }}>
            <ScoreListItem>██████</ScoreListItem>
            <ScoreListItem></ScoreListItem>
            <ScoreListItem>███████</ScoreListItem>
            <ScoreListItem>█████</ScoreListItem>
            <ScoreListItem></ScoreListItem>
            <ScoreListItem>████████████</ScoreListItem>
        </ScoreList>
    )

    if (item.isFinal) return (
        <ScoreList>
            <ScoreListItem style={{ fontWeight: t0ahead ? 'bold' : '' }}>{item.teams[0].name}</ScoreListItem>
            <ScoreListItem style={{ fontWeight: t0ahead ? 'bold' : '' }}>{item.teams[0].score}</ScoreListItem>
            <ScoreListItem style={{ fontWeight: 'bold' }}>FINAL</ScoreListItem>
            <ScoreListItem style={{ fontWeight: t0ahead ? '' : 'bold' }}>{item.teams[1].name}</ScoreListItem>
            <ScoreListItem style={{ fontWeight: t0ahead ? '' : 'bold' }}>{item.teams[1].score}</ScoreListItem>
            <ScoreListItem style={{ fontWeight: 'bold' }}>{item.betInfo}</ScoreListItem>
        </ScoreList>
    )

    if (hasStarted) return (
        <ScoreList>
            <ScoreListItem>{item.teams[0].name}</ScoreListItem>
            <ScoreListItem>{item.teams[0].score}</ScoreListItem>
            <ScoreListItem>STARTED</ScoreListItem>
            <ScoreListItem>{item.teams[1].name}</ScoreListItem>
            <ScoreListItem>{item.teams[1].score}</ScoreListItem>
            <ScoreListItem>{item.betInfo}</ScoreListItem>
        </ScoreList>
    )

    if (!hasStarted) return (
        <ScoreList>
            <ScoreListItem>{item.teams[0].name}</ScoreListItem>
            <ScoreListItem></ScoreListItem>
            <ScoreListItem>{moment.utc(item.time).calendar()}</ScoreListItem>
            <ScoreListItem>{item.teams[1].name}</ScoreListItem>
            <ScoreListItem></ScoreListItem>
            <ScoreListItem>{item.betInfo}</ScoreListItem>
        </ScoreList>
    )
}
