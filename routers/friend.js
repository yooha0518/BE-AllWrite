const { Router } = require("express");
const { friendController } = require("../controller");
const friendRouter = Router();
const getUserFromJwt = require("../middlewares/getUserFromJwt");

//친구 테이블 전체 조회
friendRouter.get("/", getUserFromJwt, friendController.getfriendtable);

//친구 전체 조회
friendRouter.get("/all", getUserFromJwt, friendController.getAllfriends);

//친구 요청
friendRouter.post("/request", getUserFromJwt, friendController.sendFriend);

//친구 요청 수락
friendRouter.post("/response", getUserFromJwt, friendController.acceptFriend);

//받은 친구요청 조회
friendRouter.get("/request", getUserFromJwt, friendController.getReqfriend);

//보낸 친구요청 조회
friendRouter.get("/requested", getUserFromJwt, friendController.sendReqfriend);

//친구 삭제
friendRouter.delete("/:friendEmail", getUserFromJwt, friendController.deleteFriend);

module.exports = friendRouter;
