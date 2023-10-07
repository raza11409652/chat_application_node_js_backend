import mongoose, { Types } from 'mongoose';
const messageSchema = new mongoose.Schema(
  {
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    sender: {
      type: Types.ObjectId,
      ref: 'users',
      required: true,
    },
    receiver: {
      type: Types.ObjectId,
      ref: 'users',
      required: true,
    },
    status: {
      type: String,
      default: 'ENQUEUED',
      enum: ['ENQUEUED', 'SENT', 'DELIVERED', 'READ', 'DELETED'],
    },
    statusHistory: {
      type: Array<string>,
      default: [],
    },
    participants: {
      type: Array<Types.ObjectId>,
      default: [],
    },
  },
  { timestamps: true, collection: 'messages' },
);
messageSchema.index({ sender: 1, receiver: 1 });
messageSchema.index({ participants: 1, createdAt: 1 });

export default mongoose.model('messages', messageSchema);
