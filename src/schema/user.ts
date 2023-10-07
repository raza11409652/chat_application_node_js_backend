import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    mobileNumber: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: { type: String, required: true },
    avatarBackground: {
      type: String,
      default: '#FAFAFA',
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, collection: 'users' },
);
userSchema.index({ username: 1 });
userSchema.index({ username: 1, _id: 1 });

export default mongoose.model('users', userSchema);
