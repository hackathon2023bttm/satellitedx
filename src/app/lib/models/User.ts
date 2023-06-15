import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
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
});

const user = models.user || model('user', UserSchema);

export default user
