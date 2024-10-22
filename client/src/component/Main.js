import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, IconButton, CircularProgress, Alert } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import {jwtDecode} from 'jwt-decode';

const Main = () => {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchFeeds() {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get('http://localhost:3100/feed', {
                headers : {token}
            });
            if (res.data.success) {
                setFeeds(res.data.list);
                console.log(res.data.list);
            } else {
                setError("피드를 불러오는 데 실패했습니다.");
            }
        } catch (err) {
            setError("서버 오류: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const dToken = jwtDecode(token);
            console.log(dToken); 
        } else {
            console.log("토큰이 존재하지 않습니다."); 
        }
        fetchFeeds();
    }, []); // 빈 배열을 넣어 의존성을 없앰으로써 처음 렌더링 시만 실행

    async function fnDelete(id) {
        if (!window.confirm("삭제하시겠습니까?")) {
            return;
        }
        try {
            const res = await axios.delete(`http://localhost:3100/feed/${id}`);
            if (res.data.success) {
                alert("삭제되었습니다");
                fetchFeeds();
            } else {
                alert("삭제에 실패했습니다.");
            }
        } catch (err) {
            alert("오류발생: " + err.message);
        }
    }

    async function fnUpdate(id) {
        // 여기에 피드 내용을 업데이트하는 모달이나 폼을 표시
        try {
            const res = await axios.put(`http://localhost:3100/feed/${id}`);
            if (res.data.success) {
                alert("수정되었습니다");
                fetchFeeds();
            } else {
                alert("수정에 실패했습니다.");
            }
        } catch (err) {
            alert("오류발생: " + err.message);
        }
    }

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={3}
            sx={{ backgroundColor: '#f0f4f8' }}
        >
            {feeds.map((feed) => (
                <Paper key={feed.id} sx={{ width: '100%', maxWidth: '600px', mb: 2, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        {feed.userId}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {feed.content}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" gutterBottom>
                        {new Date(feed.cdatetime).toLocaleString()}
                    </Typography>

                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <Box>
                            <IconButton color="primary" onClick={() => { fnUpdate(feed.id) }}>
                                <ThumbUpIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={() => { fnDelete(feed.id) }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Paper>
            ))}
        </Box>
    );
};

export default Main;
