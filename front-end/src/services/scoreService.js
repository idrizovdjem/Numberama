import axios from '../axios';

async function submitScore(score) {
    const rawResponse = await axios.post('/score/submit', { points: score });
    const response = rawResponse.data;
    return response;
}

async function getTopTen() {
    const rawResponse = await axios.get('/score/gettopten');
    return rawResponse.data;
}

const scoreService = {
    getTopTen,
    submitScore
};

export default scoreService;