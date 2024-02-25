const express = require("express");
const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
} = require("../utils/validators/userValidator");

const authService = require("../services/authService");

const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  //   changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require("../services/userService");

const router = express.Router();

router.use(authService.protect);

router.get("/getMe", getLoggedUserData, getUser);
router.put(
  "/chamgeMyPassword",
  changeUserPasswordValidator,
  updateLoggedUserPassword
);
router.put("/updateMe", updateLoggedUserValidator, updateLoggedUserData);

router.use(authService.protect, authService.allowedTo("admin")); //this middleware is general for all routes(in use)

router.route("/").get(getUsers).post(createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
