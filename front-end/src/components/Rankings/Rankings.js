import { useEffect, useState } from 'react';
import classes from './Rankings.module.css';

import scoreService from '../../services/scoreService';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Rankings = () => {
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        async function fetchRankings() {
            const response = await scoreService.getTopTen();
            if (response.successfull) {
                setRankings(response.data);
            }
        }

        fetchRankings();
    }, []);

    return (
        <div className={classes.Rankings}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell align="right">Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rankings.map((rank, index) => (
                            <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {rank.username}
                                </TableCell>
                                <TableCell align="right">{rank.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Rankings;