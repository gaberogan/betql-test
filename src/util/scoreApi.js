import moment from "moment"
import { wait } from './misc'

const mockScores = [{
    teams: [
        { name: 'Tigers', score: 7 },
        { name: 'Philies', score: 12 },
    ],
    time: moment().subtract(2, "hours").valueOf(),
    isFinal: true,
    betInfo: 'PHI -6.5 O/U 43.5',
}, {
    teams: [
        { name: 'Marlins', score: 0 },
        { name: 'Rays', score: 0 },
    ],
    time: moment().subtract(.5, "hour").valueOf(),
    isFinal: false,
    betInfo: 'PHI -6.5 O/U 43.5',
}, {
    teams: [
        { name: 'White Sox', score: 0 },
        { name: 'Giants', score: 0 },
    ],
    time: moment().add(3, "hours").valueOf(),
    isFinal: false,
    betInfo: 'PHI -6.5 O/U 43.5',
}, {
    teams: [
        { name: 'Cubs', score: 0 },
        { name: 'Dodgers', score: 0 },
    ],
    time: moment().add(4, "days").valueOf(),
    isFinal: false,
    betInfo: 'PHI -6.5 O/U 43.5',
}, {
    teams: [
        { name: 'Rockies', score: 0 },
        { name: 'Royals', score: 0 },
    ],
    time: moment().add(4, "days").valueOf(),
    isFinal: false,
    betInfo: 'PHI -6.5 O/U 43.5',
}, {
    teams: [
        { name: 'Rockies', score: 0 },
        { name: 'Royals', score: 0 },
    ],
    time: moment().add(4, "days").valueOf(),
    isFinal: false,
    betInfo: 'PHI -6.5 O/U 43.5',
}, {
    teams: [
        { name: 'Rockies', score: 0 },
        { name: 'Royals', score: 0 },
    ],
    time: moment().add(4, "days").valueOf(),
    isFinal: false,
    betInfo: 'PHI -6.5 O/U 43.5',
}]

export const mockScoresRequest = async () => {
    await wait(1000)
    return mockScores
}