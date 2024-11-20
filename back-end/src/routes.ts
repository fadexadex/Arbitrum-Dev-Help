import express from "express";
const router = express.Router();
import uploadContract from "./utils/multer";
import compileAndDeploy from "./controller/compileAndDeploy";
import verifyRequestInputs from "./middlewares/validator";
import chat from "./controller/chat";

router.post(
  "/deploy",
  uploadContract.single("contract"),
  verifyRequestInputs,
  compileAndDeploy
);
router.post("/chat", chat);

export default router;
