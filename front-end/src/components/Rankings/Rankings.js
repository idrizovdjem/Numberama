import { useEffect, useState } from 'react';
import classes from './Rankings.module.css';

import scoreService from '../../services/scoreService';

const Rankings = () => {
    const [rankings, setRankings] = useState([]);
    const [userRank, setUserRank] = useState(null);
    const [userIndex, setUserIndex] = useState(-1);

    useEffect(() => {
        async function fetchRankings() {
            const response = await scoreService.getRankings();
            if (response.successfull) {
                setRankings(response.data.topTen);
                setUserRank(response.data.userRank);
                setUserIndex(response.data.userRankIndex);
            }
        }

        fetchRankings();
    }, []);

    return (
        <div className={classes.Rankings}>
            <div className={classes.Table}>
                <div className={classes.TableRow}>
                    <div className={classes.TableNumber}>Rank</div>
                    <div className={classes.TableUsername}>Username</div>
                    <div className={classes.TableScore}>Score</div>
                </div>

                {
                    rankings.map((rank, index) => {
                        const tableClass = index === userIndex ? classes.UserTableRow : classes.TableRow;

                        return (
                            <div key={index} className={tableClass}>
                                <div className={classes.TableNumber}>{rank.position}</div>
                                <div className={classes.TableUsername}>{rank.username}</div>
                                <div className={classes.TableScore}>{rank.score}</div>
                            </div>
                        );
                    })
                }

                {
                    userRank !== null ?
                        <div className={classes.UserTableRow}>
                            <div className={classes.TableNumber}>{userRank.position}</div>
                            <div className={classes.TableUsername}>{userRank.username}</div>
                            <div className={classes.TableScore}>{userRank.score}</div>
                        </div> : null
                }
            </div>
        </div>
    );
}

export default Rankings;