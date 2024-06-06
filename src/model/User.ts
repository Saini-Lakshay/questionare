import mongoose, { Schema, Document } from "mongoose";

export interface Questions extends Document {
  ques: string;
  ans: string;
  // category?: string,
  createdAt: Date;
}

const QuestionsSchema: Schema<Questions> = new Schema({
  ques: {
    type: String,
    required: true,
  },
  ans: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface Users extends Document {
  email: string;
  password: string;
  createdAt: Date;
  questions: Questions[];
}
const UsersSchema: Schema<Users> = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      "Please enter valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  questions: [QuestionsSchema],
});

const UserModel =
  (mongoose.models.Users as mongoose.Model<Users>) ||
  mongoose.model<Users>("Users", UsersSchema);

export default UserModel;
