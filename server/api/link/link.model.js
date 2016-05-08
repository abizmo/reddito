'use strict';

import mongoose from 'mongoose';

var LinkSchema = new mongoose.Schema({
  title: String,
  url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Link', LinkSchema);
