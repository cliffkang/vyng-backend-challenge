import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const colors = ['#CDDC39', '#795548', '#009688', '#2196F3', '#673AB7', '#FFEB3B'];

const styles = () => ({
    button: {
        margin: '15px 7px',
    },
});

function DisplayTags(props) {
    const { classes } = props;
    return (
        <div className='tags'>
            {props.hashtags.map((tag,i) => {
                return (
                    <Button
                        key={tag}
                        className={classes.button} 
                        onClick={props.handleTagClick(`${i}`)}
                        variant='outlined'
                        style={{ backgroundColor: `${colors[Math.floor(Math.random() * 6)]}80` }}
                    >
                        #{tag}
                    </Button>
                )
            })}
        </div>
    )
}

export default withStyles(styles)(DisplayTags);
