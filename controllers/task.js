import Task from '../models/task.js';
export const createTask = async (req, res) => {
    const { title, description } = req.body;
    const user = req.user;
    const session = req.session;
    if(!session.currentOrganizationId){
        return res.status(400).json({ success:false, data: "User is not switched to an organisation" });
    }
    try {
      const task = new Task({ title, description, organization: session.currentOrganizationId, createdByUser: user._id });
      await task.save();
      return res.status(201).json({  success: true, data:task });
    } catch (error) {
      return res.status(400).json({ success:false, data: error.message });
    }
}

export const getOrganizationTasks = async (req, res) => {
    const session = req.session;
    if(!session.currentOrganizationId){
        return res.status(400).json({ success:false, data: "User is not a part of any organisation"});
    }
    try {
      const tasks = await Task.find({ organization: session.currentOrganizationId}).populate('organization');
  
      if(!tasks){
        return res.status(400).json({ success:false, data: "No tasks found"});
      }
      return res.json({ success:true, data:tasks });
    } catch (error) {
      return res.status(500).json({ success:false, data: error.message });
    }
  }