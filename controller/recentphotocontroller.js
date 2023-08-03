const recent = require('../model/recentphotomodel')

const path = require('path');

const fs = require('fs');

module.exports.recent_add = async(req, res) => {
    return res.render('recentphoto_add')
}

module.exports.insertphoto = async(req, res) => {
    try {
        var recentimg = ''
        if (req.file) {
            recentimg = recent.recentpath + "/" + req.file.filename;
        }
        req.body.image = recentimg

        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = await recent.create(req.body)
        if (data) {
            return res.redirect('/recent')
        } else {
            console.log("Recent Photo Err");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.recentphoto_view = async(req, res) => {

    try {

        if (req.query.status == 'deActive') {
            let Active = await recent.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.status == 'Active') {
            let Active = await recent.findByIdAndUpdate(req.query.id, { isActive: true });
        }

        var search = '';
        if (req.query.search) {
            search = req.query.search
        }

        var page = 1
        if (req.query.page) {
            page = req.query.page;
        }

        var per_page = 2;

        let serchdata = await recent.find({
                $or: [
                    { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { content: { $regex: '.*' + search + '.*', $options: 'i' } }
                ]
            })
            .limit(per_page * 1)
            .skip((page - 1) * per_page)
            .exec();

        let slidedata = await recent.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();
        let pageNum = Math.ceil(slidedata / per_page);

        return res.render('recentphoto_view', {
            recentdata: serchdata,
            pageNum: pageNum,
            cpage: page,
            search: search
        })
    } catch (error) {
        console.log(error);
    }
};

module.exports.delete = async(req, res) => {
    try {

        let record = await recent.findById(req.params.id)
        if (record) {
            var imagepath = path.join(__dirname, '..', record.image)
            if (imagepath) {
                fs.unlinkSync(imagepath);
            }
        }


        let data = await recent.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('/recent/recentphoto_view')
        } else {
            console.log("delete error");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.update = async(req, res) => {
    try {
        let data = await recent.findById(req.params.id)

        if (data) {
            return res.render('recentphoto_update', {
                recentdata: data
            })
        } else {
            console.log("update err");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.updatephoto = async(req, res) => {
    let photoid = req.body.recenid;
    try {
        if (req.file) {
            let data = await recent.findById(photoid)
            if (data) {
                var recentimg = path.join(__dirname, '..', data.image)
                if (recentimg) {
                    fs.unlinkSync(recentimg)
                }

                var newimg = recent.recentpath + '/' + req.file.filename;
                req.body.image = newimg

                let record = await recent.findByIdAndUpdate(photoid, req.body)
                if (record) {
                    return res.redirect('/recent/recentphoto_view')
                } else {
                    console.log("data is not update");
                }
            }
        } else {
            let data = await recent.findById(photoid)
            if (data) {
                req.body.image = data.image

                let record = await recent.findByIdAndUpdate(photoid, req.body)
                if (record) {
                    return res.redirect('/recent/recentphoto_view')
                } else {
                    console.log("data is not update");
                }
            } else {
                console.log("data error");
            }
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.mulDel = async(req, res) => {
    try {
        let data = req.body.mulDel;
        data.forEach(async delet => {
            await recent.findByIdAndDelete(delet);
        });
        return res.redirect('/recent/recentphoto_view')
    } catch (error) {

    }
};