function generateRow() {
    const row = [];
    for(let i = 0; i < 10; i++) {
        const number = Math.floor(Math.random() * 10);
        row.push(number);
    }
    return row;
}

const numberService = {
    generateRow
};

export default numberService;