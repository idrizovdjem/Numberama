import axios from '../axios';

async function submitScore(score) {
    const rawResponse = await axios.post('/score/submit', { points: score });
    const response = rawResponse.data;
    return response;
}

async function getRankings() {
    const rawResponse = await axios.get('/score/rankings');
    return rawResponse.data;
}

const scoreService = {
    getRankings,
    submitScore
};

export default scoreService;