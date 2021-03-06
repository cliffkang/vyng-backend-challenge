import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const colors = ['#CDDC39', '#795548', '#009688', '#2196F3', '#673AB7', '#FFEB3B'];

const styles = () => ({
    button: {
        margin: '15px 7px',
    },
});

function YouTubeVids(props) {
    const { classes } = props;
    return (
        <div className='videos'>
            {props.videos.map(video => {
                return (
                    <Button
                        key={video}
                        className={classes.button}
                        onClick={props.handleVidClick(video)}
                        variant='outlined'
                        style={{ backgroundColor: `${colors[Math.floor(Math.random() * 6)]}80` }}
                    >
                        ID#: {video}
                    </Button>
                )
            })}
        </div>
    )
}

export default withStyles(styles)(YouTubeVids);
