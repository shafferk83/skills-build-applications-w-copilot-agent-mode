import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    captain: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
}, { timestamps: true });
const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export default Team;
