import { Router } from "express";
import { createLink, getLink, getLinks, removeLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramsLinkValidator } from "../middlewares/validatorManager.js";


const router = Router();

//GET /api/vi/links all links
//GET /api/vi/links/:id single links
//POST /api/vi/links create links
//PATCH/PUT /api/vi/links/:id update link
//DELETE /api/vi/links/:id remove link
router.get("/", requireToken, getLinks);
router.get("/:id", requireToken, paramsLinkValidator, getLink);
router.delete("/:id", requireToken, paramsLinkValidator, removeLink);
router.post("/", requireToken, bodyLinkValidator, createLink);

export default router;