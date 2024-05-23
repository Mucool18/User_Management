import Organization from '../models/organization.js';
import User from '../models/user.js';

export const createOrganisation = async (req, res) => {
    const { name } = req.body;
    const user = req.user;
    if(!user || !user.privilege ||!user.privilege.includes("ADMIN")){
        return res.status(400).json({success:false, data: "You are not authorised to perform this action" });
    }
    try {
      const organization = new Organization({ name, createdByUserId: user._id });
      await organization.save();
      return res.status(201).json({ success:true, data:organization });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
}

export const addUserToOrganization = async (req, res) => {
    const { userId } = req.body;  // we neeed to send userId of user we want to add in the organisation
    const { orgId } = req.params; // organisation id
    const session = req.session;
    if(!req.user || !req.user.privilege ||!req.user.privilege.includes("ADMIN")){
        return res.status(400).json({success:false, data: "You are not authorised to perform this action" });
    }
    try {
      const organization = await Organization.findById(orgId);
      const user = await User.findById(userId);
      if (!organization || !user) {
        return res.status(404).json({ success:false, data: 'Organization or User not found' });
      }
      if(user.organizations.includes(orgId)){
        return res.status(400).json({ success:false, data: 'User is already present in organisation' });
      }
           
      user.organizations.push(organization._id); // Admin will add user to organisation
      if(!session.currentOrganizationId){
        session.currentOrganizationId = organization._id;
        await session.save();
      }
      
      await user.save();
      return res.json({success:true, data: 'User added to organization' });
    } catch (error) {
      return res.status(500).json({ success: false, data: error.message });
    }
}

export const switchOrganisation = async(req,res)=>{
    const user = req.user;
    const {orgId} = req.body;
    const session = req.session;
    if(!user.organizations.includes(orgId)){
        return res.status(400).json({success:false, data: "User not present in organisation, First add user to the organisation" });
    }
    try {
        const organization = await Organization.findById(orgId);
        if (!organization) {
            return res.status(404).json({ success:false, data: 'Organization not found' });
        }
        session.currentOrganizationId = organization._id;
        await session.save();
        return res.json({success:true, data: "Switched Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, data: error.message });
    }
}