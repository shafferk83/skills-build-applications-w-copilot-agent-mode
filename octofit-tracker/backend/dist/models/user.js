import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    fitnessLevel: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    goals: { type: [String], default: [] },
    weeklyTargetMinutes: { type: Number, required: true, min: 30 },
}, { timestamps: true });
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
