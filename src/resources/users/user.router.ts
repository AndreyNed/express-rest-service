import express  = require('express');

import IUser from '../../types/user';

const router = require('express').Router();

const User = require('./user.model');
const usersService = require('./user.service');
const userMiddleware = require('./user.middleware');
const defaultHttpErrorHandler = require('../../utils/default.http.error.handler');

/** Returns all users without passwords */
router.route('/')
  .get(async (req:express.Request, res:express.Response):Promise<void> => {
    try {
      const users:IUser[] = await usersService.getAll();
  
      res.status(200).json(users.map(User.toResponse));
    } catch (e) {
      defaultHttpErrorHandler(e, res);
    }
  });

/** Creates new user and returns their data without passwords */
router.route('/')
  .post(async (req:express.Request, res:express.Response):Promise<void> => {
    try {
      const user:IUser = await usersService.create(req.body);
  
      res.status(201).json(User.toResponse(user));
    } catch (e) {
      defaultHttpErrorHandler(e, res);
    }
  });

/** Finds user by params.userId and sets to res.locals.user */
router.use('/:userId', userMiddleware.getUser);

/** Returns user by params.userId without password */
router.route('/:userId')
  .get(async (req:express.Request, res:express.Response):Promise<void> => {
    res.status(200).json(User.toResponse(res.locals.user));
  });

/** Updates user with new data and returns data without password */
router.route('/:userId')
  .put(async (req:express.Request, res:express.Response):Promise<void> => {
    try {
      const user:IUser = await usersService.update(
        res.locals.user,
        req.body,
      );
  
      res.status(200).json(User.toResponse(user));
    } catch (e) {
      defaultHttpErrorHandler(e, res);
    }
  });

/** Removes user by params.userId */
router.route('/:userId')
  .delete(async (req:express.Request, res:express.Response):Promise<void> => {
    try {
      await usersService.deleteUser(res.locals.user.id);
  
      res.sendStatus(204);
    } catch(e) {
      defaultHttpErrorHandler(e, res);
    }
  });

module.exports = router;

export {};
