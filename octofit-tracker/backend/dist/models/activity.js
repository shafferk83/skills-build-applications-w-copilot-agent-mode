import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: { type: String, required: true, enum: ['run', 'ride', 'strength', 'mobility', 'hiit', 'swim'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0, default: 0 },
    date: { type: Date, required: true },
    notes: { type: String, default: '' },
}, { timestamps: true });
const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export default Activity;
