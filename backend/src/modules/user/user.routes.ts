import express from "express";
import { updateProfile, getUser,searchUserByMobile ,getFullUserProfile,updateUserByAdmin} from "./user.controller";
import { protectUser } from "../../middlewares/userAuth.middleware";
import { protectAdmin } from "../../middlewares/adminAuth.middleware";
import { allowPermissions } from "../../middlewares/permission.middleware";
import { userEntryByNodal } from "./user.controller";


const router = express.Router();

//User routes
router.post("/update", protectUser, updateProfile);
router.get("/me", protectUser  , getUser);

//  NODAL ROUTE
router.post(
  "/entry",
  protectAdmin,
  allowPermissions("visit_create"),
  userEntryByNodal
);

router.get(
  "/search",
  protectAdmin, 
  searchUserByMobile
);


router.get(
  "/profile/:id",
  protectAdmin,
  getFullUserProfile
);

router.put(
  "/:id",
  protectAdmin,
  updateUserByAdmin
);

export default router;
