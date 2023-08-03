const slider = require('../model/slidermodel')

const fs = require('fs');

const path = require('path');

module.exports.slider_add = async(req, res) => {

    return res.render('slider_add')
};

module.exports.insertslider = async(req, res) => {
    try {
        var imgsl = '';
        if (req.file) {
            imgsl = slider.sliderpath + "/" + req.file.filename
        }
        req.body.image = imgsl;

        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;


        let data = await slider.create(req.body)
        if (data) {
            return res.redirect('/slider')
        } else {
            console.log("slider data error");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.slider_view = async(req, res) => {
    try {

        if (req.query.status == 'deActive') {
            let Active = await slider.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.status == 'Active') {
            let Active = await slider.findByIdAndUpdate(req.query.id, { isActive: true });
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

        let data = await slider.find({
                $or: [
                    { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { content: { $regex: '.*' + search + '.*', $options: 'i' } }
                ]
            }).limit(per_page * 1)
            .skip((page - 1) * per_page)
            .exec();

        let data_count = await slider.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();

        let pageNum = Math.ceil(data_count / per_page);

        if (data) {
            res.render('slider_view', ({
                sliderdata: data,
                pageNum: pageNum,
                cpage: page,
                search: search
            }));
        }
    } catch (error) {
        console.log("slider view_page err : ", error);
    }
}

module.exports.delete = async(req, res) => {
    try {

        let record = await slider.findById(req.params.id)
        if (record) {
            var imagepath = path.join(__dirname, '..', record.image)
            if (imagepath) {
                fs.unlinkSync(imagepath);
            }
        }

        let data = await slider.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('/slider/slider_view')
        } else {
            console.log("delete err", err);
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.mulDel = async(req, res) => {
    try {
        let data = req.body.mulDel;
        data.forEach(async element => {
            let id_data = await slider.findById(element);

            let i = path.join(__dirname, '..', id_data.image);
            fs.unlinkSync(i);

            await slider.findByIdAndDelete(element);
        });
        return res.redirect('/slider/slider_view');
    } catch (error) {
        console.log('multi delet err : ', error);
    }
}

module.exports.update = async(req, res) => {
    try {


        let data = await slider.findById(req.params.id)
        if (data) {
            return res.render('slider_update', {
                sliderdata: data
            })
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports.updateslider = async(req, res) => {
    let sliderid = req.body.editslider
    try {
        if (req.file) {
            let data = await slider.findById(sliderid)
            if (data) {
                var sliderimg = path.join(__dirname, '..', data.image)
                if (sliderimg) {
                    fs.unlinkSync(sliderimg)
                }

                var newimg = slider.sliderpath + '/' + req.file.filename;
                req.body.image = newimg

                let record = await slider.findByIdAndUpdate(sliderid, req.body)
                if (record) {
                    return res.redirect('/slider/slider_view')
                } else {
                    console.log("data not update");
                }
            }
        } else {
            let data = await slider.findById(sliderid)
            if (data) {
                req.body.image = data.image;

                let record = await slider.findByIdAndUpdate(sliderid, req.body)
                if (record) {
                    return res.redirect('/slider/slider_view')
                } else {
                    console.log("data not update");
                }
            } else {
                console.log("data not update");
            }
        }
    } catch (error) {
        console.log(error);
    }
}