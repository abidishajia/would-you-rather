import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '50%',
    marginTop: '180px',
    overflowX: 'auto',
    marginLeft: '300px'
  },
  table: {
    width: '100%',
  },
  avatar: {
    margin: 10,
    paddingLeft: 10,
    display: 'inline-block',
    width: 20,
    height: 20,
  }
});

class LeaderBoard extends PureComponent {

  render() {
    const { classes, board } = this.props
    return (
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Question Created</TableCell>
            <TableCell>Question Answered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {board.map((user, index) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{index + 1} </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell> 
                     <span> {user.created} </span> 
                     <Avatar  
                        alt={user.id} 
                        src={user.imageURL}
                        className={(classes.avatar)}
                      />
                </TableCell>
                <TableCell>{user.answered}</TableCell>
              </TableRow>
            );
          })} 
        </TableBody>
      </Table>
    </Paper>

     
    );
  }
}

function mapStateToProps ({ users }) {
  const board = Object.keys(users).map(id => ({
      id,
      imageURL: users[id].avatarURL,
      created : users[id].questions.length,
      answered: Object.keys(users[id].answers).length
    })
  ).sort((a, b) =>  b.created + b.answered - (a.created + a.answered))

  return {
    board
  }
}

export default withStyles(styles)(connect(mapStateToProps)(LeaderBoard))