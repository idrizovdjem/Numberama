function generateRow() {
    const row = [];
    for(let i = 0; i < 10; i++) {
        const number = Math.floor(Math.random() * 9) + 1;
        row.push(number);
    }
    return row;
}

const numberService = {
    generateRow
};

export default numberService;