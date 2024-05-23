import mongoose from 'mongoose' ;

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  currentOrganizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  sessionToken: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Session', sessionSchema);
