const { Router } = require("express");

const { memberCtrl } = require("../controllers");
const { validate } = require("../middleware");
const { createAndUpdateRules, searchRules } = require("../validations/member");

const router = Router();

router.route("/").get(memberCtrl.getMembers).post(validate(createAndUpdateRules), memberCtrl.createMember);

router.route("/search").get(validate(searchRules), memberCtrl.searchMember);

router.route("/:id").get(memberCtrl.getMemberById).put(validate(createAndUpdateRules), memberCtrl.updateMember).delete(memberCtrl.deleteMember);

module.exports = router;
