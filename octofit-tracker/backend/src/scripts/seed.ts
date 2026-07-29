import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Carter',
        email: 'ava.carter@octofit.dev',
        age: 29,
        fitnessLevel: 'intermediate',
        goals: ['Run a half marathon', 'Improve weekly consistency'],
        weeklyTargetMinutes: 240,
      },
      {
        name: 'Diego Rivera',
        email: 'diego.rivera@octofit.dev',
        age: 34,
        fitnessLevel: 'advanced',
        goals: ['Increase VO2 max', 'Maintain race weight'],
        weeklyTargetMinutes: 320,
      },
      {
        name: 'Mina Patel',
        email: 'mina.patel@octofit.dev',
        age: 26,
        fitnessLevel: 'beginner',
        goals: ['Build strength', 'Complete 3 workouts per week'],
        weeklyTargetMinutes: 180,
      },
      {
        name: 'Leo Nakamura',
        email: 'leo.nakamura@octofit.dev',
        age: 31,
        fitnessLevel: 'intermediate',
        goals: ['Improve mobility', 'Bike 100km this month'],
        weeklyTargetMinutes: 210,
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Sprinters',
        city: 'Seattle',
        description: 'Hybrid cardio and strength team focused on consistency.',
        captain: users[1]._id,
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Pulse Pack',
        city: 'Austin',
        description: 'Community crew for progressive training and recovery balance.',
        captain: users[2]._id,
        members: [users[2]._id, users[3]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'run',
        durationMinutes: 52,
        caloriesBurned: 480,
        distanceKm: 9.4,
        date: new Date('2026-07-20T06:30:00.000Z'),
        notes: 'Tempo run with negative split.',
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'hiit',
        durationMinutes: 38,
        caloriesBurned: 430,
        distanceKm: 0,
        date: new Date('2026-07-21T12:00:00.000Z'),
        notes: '8 rounds rower and kettlebell swings.',
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'strength',
        durationMinutes: 47,
        caloriesBurned: 360,
        distanceKm: 0,
        date: new Date('2026-07-22T18:15:00.000Z'),
        notes: 'Full-body resistance with progressive overload.',
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        type: 'ride',
        durationMinutes: 75,
        caloriesBurned: 640,
        distanceKm: 28.1,
        date: new Date('2026-07-23T07:10:00.000Z'),
        notes: 'Outdoor zone-2 ride.',
      },
    ]);

    await Leaderboard.insertMany([
      {
        weekStartDate: new Date('2026-07-20T00:00:00.000Z'),
        team: teams[0]._id,
        topUsers: [
          { user: users[1]._id, totalPoints: 168, totalMinutes: 212 },
          { user: users[0]._id, totalPoints: 151, totalMinutes: 194 },
        ],
      },
      {
        weekStartDate: new Date('2026-07-20T00:00:00.000Z'),
        team: teams[1]._id,
        topUsers: [
          { user: users[3]._id, totalPoints: 159, totalMinutes: 205 },
          { user: users[2]._id, totalPoints: 142, totalMinutes: 181 },
        ],
      },
    ]);

    await Workout.insertMany([
      {
        user: users[0]._id,
        title: 'Threshold Run Session',
        focus: 'endurance',
        scheduledFor: new Date('2026-07-30T06:30:00.000Z'),
        durationMinutes: 60,
        intensity: 'high',
        instructions: ['10 min warm-up', '4 x 8 min threshold efforts', '10 min cool-down'],
        completed: false,
      },
      {
        user: users[1]._id,
        title: 'Power Circuit',
        focus: 'strength',
        scheduledFor: new Date('2026-07-30T12:00:00.000Z'),
        durationMinutes: 45,
        intensity: 'high',
        instructions: ['5 rounds: deadlift, push press, box jumps', 'Rest 90 seconds between rounds'],
        completed: true,
      },
      {
        user: users[2]._id,
        title: 'Beginner Full-Body Lift',
        focus: 'strength',
        scheduledFor: new Date('2026-07-31T17:30:00.000Z'),
        durationMinutes: 50,
        intensity: 'moderate',
        instructions: ['Goblet squats 3x12', 'Dumbbell rows 3x12', 'Farmer carries 4x40m'],
        completed: false,
      },
      {
        user: users[3]._id,
        title: 'Mobility and Recovery Flow',
        focus: 'recovery',
        scheduledFor: new Date('2026-08-01T08:00:00.000Z'),
        durationMinutes: 35,
        intensity: 'low',
        instructions: ['Thoracic opener routine', 'Hip mobility sequence', 'Guided breath work'],
        completed: false,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
