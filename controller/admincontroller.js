const admin = require('../model/adminmodel')

const fs = require('fs');

const path = require('path');

const nodemailer = require('nodemailer');

// login-logqut

module.exports.login = async(req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
        return res.render('login')
    }
};

module.exports.chacklogin = async(req, res) => {
    req.flash('success', 'you are in login')
    return res.redirect('/dashboard')

}

module.exports.Logout = async(req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        } else {
            return res.redirect('/')
        }
    });
}

// login-logqut

// password
module.exports.password = async(req, res) => {

    return res.render('password')
}

module.exports.modifypassword = async(req, res) => {
        try {
            if (await req.user.password == req.body.cupass) {
                if (req.body.cupass != req.body.npass) {
                    if (req.body.npass == req.body.copass) {
                        let newpass = await admin.findByIdAndUpdate(req.user.id, {
                            password: req.body.npass
                        })
                        if (newpass) {
                            return res.redirect('/logout')

                        } else {
                            console.log("not mach");
                            return res.redirect('back')
                        }
                    } else {
                        console.log("npass and copass in not mach");
                    }
                } else {
                    console.log("npass and cupass is same");
                    return res.redirect('back')
                }
            } else {
                console.log("cupass is not mach");
                return res.redirect('back')
            }
        } catch (error) {
            console.log(error);
        }
    }
    // password

// Forget Password

module.exports.chackemail = async(req, res) => {
    return res.render('chackemail')
};

module.exports.emailchack = async(req, res) => {
    let admindata = await admin.findOne({ email: req.body.email });
    if (admindata) {
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "a77aec8d4160be",
                pass: "e9fddb09825682"
            }
        });

        let otp = Math.round(Math.random() * 100000);
        res.cookie('otp', otp);
        res.cookie('email', req.body.email);

        let info = await transport.sendMail({
            from: 'chintan@gmail.com', // sender address
            to: "kheni@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `Your Otp is ${otp}`, // html body
        });

        req.flash('success', 'otp has been send,check your email');
        return res.redirect('/chackotp');
    } else {
        req.flash('error', 'invalid email!');
        return res.redirect('back');
    }
};

module.exports.chackotp = async(req, res) => {
    return res.render('chackotp')
};

module.exports.otpchack = async(req, res) => {
    try {
        if (req.body.otp == req.cookies.otp) {
            return res.redirect('/changeforgetpass');
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports.changeforgetpass = async(req, res) => {
    return res.render('changeforgetpass')
};

module.exports.confirmpass = async(req, res) => {
    try {
        if (req.body.npass === req.body.cpass) {
            let email = req.cookies.email;
            // console.log(email);
            let adminData = await admin.findOne({ email: email });
            // let bpass = await bcrypt.hash(req.body.npass, 10);
            if (adminData) {
                await admin.findByIdAndUpdate(adminData.id, { password: req.body.npass });
                req.flash('success', 'Password sucessfully changed');
                // req.clearcookie('otp')
                // req.clearcookie('email')
                return res.redirect('/');
            }
        } else {
            req.flash('error', 'Password was not matched with Confirm Password');
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
    }
}

// Forget Password


// profile
module.exports.profile = async(req, res) => {

    return res.render('profile')
}

module.exports.readmore = async(req, res) => {

        return res.render('readmore')
    }
    // profile



module.exports.dashboard = async(req, res) => {
    return res.render('dashboard')
};

module.exports.admin_add = async(req, res) => {
    return res.render('admin_add')
};

module.exports.insertrecord = async(req, res) => {
    try {
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        var imagepath = '';
        if (req.file) {
            imagepath = admin.avatarpath + "/" + req.file.filename;
        }
        req.body.image = imagepath;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;
        req.body.name = req.body.first_name + " " + req.body.second_name;

        let data = await admin.create(req.body)
        if (data) {
            return res.redirect('back')
        } else {
            console.log(err)
        }
    } catch (error) {
        console.log("insert err in catch ", error);
    }
};

module.exports.admin_view = async(req, res) => {

    try {
        let data = await admin.find({})
        if (data) {
            return res.render('admin_view', {
                'admindata': data
            })
        } else {
            console.log("admin veiw data find err");
        }
    } catch (error) {
        console.log("admin_view err in catch : ");
    }
};

module.exports.delete = async(req, res) => {
    try {

        let record = await admin.findById(req.params.id)
        if (record) {
            var imagepath = path.join(__dirname, '..', record.image)
            if (imagepath) {
                fs.unlinkSync(imagepath);
            }
        }

        let data = await admin.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('/admin_view')
        }
    } catch (error) {
        console.log("data delet err in catch : ", error);
    }
};

module.exports.update = async(req, res) => {
    try {
        let data = await admin.findById(req.params.id)
        if (data) {

            return res.render('admin_update', {
                'data': data
            })
        }
    } catch (error) {
        console.log('edit page lode err in catch');
    }
};

module.exports.editrecord = async(req, res) => {
    let adminid = req.body.editid;

    try {
        if (req.file) {
            let data = await admin.findById(adminid)
            if (data) {

                var imagepath = path.join(__dirname, '..', data.image)
                if (imagepath) {
                    fs.unlinkSync(imagepath)
                }

                var newpath = admin.avatarpath + '/' + req.file.filename;
                req.body.image = newpath

                req.body.name = req.body.first_name + " " + req.body.second_name;

                const uDate = new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Calcutta'
                });

                req.body.updatedAt = uDate;

                let record = await admin.findByIdAndUpdate(adminid, req.body)
                if (record) {
                    return res.redirect('/admin_view')
                } else {
                    console.log('data not updated (if) ');
                }
            }
        } else {
            let data = await admin.findById(adminid)
            if (data) {
                req.body.image = data.image;

                req.body.name = req.body.first_name + " " + req.body.second_name;

                const uDate = new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Calcutta'
                });

                req.body.updatedAt = uDate;

                let record = await admin.findByIdAndUpdate(adminid, req.body)
                if (record) {
                    return res.redirect('/admin_view')
                } else {
                    console.log('data not updated (else) ');
                }
            } else {
                console.log("update data not found in (else)");
            }
        }
    } catch (error) {
        console.log("data  update err : ", error);
    }
}