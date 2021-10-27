const Register = require('../models/registrationModel');
exports.get_home = (req, res) => {
	res.render('home', { title: 'home' });
};

exports.get_register = (req, res) => {
	res.render('registrationForm', { title: 'registration' });
};

exports.post_register = async (req, res) => {
	let newUser = new Register({
		vcOwner: req.body.vcOwner,
		driverLicense: req.body.driverLicenseNumber,
		placeIssue: req.body.placeOfIssue,
		stateOfReg: req.body.state,
		vcChasisNumber: req.body.vcChasisNumber,
		engineNumber: req.body.engineNumber,
		vcType: req.body.vcType,
		vcCapacity: req.body.vcCapacity,
		address: req.body.address,
		email: req.body.email,
		insurer: req.body.insurer,
		phoneNumber: req.body.phoneNumber,
		password: req.body.password,
	});

	try {
		let user = await newUser.save();
		console.log(user);
		res.redirect(`user/${user.id}`);
	} catch (err) {
		console.log(err);
	}
};

exports.get_user = async (req, res) => {
	try {
		let user = await Register.findById(req.params.id);
		res.render('user-page', { user, title: 'user' });
	} catch (err) {
		console.log(err);
	}
};

exports.get_log_in = (req, res) => {
	res.render('log-in', { title: 'log-in' });
};
exports.post_log_in = async (req, res) => {
	try {
		let userEmail = await Register.findOne({email:req.body.email});
		let userpwd = await Register.findOne({password:req.body.password});

		if (userEmail && userpwd) res.redirect(`user/${userEmail.id}`);
		res.send('password or username incorrect')
	} catch (err) {
		console.log(err);
	}
};

exports.get_user_detail = async (req, res) => {
	try {
		let user = await Register.findById(req.params.id);
		res.render('full-detail', { user, title: 'user-full-detail' });
	} catch (err) {
		console.log(err);
	}
};

exports.patch_user = async (req, res) => {
	try {
		await Register.findByIdAndUpdate(req.params.id, {
			plateNumber: req.body.plateNumber,
			licenseExpiration: req.body.expiration,
		});
		res.redirect('/admin');
	} catch (err) {
		console.log(err);
	}
};

//! admin controller

exports.get_admin = async (req, res) => {
	const reject = () => {
		res.setHeader('www-authenticate', 'Basic');
		res.sendStatus(401);
	};
	const authorization = req.headers.authorization;
	if (!authorization) {
		return reject();
	}
	const [username, password] = Buffer.from(
		authorization.replace('Basic', ''),
		'base64'
	)
		.toString()
		.split(':');
	if (!(username == 'project-group' && password === 'project-group')) {
		return reject();
	}
	try {
		let users = await Register.find();
		res.render('admin-page', { users, title: 'admin' });
	} catch (err) {
		console.log(err);
	}
};
