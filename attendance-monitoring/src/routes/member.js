const { Router } = require("express");

const { memberCtrl } = require("../controllers");
const { validatorMiddleware } = require("../middleware");
const { createAndUpdateRules, searchRules } = require("../validations/member");

const router = Router();

router.route("/").get(memberCtrl.getMembers).post(validatorMiddleware(createAndUpdateRules), memberCtrl.createMember);

router.route("/search").get(validatorMiddleware(searchRules), memberCtrl.searchMember);

router.route("/:id").get(memberCtrl.getMemberById).put(validatorMiddleware(createAndUpdateRules), memberCtrl.updateMember).delete(memberCtrl.deleteMember);

module.exports = router;
