module.exports = function(mongoose) {

	var Schema = mongoose.Schema;

	var UserSchema = new Schema({

		name: String,

		paterno: String,

		materno: String,

		email: String,

		password: String

	});

	return mongoose.model('User', UserSchema);

}