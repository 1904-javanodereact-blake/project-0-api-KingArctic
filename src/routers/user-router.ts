import express from 'express';
import { theUsers } from '../classes';
export const userRouter = express.Router();

userRouter.get('', (req, res) =>
{
    console.log('Retrieving all users...');
    res.json(theUsers);
})

userRouter.post('/login', (req, res) => 
{
    const { username, password } = req.body;
    const theUser = theUsers.find(u => u.username === username && u.password === password);
  
    if (theUser) 
    {
      req.session.user = theUser;
      res.end();
    } 
    else 
    {
      res.sendStatus(401);
    }
  })

userRouter.get('/:id', (req, res) =>
{
    let found = false;
    let theUser = 0;
    console.log(`Retrieving user with id: ${req.params.id}...`);
    for (let x = 0; x < theUsers.length; x++)
    {
        if (theUsers[x].userId === +req.params.id)
        {
            found = true;
            theUser = x;
        }
    }
    if(found)
    {
        console.log(theUsers[theUser]);
        res.json(theUsers[theUser]);
    }
    else
    {
        console.log(found);
        console.log(theUser);
        res.send(`Unable to find user with given ID.`);
    }

})

userRouter.get('/username/:username', (req, res) =>
{
    let found = false;
    let theUser = 0;
    console.log(`Retrieving user with id: ${req.params.username}...`);
    for (let x = 0; x < theUsers.length; x++)
    {
        if (theUsers[x].username === req.params.username)
        {
            found = true;
            theUser = x;
        }
    }
    if(found)
    {
        console.log(theUsers[theUser]);
        res.json(theUsers[theUser]);
    }
    else
    {
        res.send(`Unable to find user with given ID.`);
    }
})

userRouter.post('', (req, res) =>
{
    let duplicate = false;
    console.log('Addind new user...');
    console.log(req.body);
    for (let x = 0; x < theUsers.length; x++)
    {
        if (theUsers[x].userId === +req.body.userId)
        {
            duplicate = true;
        }
    }
    if(!duplicate)
    {
        theUsers.push(req.body);
        res.send(`Saved ${req.body.username} in our user log.`);
    }
    else
        res.send(`Unable to add. Duplicate ID.`);
})

userRouter.patch('', (req, res) =>
{
    console.log('Updating user...');
    let found = false;
    let theUser = 0;
    console.log(`Retrieving user with id: ${req.body.userId}...`);
    for (let x = 0; x < theUsers.length; x++)
    {
        if (theUsers[x].userId === +req.body.userId)
        {
            found = true;
            theUser = x;
        }
    }
    if(found)
    {
        console.log(`Before updating...`)
        console.log(theUsers[theUser]);
        let tempUser = {...theUsers[theUser], ...req.body};
        theUsers.splice(theUser, 1);
        theUsers.push(tempUser);
        res.json(theUsers[theUser]);
    }
    else
    {
        console.log(found);
        console.log(theUser);
        res.send(`Unable to find user with given ID.`);
    }
})