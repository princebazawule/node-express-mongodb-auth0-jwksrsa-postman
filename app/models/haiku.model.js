module.exports = (mongoose, mongoosePaginate) => {
	const haikuSchema = mongoose.Schema(
		{
			'line1': String,
			'line2': String,
			'line3': String,
			'author': String
		}
	)

	haikuSchema.plugin(mongoosePaginate)

	const Haiku = mongoose.model('haiku', haikuSchema)

	return Haiku
}