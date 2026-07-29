import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, enum: ['endurance', 'strength', 'speed', 'recovery', 'mobility'] },
    scheduledFor: { type: Date, required: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    intensity: { type: String, required: true, enum: ['low', 'moderate', 'high'] },
    instructions: { type: [String], default: [] },
    completed: { type: Boolean, default: false },
}, { timestamps: true });
const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
export default Workout;
