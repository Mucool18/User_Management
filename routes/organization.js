import express from 'express';
import Organization from '../models/organization.js';
import User from '../models/user.js';
import { authenticate } from '../middleware/auth.js';
import { addUserToOrganization, createOrganisation, switchOrganisation } from '../controllers/organization.js';

const router = express.Router();

// Create organization
router.post('/', authenticate, createOrganisation);

// Add user to organisation
router.post('/:orgId/users', authenticate, addUserToOrganization);

// Switch organisatoin 
router.put("/switch/", authenticate, switchOrganisation);
export default router