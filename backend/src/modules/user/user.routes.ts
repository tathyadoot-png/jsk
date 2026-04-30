import express from "express";
import { updateProfile, getUser,searchUserByMobile ,getFullUserProfile,updateUserByAdmin} from "./user.controller";
import { protectUser } from "../../middlewares/userAuth.middleware";
import { protectAdmin } from "../../middlewares/adminAuth.middleware";
import { allowPermissions } from "../../middlewares/permission.middleware";
import { userEntryByNodal } from "./user.controller";
import { PERMISSIONS } from "../../utils/permissions";


const router = express.Router();

//User routes
router.post("/update", protectUser, updateProfile);
router.get("/me", protectUser  , getUser);

//  NODAL ROUTE
router.post(
  "/entry",
  protectAdmin,
  allowPermissions(PERMISSIONS.VISIT_CREATE),
  userEntryByNodal
);

// 🔍 SEARCH USER
router.get(
  "/search",
  protectAdmin,
  allowPermissions(PERMISSIONS.VISIT_CREATE), // nodal allowed
  searchUserByMobile
);

// 👤 FULL PROFILE
router.get(
  "/profile/:id",
  protectAdmin,
  allowPermissions(PERMISSIONS.VISIT_VIEW), // view access
  getFullUserProfile
);

// ✏️ UPDATE USER (ADMIN ONLY)
router.put(
  "/:id",
  protectAdmin,
  allowPermissions(PERMISSIONS.ADMIN_PANEL), // only admin
  updateUserByAdmin
);

export default router;