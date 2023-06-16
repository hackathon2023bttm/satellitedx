import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  operationProfileComplete: {
    type: Boolean,
    default: false,
  },
  operationProfileSessionId: {
    type: String,
  },
  creditProfileComplete: {
    type: Boolean,
    default: false,
  },
  creditProfileSessionId: {
    type: String,
  },
  balance: {
    type: Number,
    default: 5000
  },
});

const user = models.user || model('user', UserSchema);

export default user
