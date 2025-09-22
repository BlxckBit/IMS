const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect('mongodb+srv://blxckbit:Paradox11@cluster0.oyhmeov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
})
.catch(err => console.log(err));
