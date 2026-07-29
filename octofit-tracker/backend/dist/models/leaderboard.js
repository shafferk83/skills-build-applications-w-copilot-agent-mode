import mongoose, { Schema } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalPoints: { type: Number, required: true, min: 0 },
    totalMinutes: { type: Number, required: true, min: 0 },
}, { _id: false });
const leaderboardSchema = new Schema({
    weekStartDate: { type: Date, required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    topUsers: { type: [leaderboardEntrySchema], default: [] },
}, { timestamps: true });
const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export default Leaderboard;
