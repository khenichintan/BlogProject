const contact = require('../model/contactmodel');

module.exports.contact_add = async(req, res) => {
    return res.render('contact_add')
};

module.exports.insertcontact = async(req, res) => {
    try {

        var profileimage = '';
        if (req.file) {
            profileimage = contact.uploadavatar + "/" + req.file.filename;
        }
        req.body.image = profileimage;

        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });
        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = await contact.create(req.body)
        if (data) {
            return res.redirect('back')
        } else {
            console.log("contact record error", err);
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.contact_view = async(req, res) => {
    try {

        if (req.query.status == 'deActive') {
            let Active = await contact.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.status == 'Active') {
            let Active = await contact.findByIdAndUpdate(req.query.id, { isActive: true });
        }

        let search = '';
        if (req.query.search) {
            search = req.query.search;
        }

        var page = 1;
        if (req.query.page) {
            page = req.query.page;
        }
        var per_page = 2;

        let data = await contact.find({
                $or: [
                    { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { content: { $regex: '.*' + search + '.*', $options: 'i' } }
                ]
            }).limit(per_page * 1)
            .skip((page - 1) * per_page)
            .exec();

        let data_count = await contact.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();

        let pageNum = Math.ceil(data_count / per_page);

        if (data) {
            res.render('contact_view', ({
                contactrecord: data,
                pageNum: pageNum,
                cpage: page,
                search: search
            }));
        }
    } catch (error) {
        console.log(error);
    }
}