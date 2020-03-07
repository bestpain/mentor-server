let mongoose=require('mongoose');
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds139921.mlab.com:39921/heroku_d5vk6b9t', {useNewUrlParser: true});

let db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongo")
});

let Schema=mongoose.Schema;

let taskSchema=Schema({
	title:String
})


let mentorSchema=Schema({
	name:String,
	subject:String,
	email:String,
	tasks:[taskSchema] //tasks will contain array of type taskSchema .....this tasks is an subdocuent of mentors schema
})

const mentor=new mongoose.model('mentors',mentorSchema)

exports.mentor=mentor;
