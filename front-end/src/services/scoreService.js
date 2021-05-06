import axios from '../axios';

async function submitScore(score) {
    const rawResponse = await axios.post('/score/submit', { points: score });
    const response = rawResponse.data;
    return response;
}

const scoreService = {
    submitScore
};

export default scoreService;